/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { TagsInput } from "@/components/ui/tags-input";

import { ColumnConfig, DataType } from "@/types";
import { toast } from "sonner";

interface ColumnConfigurationFormProps {
  columns: ColumnConfig[];
  onSubmit: (columns: ColumnConfig[]) => void;
  onBack: () => void;
}

export function ColumnConfigurationForm({
  columns,
  onSubmit,
  onBack,
}: ColumnConfigurationFormProps) {
  const [config, setConfig] = useState<ColumnConfig[]>(columns);
  const [enumValue, setEnumValue] = useState<string[]>([]);

  const updateColumn = (index: number, updates: Partial<ColumnConfig>) => {
    const newConfig = [...config];
    newConfig[index] = { ...newConfig[index], ...updates };

    // Reset type-specific fields when type changes
    if (updates.dataType && updates.dataType !== config[index].dataType) {
      if (updates.dataType === "enum") {
        newConfig[index].options = [];
        newConfig[index].renderAsBadge = false;
      } else if (updates.dataType === "price") {
        newConfig[index].currencySymbol = "$";
      } else if (updates.dataType === "action") {
        newConfig[index].actionType = "edit";
        newConfig[index].actionStyle = "button";
        newConfig[index].customActionLabel = "";
      } else {
        delete newConfig[index].options;
        delete newConfig[index].renderAsBadge;
        delete newConfig[index].currencySymbol;
        delete newConfig[index].actionType;
        delete newConfig[index].actionStyle;
        delete newConfig[index].customActionLabel;
      }
    }

    setConfig(newConfig);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const invalidColumns = config.filter((col) => !col.label.trim());

    if (invalidColumns.length > 0) {
      toast.error("Missing column names", {
        description: "Please provide names for all columns",
      });
      return;
    }

    // Additional validation for enum type
    for (const col of config) {
      if (
        col.dataType === "enum" &&
        (!col.options || col.options.length === 0)
      ) {
        toast.error("Missing enum options", {
          description: `Please provide options for enum column "${col.label}"`,
        });
        return;
      }
    }

    onSubmit(config);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {config.map((column, index) => (
          <Card key={column.id} className="relative">
            <CardContent className="pt-4 pb-2">
              <div className="absolute top-3 right-3 bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs font-medium">
                Column {index + 1}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`column-${index}-name`}>Column Name</Label>
                  <Input
                    id={`column-${index}-name`}
                    value={column.label}
                    onChange={(e) =>
                      updateColumn(index, { label: e.target.value })
                    }
                    placeholder="e.g., User Name, Product ID"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`column-${index}-type`}>Data Type</Label>
                  <Select
                    value={column.dataType}
                    onValueChange={(value) =>
                      updateColumn(index, { dataType: value as DataType })
                    }
                  >
                    <SelectTrigger id={`column-${index}-type`}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="enum">Enum</SelectItem>
                      <SelectItem value="autoId">Auto ID</SelectItem>
                      <SelectItem value="action">Action</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Type-specific options */}
              {column.dataType === "enum" && (
                <div className="mt-4 space-y-3">
                  <Separator />
                  <div className="space-y-2 pt-2">
                    <Label htmlFor={`column-${index}-options`}>
                      Enum Options
                    </Label>
                    <TagsInput
                      value={enumValue}
                      onValueChange={(val) => {
                        setEnumValue(val);
                        updateColumn(index, { options: val });
                      }}
                      placeholder="Enter options then press enter (e.g., Active, Pending, Completed)"
                      className="w-full"
                      id={`column-${index}-options`}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`column-${index}-badge`}
                      checked={column.renderAsBadge || false}
                      onCheckedChange={(checked: boolean) =>
                        updateColumn(index, { renderAsBadge: checked })
                      }
                    />
                    <Label htmlFor={`column-${index}-badge`}>
                      Render as Badge
                    </Label>
                  </div>
                </div>
              )}

              {column.dataType === "price" && (
                <div className="mt-4 space-y-3">
                  <Separator />
                  <div className="space-y-2 pt-2">
                    <Label htmlFor={`column-${index}-currency`}>
                      Currency Symbol
                    </Label>
                    <Select
                      value={column.currencySymbol || "$"}
                      onValueChange={(value) =>
                        updateColumn(index, { currencySymbol: value })
                      }
                    >
                      <SelectTrigger
                        id={`column-${index}-currency`}
                        className="w-full md:w-1/3"
                      >
                        <SelectValue placeholder="Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="$">$ (Dollar)</SelectItem>
                        <SelectItem value="€">€ (Euro)</SelectItem>
                        <SelectItem value="£">£ (Pound)</SelectItem>
                        <SelectItem value="₦">₦ (Naira)</SelectItem>
                        <SelectItem value="¥">¥ (Yen/Yuan)</SelectItem>
                        <SelectItem value="₹">₹ (Rupee)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {column.dataType === "action" && (
                <div className="mt-4 space-y-3">
                  <Separator />
                  <div className="grid gap-4 md:grid-cols-2 pt-2">
                    <div className="space-y-2">
                      <Label htmlFor={`column-${index}-action-type`}>
                        Action Type
                      </Label>
                      <Select
                        value={column.actionType || "edit"}
                        onValueChange={(value) =>
                          updateColumn(index, {
                            actionType: value as any,
                            customActionLabel:
                              value === "custom" ? "Custom Action" : undefined,
                          })
                        }
                      >
                        <SelectTrigger id={`column-${index}-action-type`}>
                          <SelectValue placeholder="Action Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="edit">Edit</SelectItem>
                          <SelectItem value="delete">Delete</SelectItem>
                          <SelectItem value="view">View</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`column-${index}-action-style`}>
                        Display Style
                      </Label>
                      <Select
                        value={column.actionStyle || "button"}
                        onValueChange={(value) =>
                          updateColumn(index, { actionStyle: value as any })
                        }
                      >
                        <SelectTrigger id={`column-${index}-action-style`}>
                          <SelectValue placeholder="Style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="button">Button</SelectItem>
                          <SelectItem value="link">Link</SelectItem>
                          <SelectItem value="icon">Icon</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {column.actionType === "custom" && (
                    <div className="space-y-2">
                      <Label htmlFor={`column-${index}-custom-label`}>
                        Custom Label
                      </Label>
                      <Input
                        id={`column-${index}-custom-label`}
                        value={column.customActionLabel || ""}
                        onChange={(e) =>
                          updateColumn(index, {
                            customActionLabel: e.target.value,
                          })
                        }
                        placeholder="e.g., Download, Process, Approve"
                      />
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Generate Table</Button>
      </div>
    </form>
  );
}
