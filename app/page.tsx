"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import useEmblaCarousel from "embla-carousel-react";
import {
  BotIcon,
  ChevronLeft,
  ChevronRight,
  RocketIcon,
  RefreshCwIcon,
  BarChart2Icon,
  SearchIcon,
  UsersIcon,
  LockIcon,
  GlobeIcon,
  SmartphoneIcon,
  PlugIcon,
  LineChartIcon,
  TargetIcon,
  BookIcon,
} from "lucide-react";
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useEffect,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScroll } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Footer from "@/components/layout/Footer";

// Nouveau composant pour la navigation
const TableOfContents = ({
  sections,
  activeSection,
  scrollToSection,
}: {
  sections: { id: string; label: string; ref: React.RefObject<null> }[];
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}) => {
  const radius = 120;
  const minWidth = 100; // Largeur minimale de la section

  return (
    <nav className="fixed right-[-80px] top-1/2 -translate-y-1/2 z-50 h-[240px] w-[120px] group hover:right-[-10px] transition-all duration-700">
      <div
        className="absolute right-0 h-full w-full transition-all duration-700 ease-out
          group-hover:scale-105 origin-right"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        {sections.map((section, index) => {
          const activeIndex = sections.findIndex((s) => s.id === activeSection);
          const angleOffset = -activeIndex * (Math.PI / 6);
          const angle = index * (Math.PI / 6) + angleOffset;
          const x = radius * Math.cos(angle) - minWidth / 2;
          const y = radius * Math.sin(angle);

          return (
            <a
              key={section.id}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(section.id);
              }}
              href={`#${section.id}`}
              data-section={section.id}
              className="absolute transform-gpu transition-all duration-700 ease-out"
              style={{
                top: `calc(50% + ${y}px)`,
                right: `${x}px`,
                transform: "translate(0, -50%)",
                opacity: activeSection === section.id ? 1 : 0,
                visibility: activeSection === section.id ? "visible" : "hidden",
                transformStyle: "preserve-3d",
              }}
            >
              <span
                className={`text-sm font-medium px-4 py-2 rounded-full block transition-all duration-700
                  group-hover:opacity-100 group-hover:visible whitespace-nowrap text-center
                  ${
                    activeSection === section.id
                      ? "group-hover:bg-primary/20 bg-transparent text-primary shadow-lg scale-110"
                      : "text-muted-foreground/60 opacity-0 invisible hover:bg-primary/10 hover:text-primary"
                  }`}
                style={{
                  transform: `perspective(1000px) rotateY(${
                    activeSection === section.id ? 0 : 45
                  }deg)`,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  minWidth: `${minWidth}px`,
                  willChange: "transform, opacity",
                }}
              >
                {section.label}
              </span>
            </a>
          );
        })}

        {/* Demi-cercle décoratif */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[120px] h-[240px] 
            border-l-2 border-primary/10 rounded-l-full transition-all duration-700
            group-hover:border-primary/20"
        />
      </div>
    </nav>
  );
};

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    slidesToScroll: 1,
    align: "start",
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const featuresIconSize = 30;

  const allFeatures = [
    {
      icon: <BotIcon size={featuresIconSize} />,
      title: "AI Assistant",
      description:
        "Smart Discord bot for project management and real-time communication",
    },
    {
      icon: <RefreshCwIcon size={featuresIconSize} />,
      title: "Translation Memory",
      description: "Share and reuse translations across projects and teams",
    },
    {
      icon: <BarChart2Icon size={featuresIconSize} />,
      title: "Analytics",
      description: "Track performance and productivity in real-time",
    },
    {
      icon: <SearchIcon size={featuresIconSize} />,
      title: "Quality Assurance",
      description: "Automated QA checks and terminology consistency",
    },
    {
      icon: <UsersIcon size={featuresIconSize} />,
      title: "Team Collaboration",
      description: "Real-time collaboration tools and chat",
    },
    {
      icon: <LockIcon size={featuresIconSize} />,
      title: "Security",
      description: "Enterprise-grade security and encryption",
    },
    {
      icon: <GlobeIcon size={featuresIconSize} />,
      title: "Multi-language Support",
      description:
        "Support for over 100 languages with specialized tools for each",
    },
    {
      icon: <SmartphoneIcon size={featuresIconSize} />,
      title: "Mobile App",
      description: "Manage translations on the go with our mobile application",
    },
    {
      icon: <PlugIcon size={featuresIconSize} />,
      title: "API Integration",
      description:
        "Connect with popular platforms like GitHub, Gitlab, and Bitbucket",
    },
    {
      icon: <LineChartIcon size={featuresIconSize} />,
      title: "Progress Tracking",
      description: "Real-time progress tracking and deadline management",
    },
    {
      icon: <TargetIcon size={featuresIconSize} />,
      title: "Custom Workflows",
      description: "Create and customize workflows for your team's needs",
    },
    {
      icon: <BookIcon size={featuresIconSize} />,
      title: "Glossary Management",
      description: "Centralized terminology management and consistency checks",
    },
  ];

  // Références pour les animations
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const pricingRef = useRef(null);
  const faqRef = useRef(null);

  // Ajout des refs pour la navigation
  const sections = [
    { id: "hero", label: "Home", ref: useRef(null) },
    { id: "features", label: "Features", ref: useRef(null) },
    { id: "pricing", label: "Pricing", ref: useRef(null) },
    { id: "faq", label: "FAQ", ref: useRef(null) },
  ];

  // Hook pour le scroll
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    const handleScroll = () => {
      const pageHeight = window.innerHeight;
      const currentPosition = window.scrollY + pageHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          if (top <= pageHeight / 2 && bottom >= pageHeight / 2) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animation du conteneur de navigation
    gsap.set(".nav-item", {
      opacity: 0.3,
      x: 20,
    });

    // Créer les ScrollTriggers pour chaque section
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: `#${section.id}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => updateNavigation(section.id),
        onEnterBack: () => updateNavigation(section.id),
      });
    });

    // Fonction pour mettre à jour la navigation
    const updateNavigation = (sectionId: string) => {
      gsap.to(".nav-item", {
        opacity: 0.3,
        x: 20,
        duration: 0.3,
      });

      gsap.to(`[data-section="${sectionId}"]`, {
        opacity: 1,
        x: 0,
        duration: 0.3,
      });
    };

    // Animation du hero
    gsap.from(heroRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
    });

    // Animation des features
    gsap.from(".feature-card", {
      scrollTrigger: {
        trigger: featuresRef.current,
        start: "top center",
      },
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
    });

    // Animation du pricing
    gsap.from(pricingRef.current, {
      scrollTrigger: {
        trigger: pricingRef.current,
        start: "top center",
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
    });

    // Animation des FAQ
    gsap.from(faqRef.current, {
      scrollTrigger: {
        trigger: faqRef.current,
        start: "top center",
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
    });
  }, []);

  // Ajoutez cette fonction helper pour le smooth scroll avec offset
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    const offset = 50; // Ajustez cette valeur selon vos besoins

    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <main className="pt-12 relative min-h-screen">
        <div className="relative z-10">
          <TableOfContents
            sections={sections}
            activeSection={activeSection}
            scrollToSection={scrollToSection}
          />

          {/* Hero Section */}
          <section
            ref={heroRef}
            className="container mx-auto px-6 py-24"
            id="hero"
          >
            <h1 className="text-6xl font-bold text-center mb-8">
              Tradify<span className="text-primary">.</span>
            </h1>
            <p className="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Transform your translation workflow with AI-powered project
              management
            </p>
            <div className="flex justify-center gap-4 flex-col w-full px-48">
              <Button size="lg">
                <RocketIcon size={18} className="mr-2" />
                Get Started
              </Button>
              <Link
                href="/sign-in"
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "text-muted-foreground",
                )}
              >
                Already have an account?
              </Link>
            </div>
          </section>

          {/* Features Carousel Section */}
          <section
            ref={featuresRef}
            className="container mx-auto px-6 pt-16 pb-12 bg-accent/20 rounded-lg"
            id="features"
          >
            <h2 className="text-3xl font-bold text-center mb-16">
              Powerful Features
            </h2>

            <div className="relative">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {allFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="flex-[0_0_33.33%] min-w-0 px-4 feature-card"
                    >
                      <div className="bg-card p-6 rounded-xl shadow-sm border border-border h-full">
                        <div className="text-primary text-3xl mb-4">
                          {feature.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Navigation */}
              <Button
                variant={"outline"}
                size="icon"
                onClick={scrollPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-12"
              >
                <ChevronLeft size={18} />
              </Button>
              <Button
                variant={"outline"}
                size="icon"
                onClick={scrollNext}
                className="absolute right-0 top-1/2 -translate-y-1/2  -mr-12"
              >
                <ChevronRight size={18} />
              </Button>
            </div>
          </section>

          {/* Pricing Section */}
          <section
            ref={pricingRef}
            className="container mx-auto px-6 py-24"
            id="pricing"
          >
            <h2 className="text-3xl font-bold text-center mb-16">
              Simple Pricing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Plan Starter */}
              <div className="bg-card rounded-2xl shadow-sm border border-border p-8">
                <div className="text-center text-3xl font-bold mb-2">
                  Starter
                </div>
                <div className="text-center text-4xl font-bold mb-6">
                  $19
                  <span className="text-muted-foreground text-xl">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    "Basic Discord Bot",
                    "5GB Translation Memory",
                    "Basic Analytics",
                    "Email Support",
                    "Up to 5 Team Members",
                    "REST API Access",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-primary mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full">
                  <RocketIcon size={18} className="mr-2" />
                  Start Free Trial
                </Button>
              </div>

              {/* Plan Professional */}
              <div className="bg-card rounded-2xl shadow-sm border-2 border-primary p-8 scale-105 relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm">
                  Most Popular
                </div>
                <div className="text-center text-3xl font-bold mb-2">
                  Professional
                </div>
                <div className="text-center text-4xl font-bold mb-6">
                  $49
                  <span className="text-muted-foreground text-xl">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    "Custom Discord Bot",
                    "Unlimited Translation Memory",
                    "Real-time Analytics",
                    "24/7 Priority Support",
                    "Team Collaboration Tools",
                    "API Access",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-primary mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="default" className="w-full">
                  <RocketIcon size={18} className="mr-2" />
                  Ready to get started?
                </Button>
              </div>

              {/* Plan Enterprise */}
              <div className="bg-card rounded-2xl shadow-sm border border-border p-8">
                <div className="text-center text-3xl font-bold mb-2">
                  Enterprise
                </div>
                <div className="text-center text-4xl font-bold mb-6">
                  $199
                  <span className="text-muted-foreground text-xl">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    "Custom AI Solutions",
                    "Dedicated Server",
                    "Advanced Analytics",
                    "Dedicated Account Manager",
                    "Custom Integration",
                    "SLA Guarantee",
                    "White-label Options",
                    "Custom Security Features",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-primary mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full">
                  <RocketIcon size={18} className="mr-2" />
                  Contact Sales
                </Button>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section
            ref={faqRef}
            className="container mx-auto px-12 pt-12 pb-6 bg-accent/20 rounded-lg"
            id="faq"
          >
            <h2 className="text-3xl font-bold text-center mb-16">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible>
              {[
                {
                  question: "How does the AI assistant work?",
                  answer:
                    "Our AI assistant integrates with Discord and uses advanced natural language processing to help manage translation projects, assign tasks, and facilitate communication between team members.",
                },
                {
                  question: "Can I import existing translation memories?",
                  answer:
                    "Yes! Tradify supports importing TMX, XLIFF, and other standard translation memory formats. You can easily migrate your existing translation assets.",
                },
                {
                  question: "Is there a limit on team members?",
                  answer:
                    "No, our premium plan includes unlimited team members and collaboration features. You can grow your team without worrying about per-user costs.",
                },
                {
                  question: "What kind of support do you offer?",
                  answer:
                    "Premium plan includes 24/7 priority support via email, Discord, and live chat. We also provide comprehensive documentation and video tutorials.",
                },
                {
                  question: "Is my data secure?",
                  answer:
                    "Yes, we use enterprise-grade encryption and follow strict security protocols. Your data is stored in secure data centers with regular backups.",
                },
              ].map((faq, index) => (
                <AccordionItem value={`item-${index + 1}`} key={index}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
/*

tradify est une plateforme de gestion de projet pour les entreprises de traduction.
*/
