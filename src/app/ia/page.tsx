"use client";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import Image from "next/image";
import DemoRequestForm from "./DemoRequestForm";

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

type PhoneCardProps = {
  alt: string;
  parallax: { x: number; y: number };
  mouse: { x: number; y: number };
  mounted: boolean;
  baseRotate: number;
  zClass: string;
  floatClass: string;
  delayMs: number;
  depth: number;
  tilt: number;
};

function PhoneCard({
  alt,
  parallax,
  mouse,
  mounted,
  baseRotate,
  zClass,
  floatClass,
  delayMs,
  depth,
  tilt,
}: PhoneCardProps) {
  return (
    // Layer 1: scroll + mouse parallax (translate)
    <div
      className={`relative ${zClass}`}
      style={{
        transform: `translate3d(${parallax.x + mouse.x * depth}px, ${
          parallax.y + mouse.y * depth * 0.5
        }px, 0)`,
      }}
    >
      {/* Layer 2: entrance reveal */}
      <div
        className="transition-all duration-1000 ease-out will-change-transform"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted
            ? "translateY(0) scale(1)"
            : "translateY(56px) scale(0.9)",
          transitionDelay: `${delayMs}ms`,
        }}
      >
        {/* Layer 3: continuous float (CSS keyframes) + perspective; hosts the glow */}
        <div
          className={`relative ${floatClass}`}
          style={{ perspective: "1200px" }}
        >
          {/* Soft glow — floats with the phone but is NOT cursor-tilted,
              keeping the blur off the constantly-changing 3D layer */}
          <div className="animate-glow-pulse pointer-events-none absolute -inset-10 sm:-inset-16 -z-10 rounded-full blur-2xl bg-[radial-gradient(circle_at_center,rgba(120,120,120,0.25),transparent_70%)]"></div>

          {/* Layer 4: base tilt + cursor-driven 3D tilt */}
          <div
            className="gpu-stable relative will-change-transform"
            style={{
              transform: `rotateX(${mouse.y * -tilt}deg) rotateY(${
                mouse.x * tilt
              }deg) rotate(${baseRotate}deg)`,
            }}
          >
            <div className="relative w-[150px] h-[320px] sm:w-[240px] sm:h-[500px] rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_20px_120px_-40px_rgba(0,0,0,0.9)] overflow-hidden border border-white/10 bg-black">
              <div className="absolute inset-0 blur-3xl [transform:translateZ(0)] bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.12),transparent_60%)]"></div>
              <Image
                src="/phone-hero.png"
                alt={alt}
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

function ParallaxPhoneHero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY2, setOffsetY2] = useState<number>(0);
  const [offsetX2, setOffsetX2] = useState<number>(0);
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
      const progress = 1 - Math.min(Math.max(rect.top / windowH, 0), 1);
      // Vertical parallax (kept within the row's padding so it never clips)
      setOffsetY(progress * 50);
      setOffsetY2(progress * 40);
      // Converging horizontal motion
      const leftStart = -40; // px
      const leftEnd = 20; // px
      const rightStart = 40; // px
      const rightEnd = -20; // px
      setOffsetX(leftStart + (leftEnd - leftStart) * progress);
      setOffsetX2(rightStart + (rightEnd - rightStart) * progress);
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
      <h2 className="text-white text-2xl font-bold mb-8">Scan. Order. Pay</h2>
      <div className="relative flex items-center justify-center gap-6 sm:gap-12 py-16">
        <PhoneCard
          alt="ChargeMe screen"
          parallax={{ x: offsetX, y: offsetY }}
          mouse={mouse}
          mounted={mounted}
          baseRotate={-12}
          zClass="z-10"
          floatClass="animate-phone-float"
          delayMs={120}
          depth={22}
          tilt={6}
        />
        <PhoneCard
          alt="ChargeMe screen 2"
          parallax={{ x: offsetX2, y: offsetY2 }}
          mouse={mouse}
          mounted={mounted}
          baseRotate={12}
          zClass="z-20"
          floatClass="animate-phone-float-alt"
          delayMs={280}
          depth={36}
          tilt={9}
        />
      </div>
    </div>
  );
}

