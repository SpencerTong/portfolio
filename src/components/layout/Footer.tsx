import Link from "next/link";

const socials = [
  { label: "GitHub", href: "https://github.com/spencertong" },
  { label: "LinkedIn", href: "https://linkedin.com/in/spencertong" },
  { label: "Twitter", href: "https://twitter.com/spencertong" },
];

const footerLinks = [
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Demo", href: "/demo" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#1f1f1f] mt-32">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3 max-w-xs">
            <span className="font-display font-bold text-xl gradient-text">ST</span>
            <p className="text-sm text-[#71717a] leading-relaxed">
              Full stack engineer building modern web applications with a focus on
              performance and great user experiences.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono text-[#71717a] uppercase tracking-widest">
              Navigation
            </span>
            <ul className="flex flex-col gap-2">
              {footerLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#71717a] hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono text-[#71717a] uppercase tracking-widest">
              Connect
            </span>
            <ul className="flex flex-col gap-2">
              {socials.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#71717a] hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#1f1f1f] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#71717a]">
          <span>© {new Date().getFullYear()} Spencer Tong. All rights reserved.</span>
          <span className="font-mono">Built with Next.js + TypeScript</span>
        </div>
      </div>
    </footer>
  );
}
