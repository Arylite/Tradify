"use client";
import Link from "next/link";
import {
  Home,
  Sparkles,
  DollarSign,
  HelpCircle,
  LogIn,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export const Header = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollToPlugin);

      // Variables pour le scroll
      let lastScroll = 0;
      const header = document.querySelector("header");

      // Animation du header
      const handleHeaderScroll = () => {
        const currentScroll = window.scrollY;

        if (currentScroll > lastScroll && currentScroll > 100) {
          // Scroll vers le bas - cacher le header
          gsap.to(header, {
            duration: 0.3,
            yPercent: -100,
            ease: "power2.inOut",
          });
        } else {
          // Scroll vers le haut - montrer le header
          gsap.to(header, {
            duration: 0.3,
            yPercent: 0,
            ease: "power2.inOut",
          });
        }

        lastScroll = currentScroll;
      };

      // Ajouter l'écouteur d'événement
      window.addEventListener("scroll", handleHeaderScroll);

      // Nettoyer l'écouteur
      return () => window.removeEventListener("scroll", handleHeaderScroll);
    }
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: id,
        offsetY: 80, // Ajustez cette valeur selon la hauteur de votre header
      },
      ease: "power2.inOut",
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 min-w-screen h-20 bg-white/1 border-b border-border backdrop-blur-md z-50">
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          <Link href="/">
            <h1 className="text-3xl font-bold relative group overflow-hidden">
              Tradify
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-current transition-transform duration-300 translate-x-[-100%] group-hover:translate-x-0" />
            </h1>
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "flex items-center gap-2"
                    )}
                  >
                    <Home size={16} className="text-muted-foreground" />
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={buttonVariants({ variant: "ghost" })}
                >
                  <Search size={16} className="text-muted-foreground mr-2" />
                  Discover
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[400px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/#features"
                          onClick={(e) => handleScroll(e, "#features")}
                          className="flex items-center gap-2 p-2 hover:bg-muted rounded-md"
                        >
                          <Sparkles size={16} />
                          <div>
                            <div className="font-medium">Features</div>
                            <p className="text-sm text-muted-foreground">
                              Discover all our features
                            </p>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/#pricing"
                          onClick={(e) => handleScroll(e, "#pricing")}
                          className="flex items-center gap-2 p-2 hover:bg-muted rounded-md"
                        >
                          <DollarSign size={16} />
                          <div>
                            <div className="font-medium">Pricing</div>
                            <p className="text-sm text-muted-foreground">
                              Our different offers
                            </p>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/#faq"
                          onClick={(e) => handleScroll(e, "#faq")}
                          className="flex items-center gap-2 p-2 hover:bg-muted rounded-md"
                        >
                          <HelpCircle size={16} />
                          <div>
                            <div className="font-medium">FAQ</div>
                            <p className="text-sm text-muted-foreground">
                              Frequently asked questions
                            </p>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Link
            href="/sign-in"
            className={cn(
              "flex items-center gap-2",
              buttonVariants({ variant: "ghost" })
            )}
          >
            <LogIn size={16} /> Login
          </Link>
        </div>
      </div>
    </header>
  );
};
