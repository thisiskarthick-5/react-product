import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, ExternalLink, ChevronDown, Sparkles } from "lucide-react";

/**
 * Animated React Portfolio – single-file component
 * TailwindCSS + Framer Motion + Lucide icons
 *
 * Notes:
 * - Drop this file into a React + Tailwind project and export as default.
 * - Replace YOUR_* placeholders with your info.
 * - Add your images in the projects array.
 */

// --- Helpers ---------------------------------------------------------------
const cn = (...c) => c.filter(Boolean).join(" ");

const Section = ({ id, children, className }) => (
  <section id={id} className={cn("relative mx-auto w-full max-w-6xl px-6 py-24 md:py-32", className)}>
    {children}
  </section>
);

const useMouseParallax = (strength = 20) => {
  const [offset, set] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      const x = ((e.clientX - w / 2) / w) * strength;
      const y = ((e.clientY - h / 2) / h) * strength;
      set({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [strength]);
  return offset;
};

const FadeIn = ({ children, delay = 0, y = 20 }) => (
  <motion.div initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: "easeOut", delay }}>
    {children}
  </motion.div>
);

// Floating orbs background
const Orbs = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <motion.div
      aria-hidden
      className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-violet-600/30 blur-3xl"
      animate={{ y: [0, 20, -10, 0], x: [0, 10, -10, 0] }}
      transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
    />
    <motion.div
      aria-hidden
      className="absolute -bottom-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/20 blur-3xl"
      animate={{ y: [0, -15, 10, 0], x: [0, -10, 10, 0] }}
      transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
    />
    <motion.div
      aria-hidden
      className="absolute left-1/3 top-1/3 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-3xl"
      animate={{ scale: [1, 1.2, 0.9, 1] }}
      transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
    />
  </div>
);

// --- Data -----------------------------------------------------------------
const skills = [
  "React",
  "TypeScript",
  "Node.js",
  "Next.js",
  "TailwindCSS",
  "Framer Motion",
  "PostgreSQL",
  "GraphQL",
  "Figma",
  "Cypress",
  "AWS",
];

