import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ColumnCountFormProps {
  onSubmit: (count: number) => void;
}

export function ColumnCountForm({ onSubmit }: ColumnCountFormProps) {
  const [count, setCount] = useState<number>(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (count < 1) {
      toast.error("Invalid column count", {
        description: "Please enter at least 1 column",
      });
      return;
    }

    if (count > 10) {
      toast.error("Too many columns", {
        description: "For better performance, please limit to 10 columns",
      });
      return;
    }

    onSubmit(count);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="column-count">How many columns do you need?</Label>
        <Input
          id="column-count"
          type="number"
          min={1}
          max={10}
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value) || 0)}
          className="w-full md:w-1/3"
        />
        <p className="text-sm text-muted-foreground">
          Enter a number between 1 and 10
        </p>
      </div>
      <Button type="submit">Continue</Button>
    </form>
  );
}
