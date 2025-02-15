"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const links = linksRef.current;
    const social = socialRef.current;

    gsap.fromTo(
      footer,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: footer,
          start: "top bottom",
          end: "bottom bottom",
          toggleActions: "play none none reverse",
        },
      },
    );

    if (links?.children) {
      gsap.fromTo(
        Array.from(links.children),
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: links,
            start: "top bottom-=100",
          },
        },
      );
    }

    if (social?.children) {
      gsap.fromTo(
        Array.from(social.children),
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: social,
            start: "top bottom-=50",
          },
        },
      );
    }
  }, []);

  return (
    <footer
      ref={footerRef}
      className="border-t border-border bg-background/50 backdrop-blur-xl"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">Tradify</h3>
            <p className="text-muted-foreground">
              Transform your translation workflow with a project management
              system powered by AI.
            </p>
          </div>

          <div ref={linksRef} className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">Navigation</h3>
            <ul className="space-y-2">
              {["Features", "Pricing", "FAQ"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div ref={socialRef} className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">Follow us</h3>
            <div className="flex space-x-4">
              {[
                {
                  icon: <Github className="h-5 w-5" />,
                  href: "#",
                  label: "GitHub",
                },
                {
                  icon: <Twitter className="h-5 w-5" />,
                  href: "#",
                  label: "Twitter",
                },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-accent rounded-md"
                >
                  {social.icon}
                  <span>{social.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Tradify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
