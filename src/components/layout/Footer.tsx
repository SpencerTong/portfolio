import Link from "next/link";

const socials = [
  { label: "GitHub", href: "https://github.com/spencertong" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/spencert225/" },
];

const footerLinks = [
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#ddd8d0] mt-32">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3 max-w-xs">
            <span className="font-display font-bold text-xl gradient-text">
              ST
            </span>
            <p className="text-sm text-[#9b8d84] leading-relaxed">
              Full stack engineer building modern web applications with a focus
              on performance and great user experiences.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono text-[#9b8d84] uppercase tracking-widest">
              Navigation
            </span>
            <ul className="flex flex-col gap-2">
              {footerLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#9b8d84] hover:text-[#2d2520] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono text-[#9b8d84] uppercase tracking-widest">
              Connect
            </span>
            <ul className="flex flex-col gap-2">
              {socials.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#9b8d84] hover:text-[#2d2520] transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#ddd8d0] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#9b8d84]">
          <span>
            © {new Date().getFullYear()} Spencer Tong. All rights reserved.
          </span>
          <span className="font-mono">Built with Next.js + TypeScript</span>
        </div>
      </div>
    </footer>
  );
}
