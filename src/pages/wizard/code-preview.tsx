import { toast } from "sonner";

import { CodeBlock } from "@/components/ui/code-block";

import { ColumnConfig } from "@/types";

interface CodePreviewProps {
  columns: ColumnConfig[];
}

export function CodePreview({ columns }: CodePreviewProps) {
  // Helper to generate TypeScript interfaces
  const generateTypeDefinition = (columns: ColumnConfig[]) => {
    const typeProperties = columns
      .map((col) => {
        let typeString = "string";

        switch (col.dataType) {
          case "number":
            typeString = "number";
            break;
          case "price":
            typeString = "number";
            break;
          case "enum":
            if (col.options && col.options.length) {
              typeString = col.options.map((opt) => `"${opt}"`).join(" | ");
            }
            break;
          //   case "action":
          //     return "// Action columns don't need to be part of the data type";
          case "autoId":
            typeString = "string | number";
            break;
        }

        const cleanedLabel = col.label.toLowerCase().replace(/\s+/g, "");
        if (col.dataType !== "action") {
          return `  ${cleanedLabel}: ${typeString};`;
        }
        return "";
      })
      .filter(Boolean)
      .join("\n");

    return `interface Data {\n${typeProperties}\n}\n`;
  };

  // Helper to generate column definitions code
  const generateColumnDefinitions = (columns: ColumnConfig[]) => {
    const columnDefs = columns
      .map((col) => {
        const cleanedLabel = col.label.toLowerCase().replace(/\s+/g, "");

        let accessorString = `accessorKey: "${cleanedLabel}",`;
        if (col.dataType === "action") {
          accessorString = `id: "${cleanedLabel}",`;
        }

        let cellRenderer = "";

        switch (col.dataType) {
          case "enum":
            if (col.renderAsBadge) {
              cellRenderer = `
      cell: ({ row }) => {
        const value = row.getValue("${cleanedLabel}")
        return <Badge variant="outline">{value as string}</Badge>
      },`;
            }
            break;
          case "price":
            cellRenderer = `
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("${cleanedLabel}"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          currencyDisplay: "symbol",
          minimumFractionDigits: 2,
        }).format(amount)
        return <div className="font-medium">${
          col.currencySymbol || "$"
        }{formatted.substring(1)}</div>
      },`;
            break;
          case "action":
            if (col.actionStyle === "button") {
              cellRenderer = `
      cell: ({ row }) => {
        return (
          <Button 
            size="sm" 
            ${col.actionType === "delete" ? 'variant="destructive"' : ""}
            onClick={() => handle${capitalizeFirstLetter(
              col.actionType || "action"
            )}(row.original)}
          >
            ${
              col.actionType === "custom"
                ? col.customActionLabel
                : capitalizeFirstLetter(col.actionType || "action")
            }
          </Button>
        )
      },`;
            } else if (col.actionStyle === "link") {
              cellRenderer = `
      cell: ({ row }) => {
        return (
          <a 
            href="#"
            className=${
              col.actionType === "delete"
                ? '"text-destructive hover:text-destructive/80"'
                : '"text-primary hover:underline"'
            }
            onClick={(e) => {
              e.preventDefault()
              handle${capitalizeFirstLetter(
                col.actionType || "action"
              )}(row.original)
            }}
          >
            ${
              col.actionType === "custom"
                ? col.customActionLabel
                : capitalizeFirstLetter(col.actionType || "action")
            }
          </a>
        )
      },`;
            } else if (col.actionStyle === "icon") {
              const iconName =
                col.actionType === "edit"
                  ? "Edit"
                  : col.actionType === "delete"
                  ? "Trash2"
                  : col.actionType === "view"
                  ? "Eye"
                  : "Eye";

              cellRenderer = `
      cell: ({ row }) => {
        return (
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            onClick={() => handle${capitalizeFirstLetter(
              col.actionType || "action"
            )}(row.original)}
          >
            <${iconName} className="h-4 w-4" />
          </Button>
        )
      },`;
            }
            break;
        }

        return `    {
      ${accessorString}
      header: "${col.label}",${cellRenderer}
    },`;
      })
      .join("\n");

    return `const columns: ColumnDef<Data>[] = [\n${columnDefs}\n]`;
  };

  // Helper to capitalize first letter
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Generate full code snippet
  const generateFullCodeSnippet = () => {
    const imports = generateImports();
    const typeDefinition = generateTypeDefinition(columns);
    const columnDefinitions = generateColumnDefinitions(columns);
    const actionHandlers = generateActionHandlers(columns);

    return `// Table.tsx
    // "use client"
${imports}

${typeDefinition}
${actionHandlers}
${columnDefinitions}

export function DataTable({ data }: { data: Data[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}`;
  };

  // Generate imports section
  const generateImports = () => {
    const imports = [
      'import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from "@tanstack/react-table"',
      'import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"',
    ];

    // Check for special column types that need additional imports
    const hasEnumWithBadge = columns.some(
      (col) => col.dataType === "enum" && col.renderAsBadge
    );
    const hasActionButtons = columns.some(
      (col) => col.dataType === "action" && col.actionStyle === "button"
    );
    const hasActionIcons = columns.some(
      (col) => col.dataType === "action" && col.actionStyle === "icon"
    );

    if (hasEnumWithBadge) {
      imports.push('import { Badge } from "@/components/ui/badge"');
    }

    if (hasActionButtons) {
      imports.push('import { Button } from "@/components/ui/button"');
    }

    if (hasActionIcons) {
      const iconImports: string[] = [];

      columns.forEach((col) => {
        if (col.dataType === "action" && col.actionStyle === "icon") {
          switch (col.actionType) {
            case "edit":
              iconImports.push("Edit");
              break;
            case "delete":
              iconImports.push("Trash2");
              break;
            case "view":
            case "custom":
              iconImports.push("Eye");
              break;
          }
        }
      });

      if (iconImports.length > 0) {
        const uniqueIcons = Array.from(new Set(iconImports));
        imports.push(
          `import { ${uniqueIcons.join(", ")} } from "lucide-react"`
        );
      }
    }

    return imports.join("\n");
  };

  // Generate action handlers
  const generateActionHandlers = (columns: ColumnConfig[]) => {
    const actionTypes = columns
      .filter((col) => col.dataType === "action")
      .map((col) => col.actionType)
      .filter((value, index, self) => value && self.indexOf(value) === index);

    if (actionTypes.length === 0) return "";

    return actionTypes
      .map((actionType) => {
        const capitalizedAction = capitalizeFirstLetter(actionType || "action");
        return `function handle${capitalizedAction}(data: Data) {
  console.log(\`${capitalizedAction} action for\`, data)
  // Add your ${actionType} logic here
}
`;
      })
      .join("\n");
  };

  const codeSnippet = generateFullCodeSnippet();

  return (
    <div className="max-w-3xl mx-auto w-full">
      <CodeBlock language="tsx" filename="new-table.tsx" code={codeSnippet} />
    </div>
  );
}
