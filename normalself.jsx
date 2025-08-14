import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export default function KarthickPortfolio() {
  const cardRef = useRef(null);
  const particlesRef = useRef(null);
  const controls = useAnimation();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // This updated version is a complete, premium-feel site with full sections ready to impress.
  // Elon Musk-worthy design elements: space-inspired gradients, smooth parallax, particles, subtle 3D transforms.

  useEffect(() => {
    const canvas = particlesRef.current;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles = [];
    const PARTICLE_COUNT = Math.floor((w * h) / 70000) + 60;

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    function create() {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: rand(0, w),
          y: rand(0, h),
          vx: rand(-0.2, 0.2),
          vy: rand(-0.2, 0.2),
          r: rand(0.6, 2.5),
          hue: Math.floor(rand(200, 300)),
          alpha: rand(0.2, 0.8),
        });
      }
    }

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function step() {
      ctx.clearRect(0, 0, w, h);
      for (let p of particles) {
        p.x += p.vx + (mouse.x - w / 2) * 0.0003;
        p.y += p.vy + (mouse.y - h / 2) * 0.0003;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 90%, 60%, ${p.alpha})`;
        ctx.shadowColor = `hsla(${p.hue}, 90%, 60%, ${p.alpha})`;
        ctx.shadowBlur = p.r * 6;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(step);
    }

    create();
    window.addEventListener("resize", resize);
    resize();
    step();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [mouse]);

  useEffect(() => {
    function handleMove(e) {
      setMouse({ x: e.clientX, y: e.clientY });
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;

      el.style.transform = `translate3d(${dx * 14}px, ${dy * 10}px, 0) rotateX(${dy * -6}deg) rotateY(${dx * 8}deg)`;
      el.style.boxShadow = `${-dx * 20}px ${dy * 20}px 60px rgba(0,255,200,0.25)`;
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) controls.start("visible");
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".fade-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [controls]);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden text-white bg-gradient-to-br from-[#05010a] via-[#0b0f2b] to-[#010101] px-6 md:px-12 lg:px-24">
      <canvas ref={particlesRef} className="pointer-events-none fixed inset-0 -z-10" style={{ width: "100%", height: "100%" }} />

      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center h-screen text-center">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500">
          Hi, I'm Karthick
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="mt-6 text-lg md:text-xl max-w-2xl text-white/80">
          I design and develop visually stunning, high-performance, space-inspired web experiences.
        </motion.p>
      </section>

      {/* Interactive Card */}
      <section className="flex justify-center py-20">
        <motion.div ref={cardRef} className="w-96 h-60 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md flex flex-col justify-center items-center shadow-xl">
          <span className="text-2xl font-bold">Next-Gen Developer</span>
          <span className="text-white/70">Ready to build the future</span>
        </motion.div>
      </section>

      {/* About */}
      <section id="about" className="py-20">
        <motion.div initial="hidden" whileInView="visible" variants={fadeUp} className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">About Me</h2>
          <p className="text-white/80 leading-relaxed">
            Passionate front-end engineer with expertise in crafting responsive, animated, and interactive web apps.
            I blend technology and creativity to deliver experiences that stand out.
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm opacity-70">© {new Date().getFullYear()} Karthick — Built for the stars</footer>
    </div>
  );
}
