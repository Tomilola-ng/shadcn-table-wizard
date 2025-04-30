/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";
import { ColumnConfig } from "@/types";

interface TablePreviewProps {
  columns: ColumnConfig[];
}

export function TablePreview({ columns }: TablePreviewProps) {
  // Generate some sample data based on column configuration
  const generateSampleData = (columns: ColumnConfig[], count: number = 3) => {
    return Array(count)
      .fill(null)
      .map((_, index) => {
        const row: Record<string, any> = { id: `row-${index + 1}` };

        columns.forEach((col) => {
          switch (col.dataType) {
            case "text":
              row[col.id] = `Sample ${col.label} ${index + 1}`;
              break;
            case "number":
              row[col.id] = (index + 1) * 10;
              break;
            case "price":
              row[col.id] = (index + 1) * 19.99;
              break;
            case "enum":
              if (col.options && col.options.length > 0) {
                const optionIndex = index % col.options.length;
                row[col.id] = col.options[optionIndex];
              } else {
                row[col.id] = "Option";
              }
              break;
            case "autoId":
              row[col.id] = `ID-${100 + index}`;
              break;
            // Action columns don't need sample data
          }
        });

        return row;
      });
  };

  const sampleData = generateSampleData(columns);

  // Helper to render action button/link/icon
  const renderAction = (column: ColumnConfig, rowId: string) => {
    console.log(rowId);
    const getActionLabel = () => {
      if (column.actionType === "custom" && column.customActionLabel) {
        return column.customActionLabel;
      }
      return capitalizeFirstLetter(column.actionType || "action");
    };

    const getActionIcon = () => {
      switch (column.actionType) {
        case "edit":
          return <Edit className="h-4 w-4" />;
        case "delete":
          return <Trash2 className="h-4 w-4" />;
        case "view":
          return <Eye className="h-4 w-4" />;
        default:
          return <Eye className="h-4 w-4" />;
      }
    };

    if (column.actionStyle === "button") {
      return (
        <Button
          size="sm"
          variant={column.actionType === "delete" ? "destructive" : "default"}
        >
          {getActionLabel()}
        </Button>
      );
    } else if (column.actionStyle === "link") {
      return (
        <a
          href="#"
          className={`text-sm font-medium ${
            column.actionType === "delete"
              ? "text-destructive hover:text-destructive/80"
              : "text-primary hover:text-primary/80"
          }`}
          onClick={(e) => e.preventDefault()}
        >
          {getActionLabel()}
        </a>
      );
    } else if (column.actionStyle === "icon") {
      return (
        <Button size="icon" variant="ghost" className="h-8 w-8">
          {getActionIcon()}
        </Button>
      );
    }
  };

  // Format price values
  const formatPrice = (value: number, symbol: string = "$") => {
    return `${symbol}${value.toFixed(2)}`;
  };

  // Helper function to capitalize first letter
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (columns.length === 0) {
    return <div className="text-center p-6">No columns defined</div>;
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.id}>{column.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleData.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={`${row.id}-${column.id}`}>
                  {column.dataType === "enum" && column.renderAsBadge ? (
                    <Badge variant="outline">{row[column.id]}</Badge>
                  ) : column.dataType === "price" ? (
                    formatPrice(row[column.id], column.currencySymbol)
                  ) : column.dataType === "action" ? (
                    renderAction(column, row.id)
                  ) : (
                    row[column.id]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
