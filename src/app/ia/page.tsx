"use client";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import DemoRequestForm from "./DemoRequestForm";
import LanguageSwitcher from "@/i18n/LanguageSwitcher";

type Feature = {
  title: string;
  desc: string;
  icon: ReactNode;
};

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ transitionDelay: `${index * 80}ms` }}
      className={`bg-[#111214] border border-white/5 rounded-xl p-5 flex flex-col gap-2 hover:border-yellow-400/30 transition-all transform-gpu duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="w-9 h-9 rounded-md bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
        {feature.icon}
      </div>
      <h3 className="text-white font-semibold text-base">{feature.title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
    </div>
  );
}

function HowItWorksCard({
  title,
  step,
  description,
  icon,
  delayMs,
}: {
  title: string;
  step: string;
  description: string;
  icon: ReactNode;
  delayMs: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`bg-[#111214] border border-white/5 rounded-xl p-6 text-left hover:border-yellow-400/30 transform-gpu transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
      }`}
    >
      <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400">
        {icon}
      </div>
      <div className="text-[10px] tracking-widest font-semibold text-yellow-400 mb-1">
        {step}
      </div>
      <div className="text-white font-semibold mb-1">{title}</div>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

type PhoneConf = {
  src: string;
  altKey: string;
  baseRotate: number;
  scale: number;
  lift: number; // static vertical offset (px) to shape the fan arc
  zClass: string;
  marginClass: string; // negative margin to overlap toward the centre
  floatClass: string;
  enterFrom: "left" | "top" | "right"; // entrance fly-in direction
  delayMs: number;
  depth: number; // cursor translate strength
  tilt: number; // cursor 3D tilt strength (deg)
  xStart: number; // scroll parallax X at top
  xEnd: number; // scroll parallax X at bottom
  yMax: number; // scroll parallax Y travel
};

type PhoneCardProps = {
  conf: PhoneConf;
  progress: number;
  mouse: { x: number; y: number };
  mounted: boolean;
};

// Off-screen start positions for the entrance fly-in, keyed by direction.
const ENTER_OFFSET: Record<PhoneConf["enterFrom"], string> = {
  left: "translate3d(-160px, 0, 0)",
  top: "translate3d(0, -160px, 0)",
  right: "translate3d(160px, 0, 0)",
};

function PhoneCard({ conf, progress, mouse, mounted }: PhoneCardProps) {
  const { t } = useTranslation();
  const x = conf.xStart + (conf.xEnd - conf.xStart) * progress;
  const y = conf.yMax * progress;

  return (
    // Layer 1: scroll + mouse parallax (translate) + overlap margin
    <div
      className={`relative ${conf.zClass} ${conf.marginClass}`}
      style={{
        transform: `translate3d(${x + mouse.x * conf.depth}px, ${
          y + mouse.y * conf.depth * 0.5
        }px, 0)`,
      }}
    >
      {/* Layer 2: entrance reveal — fly in from the edge (left / top / right) */}
      <div
        className="transition-all duration-1000 ease-out will-change-transform"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted
            ? "translate3d(0, 0, 0) scale(1)"
            : `${ENTER_OFFSET[conf.enterFrom]} scale(0.85)`,
          transitionDelay: `${conf.delayMs}ms`,
        }}
      >
        {/* Layer 3: continuous float (CSS keyframes) + perspective; hosts the glow */}
        <div
          className={`relative ${conf.floatClass}`}
          style={{ perspective: "1200px" }}
        >
          {/* Soft glow — floats with the phone but is NOT cursor-tilted,
              keeping the blur off the constantly-changing 3D layer */}
          <div className="animate-glow-pulse pointer-events-none absolute -inset-10 sm:-inset-16 -z-10 rounded-full blur-2xl bg-[radial-gradient(circle_at_center,rgba(120,120,120,0.25),transparent_70%)]"></div>

          {/* Layer 4: base tilt/scale/lift + cursor-driven 3D tilt */}
          <div
            className="gpu-stable relative will-change-transform"
            style={{
              transform: `translateY(${conf.lift}px) rotateX(${
                mouse.y * -conf.tilt
              }deg) rotateY(${mouse.x * conf.tilt}deg) rotate(${
                conf.baseRotate
              }deg) scale(${conf.scale})`,
            }}
          >
            <div className="relative w-[124px] h-[266px] sm:w-[230px] sm:h-[480px] rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_20px_120px_-40px_rgba(0,0,0,0.9)] overflow-hidden border border-white/10 bg-black">
              <div className="absolute inset-0 blur-3xl [transform:translateZ(0)] bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.12),transparent_60%)]"></div>
              <Image
                src={conf.src}
                alt={t(conf.altKey)}
                fill
                className="object-contain p-2 relative z-10"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const HERO_PHONES: PhoneConf[] = [
  {
    // Left — Order / cart screen
    src: "/phone-cart.png",
    altKey: "showcase.altOrder",
    baseRotate: -14,
    scale: 0.9,
    lift: 26,
    zClass: "z-10",
    marginClass: "mr-[-22px] sm:mr-[-44px]",
    floatClass: "animate-phone-float",
    enterFrom: "left",
    delayMs: 120,
    depth: 30,
    tilt: 7,
    xStart: -36,
    xEnd: 6,
    yMax: 50,
  },
  {
    // Centre — Menu screen (focal)
    src: "/phone-hero.png",
    altKey: "showcase.altMenu",
    baseRotate: 0,
    scale: 1.05,
    lift: -12,
    zClass: "z-30",
    marginClass: "",
    floatClass: "animate-phone-float-alt",
    enterFrom: "top",
    delayMs: 0,
    depth: 18,
    tilt: 5,
    xStart: 0,
    xEnd: 0,
    yMax: 34,
  },
  {
    // Right — Pay screen
    src: "/phone-pay.png",
    altKey: "showcase.altPayment",
    baseRotate: 14,
    scale: 0.9,
    lift: 26,
    zClass: "z-20",
    marginClass: "ml-[-22px] sm:ml-[-44px]",
    floatClass: "animate-phone-float",
    enterFrom: "right",
    delayMs: 240,
    depth: 30,
    tilt: 7,
    xStart: 36,
    xEnd: -6,
    yMax: 46,
  },
];

function ParallaxPhoneHero() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [mounted, setMounted] = useState<boolean>(false);
  const [mouse, setMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleScroll = () => {
      const rect = node.getBoundingClientRect();
      const windowH = window.innerHeight || 1;
      // 0 while the row is below the fold → 1 as it scrolls into view
      setProgress(1 - Math.min(Math.max(rect.top / windowH, 0), 1));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Trigger the entrance reveal on first paint
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Stop the smoothing loop on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Ease the rendered tilt toward the cursor target a little each frame (lerp),
  // so it glides instead of snapping — including the return to centre on leave.
  const runSmoothing = () => {
    const cur = currentRef.current;
    const tgt = targetRef.current;
    const nx = cur.x + (tgt.x - cur.x) * 0.12;
    const ny = cur.y + (tgt.y - cur.y) * 0.12;
    currentRef.current = { x: nx, y: ny };

    if (Math.abs(tgt.x - nx) > 0.0006 || Math.abs(tgt.y - ny) > 0.0006) {
      setMouse({ x: nx, y: ny });
      rafRef.current = requestAnimationFrame(runSmoothing);
    } else {
      // Settled: land exactly on target and stop the loop
      currentRef.current = { x: tgt.x, y: tgt.y };
      setMouse({ x: tgt.x, y: tgt.y });
      rafRef.current = null;
    }
  };

  const startSmoothing = () => {
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(runSmoothing);
    }
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    targetRef.current = {
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    };
    startSmoothing();
  };

  const handlePointerLeave = () => {
    targetRef.current = { x: 0, y: 0 };
    startSmoothing();
  };

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative max-w-5xl mx-auto text-center overflow-hidden"
    >
      <h2 className="text-white text-2xl font-bold mb-8">
        {t("showcase.title")}
      </h2>
      <div className="relative flex items-center justify-center py-16">
        {HERO_PHONES.map((conf) => (
          <PhoneCard
            key={conf.src}
            conf={conf}
            progress={progress}
            mouse={mouse}
            mounted={mounted}
          />
        ))}
      </div>
    </div>
  );
}

function PricingSection() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const features = t("pricing.features", { returnObjects: true }) as string[];

  return (
    <section
      id="pricing"
      className="scroll-mt-16 py-20 px-6 bg-[#0e0e0e] border-t border-white/5"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-yellow-400/90 bg-yellow-400/10 border border-yellow-400/20 px-3 py-1 rounded-full mb-4">
            {t("pricing.badge")}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
            {t("pricing.titleLead")}
            <span className="text-yellow-400">
              {t("pricing.titleHighlight")}
            </span>
            {t("pricing.titleTrail")}
          </h2>
          <p className="text-gray-400 text-sm">{t("pricing.subtitle")}</p>
        </div>

        <div
          ref={ref}
          className={`relative bg-[#111214] border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_80px_-30px_rgba(0,0,0,0.8)] transform-gpu transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* soft accent glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.08),transparent_60%)]"></div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2">
            {/* Left: price + CTA */}
            <div className="p-8 sm:p-10 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col">
              <div className="inline-flex self-start items-center gap-2 text-[11px] font-semibold tracking-wide text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 px-3 py-1 rounded-full mb-6">
                {t("pricing.firstMonthFree")}
              </div>

              <div className="flex items-end gap-2 mb-1">
                <span className="text-5xl sm:text-6xl font-extrabold text-white">
                  €50
                </span>
                <span className="text-gray-400 text-lg mb-2">
                  {t("pricing.perMonth")}
                </span>
              </div>
              <div className="text-gray-500 text-sm mb-7">
                {t("pricing.beforeVat")}
              </div>

              <a
                href="#demo"
                className="inline-flex items-center justify-center rounded-md bg-yellow-400 text-black font-semibold px-6 py-3 shadow-[0_0_0_1px_rgba(0,0,0,0.1)] hover:brightness-95 transition"
              >
                {t("pricing.cta")}
                <svg
                  className="ml-2 w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.293 15.707a1 1 0 010-1.414L12.586 12H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                </svg>
              </a>

              {/* 2-year discount callout */}
              <div className="mt-5 flex items-center gap-3 rounded-lg bg-yellow-400/5 border border-yellow-400/20 px-4 py-3">
                <span className="inline-flex items-center justify-center w-9 h-9 shrink-0 rounded-md bg-yellow-400/15 border border-yellow-400/30 text-yellow-400 text-sm font-bold">
                  15%
                </span>
                <div>
                  <div className="text-white text-sm font-semibold">
                    {t("pricing.saveTitle")}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {t("pricing.saveDesc")}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: included features */}
            <div className="p-8 sm:p-10">
              <div className="text-white font-semibold mb-5">
                {t("pricing.everythingIncluded")}
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-3.5">
                {features.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-gray-300"
                  >
                    <span className="inline-flex items-center justify-center w-5 h-5 mt-0.5 shrink-0 rounded-full bg-yellow-400/15 border border-yellow-400/30 text-yellow-400">
                      <svg
                        viewBox="0 0 20 20"
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type FaqEntry = { question: string; answer: string };

function FaqItem({
  entry,
  open,
  onToggle,
  index,
  visible,
}: {
  entry: FaqEntry;
  open: boolean;
  onToggle: () => void;
  index: number;
  visible: boolean;
}) {
  const uid = useId();
  const btnId = `faq-btn-${uid}`;
  const panelId = `faq-panel-${uid}`;

  return (
    <div
      style={{ transitionDelay: `${index * 70}ms` }}
      className={`bg-[#111214] border rounded-xl overflow-hidden transition-all transform-gpu duration-700 ease-out ${
        open ? "border-yellow-400/30" : "border-white/5 hover:border-yellow-400/30"
      } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <h3 className="m-0">
        <button
          type="button"
          id={btnId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 cursor-pointer"
        >
          <span className="text-white font-medium text-base">
            {entry.question}
          </span>
          <svg
            viewBox="0 0 24 24"
            className={`w-5 h-5 shrink-0 transition-transform duration-300 ease-out motion-reduce:transition-none ${
              open ? "rotate-180 text-yellow-400" : "text-gray-400"
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </h3>

      {/* Collapsible panel: grid 0fr→1fr animates to exact content height */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p
            className={`px-5 pb-4 text-sm text-gray-400 leading-relaxed transition-opacity duration-300 motion-reduce:transition-none ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            {entry.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

function FaqSection() {
  const { t } = useTranslation();
  const items = t("faq.items", { returnObjects: true }) as FaqEntry[];

  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [openIndex, setOpenIndex] = useState<number>(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="faq"
      className="scroll-mt-16 py-20 px-6 bg-[#0d0d0d] border-t border-white/5"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-yellow-400/90 bg-yellow-400/10 border border-yellow-400/20 px-3 py-1 rounded-full mb-4">
            {t("faq.badge")}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
            {t("faq.titleLead")}
            <span className="text-yellow-400">{t("faq.titleHighlight")}</span>
          </h2>
          <p className="text-gray-400 text-sm">{t("faq.subtitle")}</p>
        </div>

        <div ref={ref} className="space-y-3">
          {items.map((entry, i) => (
            <FaqItem
              key={entry.question}
              entry={entry}
              index={i}
              visible={visible}
              open={openIndex === i}
              onToggle={() => setOpenIndex((prev) => (prev === i ? -1 : i))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  const { t } = useTranslation();

  const navLinks = [
    { key: "features", href: "#features" },
    { key: "howItWorks", href: "#how-it-works" },
    { key: "pricing", href: "#pricing" },
    { key: "faq", href: "#faq" },
    { key: "demo", href: "#demo" },
  ];

  const ctaBenefits = t("ctaSection.benefits", {
    returnObjects: true,
  }) as string[];

  return (
    <main className="min-h-screen bg-black">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-[#0c0c0d]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/chargeme-logo.png"
              alt="ChargeMe"
              width={209}
              height={52}
              className="h-6 w-auto"
              priority
            />
          </Link>

          {/* Center Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-[11px] tracking-widest text-gray-300 hover:text-yellow-400 transition"
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </nav>

          {/* Right: language switcher */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Scan. Order. Pay - Phone Showcase with parallax image */}
      <section className="relative py-16 px-6 bg-[#0d0d0d] border-b border-white/5">
        <ParallaxPhoneHero />
      </section>
      {/* Hero Section based on screenshot */}
      <section className="relative overflow-hidden py-28 px-6 bg-gradient-to-b from-[#0d0d0d] via-[#0b0b0b] to-[#111111]">
        {/* glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.08),transparent_60%)]"></div>
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-yellow-400/90 bg-yellow-400/10 border border-yellow-400/20 px-3 py-1 rounded-full mb-6">
            {t("hero.badge")}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-5">
            {t("hero.titleLead")}
            <span className="text-yellow-400">{t("hero.titleHighlight")}</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300/90 max-w-3xl mx-auto mb-10">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#demo"
              className="inline-flex items-center justify-center rounded-md border border-yellow-400/40 text-yellow-400 font-semibold px-6 py-3 hover:bg-yellow-400/10 transition"
            >
              {t("hero.viewDemo")}
            </a>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section
        id="features"
        className="scroll-mt-16 py-20 px-6 bg-[#0e0e0e] border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-yellow-400 mb-2">
              {t("features.title")}
            </h2>
            <p className="text-gray-400 text-sm">{t("features.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: t("features.items.qr.title"),
                desc: t("features.items.qr.desc"),
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM15 15h6v6h-6z" />
                  </svg>
                ),
              },
              {
                title: t("features.items.mobile.title"),
                desc: t("features.items.mobile.desc"),
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="7" y="2" width="10" height="20" rx="2" />
                    <circle cx="12" cy="18" r="1" />
                  </svg>
                ),
              },
              {
                title: t("features.items.updates.title"),
                desc: t("features.items.updates.desc"),
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                ),
              },
              {
                title: t("features.items.analytics.title"),
                desc: t("features.items.analytics.desc"),
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 3v18h18" />
                    <rect x="7" y="12" width="3" height="6" />
                    <rect x="12" y="9" width="3" height="9" />
                    <rect x="17" y="5" width="3" height="13" />
                  </svg>
                ),
              },
              {
                title: t("features.items.availability.title"),
                desc: t("features.items.availability.desc"),
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 13h8l3 3h7" />
                    <path d="M5 7h3l3 3h7" />
                  </svg>
                ),
              },
              {
                title: t("features.items.contactless.title"),
                desc: t("features.items.contactless.desc"),
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                ),
              },
              {
                title: t("features.items.branding.title"),
                desc: t("features.items.branding.desc"),
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15A7 7 0 118.6 4.6" />
                  </svg>
                ),
              },
              {
                title: t("features.items.multilang.title"),
                desc: t("features.items.multilang.desc"),
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 5h16" />
                    <path d="M9 3v2" />
                    <path d="M15 3v2" />
                    <path d="M10 14l2-2 2 2" />
                    <path d="M12 12v7" />
                  </svg>
                ),
              },
            ].map((f, i) => (
              <FeatureCard key={i} feature={f} index={i} />
            ))}
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="scroll-mt-16 py-20 px-6 bg-[#0f0f0f] border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
              {t("howItWorks.titleLead")}
              <span className="text-yellow-400">
                {t("howItWorks.titleHighlight")}
              </span>
            </h2>
            <p className="text-gray-400 text-sm">{t("howItWorks.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <HowItWorksCard
              delayMs={0}
              step={t("howItWorks.step1.label")}
              title={t("howItWorks.step1.title")}
              description={t("howItWorks.step1.desc")}
              icon={
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM15 15h6v6h-6z" />
                </svg>
              }
            />
            <HowItWorksCard
              delayMs={120}
              step={t("howItWorks.step2.label")}
              title={t("howItWorks.step2.title")}
              description={t("howItWorks.step2.desc")}
              icon={
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="7" y="2" width="10" height="20" rx="2" />
                  <circle cx="12" cy="18" r="1" />
                </svg>
              }
            />
            <HowItWorksCard
              delayMs={240}
              step={t("howItWorks.step3.label")}
              title={t("howItWorks.step3.title")}
              description={t("howItWorks.step3.desc")}
              icon={
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              }
            />
          </div>
        </div>
      </section>
      {/* Pricing Section */}
      <PricingSection />
      {/* FAQ Section */}
      <FaqSection />
      {/* CTA Stripe: Ready to Modernize */}
      <section className="py-20 px-6 bg-[#111111] border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            {t("ctaSection.titleLead")}
            <span className="text-yellow-400">
              {t("ctaSection.titleHighlight")}
            </span>
            {t("ctaSection.titleTrail")}
          </h2>
          <p className="text-gray-400 text-sm mb-6">{t("ctaSection.subtitle")}</p>

          {/* Benefits row */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-8 text-sm">
            {ctaBenefits.map((item) => (
              <div
                key={item}
                className="inline-flex items-center gap-2 text-gray-300"
              >
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-yellow-400/15 border border-yellow-400/30 text-yellow-400">
                  <svg
                    viewBox="0 0 20 20"
                    className="w-3.5 h-3.5"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                {item}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <a
              href="#demo"
              className="inline-flex items-center justify-center rounded-md bg-yellow-400 text-black font-semibold px-6 py-3 shadow-[0_0_0_1px_rgba(0,0,0,0.1)] hover:brightness-95 transition"
            >
              {t("ctaSection.startFreeTrial")}
              <svg
                className="ml-2 w-4 h-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.293 15.707a1 1 0 010-1.414L12.586 12H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
      {/* Request a Demo Form */}
      <section
        id="demo"
        className="scroll-mt-16 py-24 px-6 bg-gradient-to-b from-[#0f0f0f] to-[#0c0c0c]"
      >
        <div className="max-w-xl mx-auto">
          <div className="bg-[#111214]/90 border border-white/5 rounded-xl p-6 shadow-[0_10px_60px_-20px_rgba(0,0,0,0.6)]">
            <h3 className="text-white text-xl font-semibold text-center mb-6">
              {t("demoSection.title")}
            </h3>
            <DemoRequestForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0d0d0d] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
            {/* Brand + blurb */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-yellow-400/15 border border-yellow-400/30 text-yellow-400">
                  <svg
                    viewBox="0 0 20 20"
                    className="w-3.5 h-3.5"
                    fill="currentColor"
                  >
                    <path d="M3 3h6v6H3zM11 3h6v6h-6zM3 11h6v6H3zM11 11h6v6h-6z" />
                  </svg>
                </span>
                <span className="text-white font-semibold">Charge me</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {t("footer.blurb")}
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16v16H4z" opacity="0" />
                    <path d="M4 8l8 5 8-5" />
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                  </svg>
                  chargem3info@gmail.com
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.12.81.32 1.6.59 2.36a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 5 5l1.72-1.14a2 2 0 0 1 2.11-.45c.76.27 1.55.47 2.36.59A2 2 0 0 1 22 16.92z" />
                  </svg>
                  +359884011730
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 21s-6-4.35-6-10a6 6 0 1 1 12 0c0 5.65-6 10-6 10z" />
                    <circle cx="12" cy="11" r="2" />
                  </svg>
                  Sofia, Bulgaria
                </li>
              </ul>
            </div>

            {/* Quick links to on-page sections */}
            <div className="md:text-right">
              <div className="text-white font-semibold mb-3">
                {t("footer.quickLinks.title")}
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#features" className="hover:text-yellow-400">
                    {t("footer.quickLinks.features")}
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-yellow-400">
                    {t("footer.quickLinks.howItWorks")}
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-yellow-400">
                    {t("footer.quickLinks.pricing")}
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-yellow-400">
                    {t("footer.quickLinks.faq")}
                  </a>
                </li>
                <li>
                  <a href="#demo" className="hover:text-yellow-400">
                    {t("footer.quickLinks.demo")}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 text-center text-sm text-gray-500">
            {t("footer.copyright")}
          </div>
        </div>
      </footer>
    </main>
  );
}
