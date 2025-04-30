import { Link } from "react-router-dom";
import { ArrowRight, ZapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-5 bg-transparent bg-opacity-60 backdrop-filter backdrop-blur-md">
      <div className="flex justify-center w-full">
        <div className="flex justify-between w-full md:px-16 px-8 items-center">
          <span className="text-lg font-semibold flex items-center gap-x-2">
            Shadcn Table Wizard <ZapIcon />
          </span>
          <Button className="gap-1" asChild>
            <Link to="/wizard">
              Launch Wizard <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
