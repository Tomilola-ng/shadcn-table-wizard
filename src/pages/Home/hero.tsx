import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomeHero() {
  return (
    <section className="text-center space-y-6 min-h-[70vh] flex flex-col items-center justify-center">
      <h2 className="text-5xl max-w-screen-sm mx-auto font-bold tracking-tight">
        Generate Custom Shadcn Tables in Minutes
      </h2>
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
        Tired of writing repetitive table code? Use Shadcn Table Wizard to
        dynamically generate configurable, production-ready tables with support
        for enums, badges, prices, actions, and more.
      </p>
      <Link to="/wizard">
        <Button size="lg" className="mt-6 gap-2">
          Get Started <ArrowRight className="w-5 h-5" />
        </Button>
      </Link>
    </section>
  );
}
