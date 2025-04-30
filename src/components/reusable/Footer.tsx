import { Twitter, Instagram, Github, Mail } from "lucide-react";

export const Footer = () => {
  const iconStyle =
    "flex items-center justify-center rounded-sm bg-white w-10 h-10 text-primary";

  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white w-full">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold text-2xl">
            <span className="mr-2">Hire the Dev</span>
          </h2>

          <p className="text-gray-400 mb-8">
            Interested in working with me? I'd love to hear from you!
          </p>

          <div className="pt-8 border-t border-gray-800 text-sm flex justify-between items-center">
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://twitter.com/tomilola_ng"
                className={iconStyle}
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://www.instagram.com/tomilola_ng"
                className={iconStyle}
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.github.com/Tomilola-ng"
                className={iconStyle}
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="mailto:tee.o2809@gmail.com"
                className={iconStyle}
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
            <p>
              &copy; {year} · Designed & Built with ❤️
              <a
                href="https://tomilola.com.ng"
                target="_blank"
                className="ml-1 underline"
              >
                By Tomilola
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
