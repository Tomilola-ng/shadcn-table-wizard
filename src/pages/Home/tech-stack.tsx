import { useState, useEffect } from "react";

import { motion } from "framer-motion";
import { Code2, Sparkles, Table, Palette, Terminal } from "lucide-react";

import { Badge } from "@/components/ui/badge";

const techItems = [
  {
    name: "React",
    icon: <Code2 size={16} />,
    color: "bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200",
  },
  {
    name: "TypeScript",
    icon: <Terminal size={16} />,
    color: "bg-sky-100 text-sky-700 border-sky-300 hover:bg-sky-200",
  },
  {
    name: "TailwindCSS",
    icon: <Palette size={16} />,
    color: "bg-teal-100 text-teal-700 border-teal-300 hover:bg-teal-200",
  },
  {
    name: "Shadcn UI",
    icon: <Sparkles size={16} />,
    color: "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200",
  },
  {
    name: "TanStack Table",
    icon: <Table size={16} />,
    color: "bg-rose-100 text-rose-700 border-rose-300 hover:bg-rose-200",
  },
];

export default function TechStack() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  if (!mounted) return null;

  return (
    <section className="py-16 min-h-[70vh] flex flex-col items-center justify-center">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Tech Stack
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Modern tools and technologies used in this project
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-wrap justify-center gap-3 md:gap-4"
        >
          {techItems.map((tech) => (
            <motion.div
              key={tech.name}
              variants={item}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge
                variant="outline"
                className={`px-4 py-2 text-base font-medium cursor-pointer transition-all duration-300 flex items-center gap-2 ${tech.color}`}
              >
                {tech.icon}
                {tech.name}
              </Badge>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