export default function Page() {
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
            {[
              { label: "ABOUT US", href: "#about" },
              { label: "TECHNOLOGY", href: "#technology" },
              { label: "BLOG", href: "#blog" },
              { label: "SHOP", href: "#shop" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[11px] tracking-widest text-gray-300 hover:text-yellow-400 transition"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Icon */}
          <button
            aria-label="Cart"
            className="text-gray-300 hover:text-yellow-400 transition"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6h15l-1.5 9h-12z" />
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
              <path d="M6 6l-1-3H2" />
            </svg>
          </button>
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
            Scan. Order. Pay.
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-5">
            The Future of{" "}
            <span className="text-yellow-400">Restaurant Menus</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300/90 max-w-3xl mx-auto mb-10">
            A modern QR-powered dining experience. Let guests browse, customize,
            and pay securely from their phones—no app required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#get-started"
              className="inline-flex items-center justify-center rounded-md bg-yellow-400 text-black font-semibold px-6 py-3 shadow-[0_0_0_1px_rgba(0,0,0,0.1)] hover:brightness-95 transition"
            >
              Get Started
            </a>
            <a
              href="#demo"
              className="inline-flex items-center justify-center rounded-md border border-yellow-400/40 text-yellow-400 font-semibold px-6 py-3 hover:bg-yellow-400/10 transition"
            >
              View Demo
            </a>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 px-6 bg-[#0e0e0e] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-yellow-400 mb-2">
              Powerful Features
            </h2>
            <p className="text-gray-400 text-sm">
              Everything you need to modernize your restaurant&apos;s menu
              experience
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: "QR Code Integration",
                desc: "Customers scan a unique QR code to instantly access your digital menu.",
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
                title: "Mobile Optimized",
                desc: "Perfect experience on all screens with responsive design.",
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
                title: "Easy Menu Updates",
                desc: "Add, edit, or remove items in minutes—no app-store resubmits.",
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
                title: "Analytics Dashboard",
                desc: "See order trends, best-sellers, and performance.",
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
                title: "Real-time Availability",
                desc: "Mark items as sold-out instantly across your locations.",
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
                title: "Contactless & Safe",
                desc: "Reduce physical contact while maintaining excellent service.",
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
                title: "Custom Branding",
                desc: "Match your brand with custom colors, fonts, and logos.",
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
                title: "Multi-language Support",
                desc: "Serve guests in their language with effortless switching.",
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
      <section className="py-20 px-6 bg-[#0f0f0f] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
              How It <span className="text-yellow-400">Works</span>
            </h2>
            <p className="text-gray-400 text-sm">
              Simple, seamless, and secure - your customers will love the
              experience
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <HowItWorksCard
              delayMs={0}
              step="STEP 3"
              title="Place Order"
              description="Customers can view items, see prices, and place orders directly from their phone"
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
            <HowItWorksCard
              delayMs={120}
              step="STEP 2"
              title="Browse Menu"
              description="Your beautifully designed digital menu opens instantly on their device"
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
              step="STEP 1"
              title="Scan QR Code"
              description="Customers scan the QR code placed on their table using their smartphone camera"
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
          </div>
        </div>
      </section>
      {/* CTA Stripe: Ready to Modernize */}
      <section className="py-20 px-6 bg-[#111111] border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Ready to <span className="text-yellow-400">Modernize</span> Your
            Restaurant?
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Join thousands of restaurants already using QR Menu Pro to enhance
            their customer experience
          </p>

          {/* Benefits row */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-8 text-sm">
            {[
              "14-day free trial",
              "No setup fees",
              "24/7 support",
              "Easy migration",
            ].map((item) => (
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
              href="#free-trial"
              className="inline-flex items-center justify-center rounded-md bg-yellow-400 text-black font-semibold px-6 py-3 shadow-[0_0_0_1px_rgba(0,0,0,0.1)] hover:brightness-95 transition"
            >
              Start Your Free Trial
              <svg
                className="ml-2 w-4 h-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.293 15.707a1 1 0 010-1.414L12.586 12H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
              </svg>
            </a>
            <a
              href="#schedule-demo"
              className="inline-flex items-center justify-center rounded-md border border-yellow-400/40 text-yellow-400 font-semibold px-6 py-3 hover:bg-yellow-400/10 transition"
            >
              Schedule Demo
            </a>
          </div>

          <div className="text-[12px] text-gray-500">
            No credit card required • Cancel anytime
          </div>
        </div>
      </section>
      {/* Request a Demo Form */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#0f0f0f] to-[#0c0c0c]">
        <div className="max-w-xl mx-auto">
          <div className="bg-[#111214]/90 border border-white/5 rounded-xl p-6 shadow-[0_10px_60px_-20px_rgba(0,0,0,0.6)]">
            <h3 className="text-white text-xl font-semibold text-center mb-6">
              Request a Demo
            </h3>
            <DemoRequestForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0d0d0d] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
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
                <span className="text-white font-semibold">QR Menu Pro</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Revolutionizing restaurant experiences with smart digital menu
                solutions.
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
                  hello@qrmenupro.com
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
                  +1 (555) 123-4567
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
                  San Francisco, CA
                </li>
              </ul>
            </div>

            {/* Product */}
            <div>
              <div className="text-white font-semibold mb-3">Product</div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#features" className="hover:text-yellow-400">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-yellow-400">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#demo" className="hover:text-yellow-400">
                    Demo
                  </a>
                </li>
                <li>
                  <a href="#api" className="hover:text-yellow-400">
                    API
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <div className="text-white font-semibold mb-3">Company</div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#about" className="hover:text-yellow-400">
                    About
                  </a>
                </li>
                <li>
                  <a href="#blog" className="hover:text-yellow-400">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#careers" className="hover:text-yellow-400">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-yellow-400">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <div className="text-white font-semibold mb-3">Support</div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#help" className="hover:text-yellow-400">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#docs" className="hover:text-yellow-400">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#community" className="hover:text-yellow-400">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#status" className="hover:text-yellow-400">
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 text-center text-sm text-gray-500">
            © 2024 QR Menu Pro. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
