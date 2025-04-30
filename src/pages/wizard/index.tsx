/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Footer } from "@/components/reusable/Footer";

import { CodePreview } from "./code-preview";
import { TablePreview } from "./table-preview";
import { ColumnCountForm } from "./column-count-form";
import { ColumnConfigurationForm } from "./column-configuration-form";

import { ColumnConfig } from "@/types";

const STEPS = ["count", "configure", "preview"] as const;
type Step = (typeof STEPS)[number];

export function TableCreatorWizard() {
  const [currentStep, setCurrentStep] = useState<Step>("count");
  const [columnCount, setColumnCount] = useState<number>(0);
  const [columnsConfig, setColumnsConfig] = useState<ColumnConfig[]>([]);

  const handleColumnCountSubmit = (count: number) => {
    setColumnCount(count);
    // Initialize columns config with empty values
    setColumnsConfig(
      Array(count)
        .fill(null)
        .map((_, index) => ({
          id: `column-${index}`,
          label: "",
          dataType: "text",
          options: [],
          renderAsBadge: false,
          currencySymbol: "$",
          actionType: "edit",
          actionStyle: "button",
        }))
    );
    setCurrentStep("configure");
  };

  const handleConfigureSubmit = (config: ColumnConfig[]) => {
    setColumnsConfig(config);
    setCurrentStep("preview");
  };

  const resetWizard = () => {
    setColumnCount(0);
    setColumnsConfig([]);
    setCurrentStep("count");
  };

  return (
    <section className="min-h-screen flex items-center justify-center flex-col pt-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-900 md:text-4xl">
            Table Creator Wizard
          </CardTitle>
          <CardDescription className="text-muted-foreground text-lg">
            Create your Shadcn table configuration in a few steps
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentStep === "count" && (
            <ColumnCountForm onSubmit={handleColumnCountSubmit} />
          )}

          {currentStep === "configure" && (
            <ColumnConfigurationForm
              columns={columnsConfig}
              onSubmit={handleConfigureSubmit}
              onBack={() => setCurrentStep("count")}
            />
          )}

          {currentStep === "preview" && (
            <>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="preview">Table Preview</TabsTrigger>
                  <TabsTrigger value="code">Code Snippet</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <TablePreview columns={columnsConfig} />
                </TabsContent>
                <TabsContent value="code">
                  <CodePreview columns={columnsConfig} />
                </TabsContent>
              </Tabs>
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep("configure")}
                >
                  Back to Configuration
                </Button>
                <Button onClick={resetWizard}>Start New Table</Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      <div className="w-full h-32" />
      <Footer />
    </section>
  );
}