const projects = [
  {
    title: "InsightDash",
    description: "Analytics dashboard with live streaming charts and role-based access.",
    tech: ["React", "TypeScript", "Recharts", "Express"],
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1160&auto=format&fit=crop",
    demo: "https://example.com",
    code: "https://github.com/your_user/insight-dash",
  },
  {
    title: "FlowNotes",
    description: "Markdown knowledge base with AI search and real‑time collaboration.",
    tech: ["Next.js", "Tailwind", "Supabase", "WebRTC"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1160&auto=format&fit=crop",
    demo: "https://example.com",
    code: "https://github.com/your_user/flownotes",
  },
  {
    title: "ShopLite",
    description: "Headless e‑commerce starter with checkout, inventory, and CMS.",
    tech: ["Remix", "Stripe", "Prisma"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1160&auto=format&fit=crop",
    demo: "https://example.com",
    code: "https://github.com/your_user/shoplite",
  },
];

const testimonials = [
  {
    quote: "Delivers beautiful, accessible interfaces and ships fast.",
    name: "Ava Rogers",
    role: "Product Lead, BrightLabs",
  },
  {
    quote: "A rare mix of design sensibility and engineering rigor.",
    name: "Marcus Lin",
    role: "CTO, NovaCloud",
  },
  {
    quote: "Elevated our UX overnight. Our users noticed immediately.",
    name: "Priya Sharma",
    role: "Founder, Lumen AI",
  },
];

// --- Components -----------------------------------------------------------
const Nav = () => {
  const [open, setOpen] = useState(false);
  const items = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <div className="fixed inset-x-0 top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="group inline-flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-violet-400 transition-transform group-hover:rotate-12" />
          <span className="font-semibold tracking-tight text-zinc-200">YOUR_NAME</span>
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {items.map((it) => (
            <a key={it.href} href={it.href} className="text-sm text-zinc-300 transition hover:text-white">
              {it.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm text-zinc-100 ring-1 ring-white/15 transition hover:bg-white/20"
          >
            <Download className="h-4 w-4" /> Resume
          </a>
        </div>
        <button onClick={() => setOpen((v) => !v)} className="md:hidden">
          <span className="sr-only">Toggle menu</span>
          <div className="h-5 w-6">
            <motion.span className="block h-0.5 w-6 bg-zinc-300" animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }} />
            <motion.span className="mt-1 block h-0.5 w-6 bg-zinc-300" animate={{ opacity: open ? 0 : 1 }} />
            <motion.span className="mt-1 block h-0.5 w-6 bg-zinc-300" animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }} />
          </div>
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-auto max-w-6xl px-6 pb-4 md:hidden"
          >
            <div className="grid gap-2 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              {items.map((it) => (
                <a key={it.href} href={it.href} className="rounded-xl px-3 py-2 text-sm text-zinc-200 hover:bg-white/10">
                  {it.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const par = useMouseParallax(30);

  return (
    <div id="top" ref={ref} className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(90rem_90rem_at_50%_-20%,rgba(124,58,237,.25),transparent_60%),linear-gradient(180deg,rgba(20,20,22,1),rgba(20,20,22,.9))]" />
      <Orbs />
      <Section className="flex min-h-[85vh] flex-col items-center justify-center text-center">
        <motion.h1 style={{ y }} className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-4xl font-extrabold leading-tight text-transparent sm:text-6xl">
          Build intuitive experiences your users will love
        </motion.h1>
        <FadeIn delay={0.15}>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-zinc-300">
            I’m <span className="font-semibold text-zinc-100">YOUR_NAME</span>, a <span className="font-medium">YOUR_ROLE</span> crafting performant, accessible and beautiful web apps.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="#projects" className="group inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-violet-600/25 transition-transform hover:scale-[1.02] active:scale-[.98]">
              View Projects <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 text-sm font-medium text-zinc-100 ring-1 ring-white/15 transition hover:bg-white/20">
              Contact Me <Mail className="h-4 w-4" />
            </a>
          </div>
        </FadeIn>
        <motion.div style={{ x: par.x, y: par.y }} className="pointer-events-none mt-16 w-full max-w-5xl rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur">
          <img
            alt="preview"
            src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1400&auto=format&fit=crop"
            className="h-64 w-full rounded-xl object-cover opacity-95"
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block">
          <ChevronDown className="h-6 w-6 animate-bounce text-zinc-400" />
        </motion.div>
      </Section>
    </div>
  );
};

const About = () => (
  <Section id="about">
    <div className="grid items-center gap-10 md:grid-cols-2">
      <FadeIn>
        <div className="relative">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-violet-600/30 to-fuchsia-500/30 blur" />
          <img
            src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=800&auto=format&fit=crop"
            alt="Portrait"
            className="relative z-10 h-72 w-full rounded-2xl object-cover"
          />
        </div>
      </FadeIn>
      <FadeIn delay={0.15}>
        <div>
          <h2 className="text-2xl font-semibold text-white md:text-3xl">About me</h2>
          <p className="mt-4 text-zinc-300">
            I design and build delightful web products with a focus on motion and micro‑interactions. My work spans early‑stage startups to enterprise tools, always balancing craft, speed, and accessibility.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-zinc-300 md:grid-cols-3">
            {[
              "5+ years experience",
              "Remote‑friendly",
              "UI/UX minded",
              "Performance driven",
              "Tested & typed",
              "Thoughtful docs",
            ].map((f) => (
              <div key={f} className="rounded-xl bg-white/5 px-3 py-2 ring-1 ring-white/10">{f}</div>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  </Section>
);

const Skills = () => (
  <Section id="skills" className="">
    <FadeIn>
      <h2 className="text-center text-2xl font-semibold text-white md:text-3xl">Tech I love</h2>
    </FadeIn>
    <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {skills.map((s, i) => (
        <motion.div
          key={s}
          className="rounded-2xl bg-white/5 p-4 text-center text-sm text-zinc-200 ring-1 ring-white/10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.04, duration: 0.4 }}
          whileHover={{ y: -3, scale: 1.02 }}
        >
          {s}
        </motion.div>
      ))}
    </div>
  </Section>
);

const ProjectCard = ({ p }) => (
  <motion.div
    whileHover={{ y: -6 }}
    className="group overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.03] shadow-xl"
  >
    <div className="relative">
      <img src={p.image} alt={p.title} className="h-56 w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
    <div className="p-6">
      <h3 className="text-lg font-semibold text-white">{p.title}</h3>
      <p className="mt-2 text-sm text-zinc-300">{p.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {p.tech.map((t) => (
          <span key={t} className="rounded-full bg-white/10 px-2 py-1 text-xs text-zinc-300 ring-1 ring-white/10">
            {t}
          </span>
        ))}
      </div>
      <div className="mt-5 flex gap-3">
        <a href={p.demo} className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs text-zinc-100 ring-1 ring-white/15 transition hover:bg-white/20">
          Live Demo <ExternalLink className="h-3.5 w-3.5" />
        </a>
        <a href={p.code} className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs text-zinc-100 ring-1 ring-white/15 transition hover:bg-white/20">
          Code <Github className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  </motion.div>
);

const Projects = () => (
  <Section id="projects">
    <FadeIn>
      <h2 className="text-center text-2xl font-semibold text-white md:text-3xl">Featured work</h2>
    </FadeIn>
    <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((p, i) => (
        <motion.div key={p.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
          <ProjectCard p={p} />
        </motion.div>
      ))}
    </div>
  </Section>
);

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 3800);
    return () => clearInterval(id);
  }, []);
  return (
    <Section id="testimonials">
      <FadeIn>
        <h2 className="text-center text-2xl font-semibold text-white md:text-3xl">Kind words</h2>
      </FadeIn>
      <div className="relative mx-auto mt-10 max-w-3xl">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-xl">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5 }}
              className="text-balance text-lg text-zinc-200"
            >
              “{testimonials[index].quote}”
              <footer className="mt-4 text-sm text-zinc-400">
                — {testimonials[index].name}, {testimonials[index].role}
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
};

const Contact = () => (
  <Section id="contact" className="pb-32">
    <FadeIn>
      <h2 className="text-center text-2xl font-semibold text-white md:text-3xl">Let’s build something</h2>
    </FadeIn>
    <div className="mx-auto mt-10 grid max-w-3xl gap-6 md:grid-cols-2">
      <form className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl">
        <div className="grid gap-4">
          {[
            { label: "Name", type: "text" },
            { label: "Email", type: "email" },
          ].map((f) => (
            <div key={f.label} className="grid gap-1">
              <label className="text-xs text-zinc-400">{f.label}</label>
              <input type={f.type} placeholder={`Your ${f.label.toLowerCase()}`} className="rounded-xl bg-black/40 px-3 py-2 text-sm text-zinc-100 ring-1 ring-white/10 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
          ))}
          <div className="grid gap-1">
            <label className="text-xs text-zinc-400">Message</label>
            <textarea rows={4} placeholder="Tell me about your project" className="rounded-xl bg-black/40 px-3 py-2 text-sm text-zinc-100 ring-1 ring-white/10 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500" />
          </div>
          <motion.button whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.01 }} className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-violet-600/25">
            Send <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      </form>
      <div className="grid content-between gap-6">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-sm text-zinc-300">
            Prefer email or DMs? Reach me anytime. I’m open to freelance, full‑time, or collaboration.
          </p>
          <div className="mt-4 flex gap-3">
            <a href="mailto:you@example.com" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs text-zinc-100 ring-1 ring-white/15 transition hover:bg-white/20">
              <Mail className="h-3.5 w-3.5" /> you@example.com
            </a>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-xs uppercase tracking-wider text-zinc-400">Find me</p>
          <div className="mt-3 flex gap-3">
            <a href="https://github.com/your_user" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs text-zinc-100 ring-1 ring-white/15 transition hover:bg-white/20">
              <Github className="h-3.5 w-3.5" /> GitHub
            </a>
            <a href="https://linkedin.com/in/your_user" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs text-zinc-100 ring-1 ring-white/15 transition hover:bg-white/20">
              <Linkedin className="h-3.5 w-3.5" /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

const Footer = () => (
  <footer className="relative mt-20 border-t border-white/10 py-10 text-center text-xs text-zinc-500">
    <div className="mx-auto max-w-6xl px-6">
      © {new Date().getFullYear()} YOUR_NAME — Built with React, Tailwind & Framer Motion
    </div>
  </footer>
);

// --- Page Shell -----------------------------------------------------------
export default function PortfolioSite() {
  return (
    <main className="min-h-screen scroll-smooth bg-[#141416] text-zinc-100 antialiased">
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
