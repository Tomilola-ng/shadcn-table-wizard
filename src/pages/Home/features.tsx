import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Rocket, Code, Eye, Copy, Zap, Shield } from "lucide-react";

const benefits = [
  {
    icon: <Rocket className="text-blue-500 w-8 h-8" />,
    title: "Avoid boilerplate and repetitive table setup.",
    description:
      "Streamline your development process by eliminating redundant code and focusing on what matters.",
  },
  {
    icon: <Code className="text-green-500 w-8 h-8" />,
    title: "Supports price, enum, ID, and action columns.",
    description:
      "Easily handle various data types with built-in support, making your tables versatile and powerful.",
  },
  {
    icon: <Eye className="text-purple-500 w-8 h-8" />,
    title: "Preview your table config before copying.",
    description:
      "Visualize your table setup in real-time, ensuring it meets your needs before integration.",
  },
  {
    icon: <Copy className="text-orange-500 w-8 h-8" />,
    title: "Export ready-to-use config for Shadcn tables.",
    description:
      "Generate production-ready code snippets that seamlessly integrate with your Shadcn UI projects.",
  },
  {
    icon: <Zap className="text-yellow-500 w-8 h-8" />,
    title: "Built with clean React + TypeScript + Tailwind.",
    description:
      "Leverage modern web technologies for a robust and maintainable codebase.",
  },
  {
    icon: <Shield className="text-red-500 w-8 h-8" />,
    title: "No more guessing—see it before you build.",
    description:
      "Reduce development time and errors by previewing your table configurations instantly.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

const iconVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.2 },
  },
};

export default function HomeFeatures() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px 0px",
  });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="mt-20"
    >
      <motion.h3
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold text-gray-900 md:text-4xl text-center mb-12"
      >
        Why Use Table Wizard?
      </motion.h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((benefit, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{
              delay: i * 0.1,
              duration: 0.3,
            }}
            className="px-4 py-6 border rounded-2xl bg-white cursor-pointer"
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.2 },
            }}
          >
            <div className="grid gap-4 mb-4">
              <div className="size-12 flex items-center justify-center border rounded-lg">
                <motion.div
                  variants={iconVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delay: i * 0.1 + 0.1 }}
                >
                  {benefit.icon}
                </motion.div>
              </div>
              <motion.h4
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: i * 0.1 + 0.15 }}
                className="text-lg font-medium"
              >
                {benefit.title}
              </motion.h4>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: i * 0.1 + 0.2 }}
              className="text-gray-600 text-sm mb-4"
            >
              {benefit.description}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
