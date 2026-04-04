"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import ContactForm from "./components/ContactForm";

export default function PortfolioPage() {
  const [typedName, setTypedName] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadPct, setLoadPct] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollPct, setScrollPct] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const skillsRef = useRef<HTMLElement>(null);

  // ── DATA ──────────────────────────────────────────────
  const skills = [
    { name: "MySQL", level: 96, logo: "/mysql.jpeg" },
    {
      name: "Information System Analysis & Design",
      level: 95,
      logo: "/isad.jpeg",
    },
    { name: "JavaFX", level: 92, logo: "/javafx.jpeg" },
    { name: "Tableau", level: 92, logo: "/tableau.png" },
    { name: "Excel", level: 90, logo: "/excel.jpeg" },
    { name: "MongoDB", level: 90, logo: "/mongodb.jpeg" },
    { name: "Laravel", level: 90, logo: "/laravel.png" },
    { name: "Figma", level: 86, logo: "/figma.png" },
    { name: "Java", level: 85, logo: "/java.png" },
    { name: "Accounting", level: 80, logo: "/accounting.jpeg" },
    { name: "UiPath", level: 85, logo: "/uipath.png" },
  ];

  const projects = [
    {
      title: "Beenus Billiard Club",
      tag: "Full-Stack Web",
      desc: "Full-stack web application built with Laravel.",
      github: "https://github.com/AlbertSumedha/Herd",
      image: "/bbc.png",
    },
    {
      title: "JigiBoxZ",
      tag: "Database",
      desc: "Relational database schema & manipulation using SSMS.",
      github: "https://github.com/AlbertSumedha/JigiBoxZ-SSMS-",
      image: "/jigiboxz.png",
    },
    {
      title: "DollaBookShop",
      tag: "Desktop App",
      desc: "JavaFX desktop app with MySQL (XAMPP).",
      github: "https://github.com/AlbertSumedha/DollarBookShops-JavaFX-",
      image: "/dbs.png",
    },
    {
      title: "Perpustakaan",
      tag: "Database CRUD",
      desc: "Library database CRUD with MongoDB.",
      github:
        "https://docs.google.com/document/d/1ixqau-BE0UX0_OkB_IzxhlVErJ1_Mz8X/edit?usp=sharing",
      image: "/perpustakaan.jpg",
    },
    {
      title: "DzKimline",
      tag: "Data Warehouse",
      desc: "Data cleansing & data warehouse for BI purposes.",
      github:
        "https://drive.google.com/drive/folders/1dsXa9zGI3NCB_oHGJ-cp8QXBwKINL_Mi?usp=sharing",
      image: "/dzkimline.jpeg",
    },
  ];

  const certificates = [
    {
      title: "Basic Financial Accounting",
      issuer: "Ikatan Akuntan Indonesia",
      date: "January 2026",
      image: "/Certificate/BFA Certificate.png",
      credential:
        "https://drive.google.com/file/d/1fMZ6fTXCjR_R9gr5E3KvuGWRslsjs31v/view?usp=sharing",
    },
    {
      title: "Coming Soon",
      issuer: "Issuer Name",
      date: "Month Year",
      image: "/cert2.png",
      credential: "https://your-credential-link.com",
    },
  ];

  const navItems = [
    "Home",
    "Skills",
    "Projects",
    "Certificates",
    "About",
    "Contact",
  ];

  // ── LOADING SCREEN ────────────────────────────────────
  useEffect(() => {
    let pct = 0;
    const iv = setInterval(() => {
      pct += Math.random() * 18 + 4;
      if (pct >= 100) {
        pct = 100;
        clearInterval(iv);
        setTimeout(() => setLoading(false), 500);
      }
      setLoadPct(Math.min(Math.round(pct), 100));
    }, 120);
    return () => clearInterval(iv);
  }, []);

  // ── TYPING NAME ───────────────────────────────────────
  useEffect(() => {
    if (loading) return;
    const full = "Albert Sumedha KT";
    let i = 0;
    const timer = setInterval(() => {
      setTypedName(full.slice(0, i + 1));
      i++;
      if (i === full.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, [loading]);

  // ── SCROLL: progress + active nav + back-to-top ───────
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const pct = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
      setScrollPct(pct);
      setShowTop(doc.scrollTop > 400);
      const sections = navItems.map((n) => n.toLowerCase());
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && doc.scrollTop >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── SCROLL REVEAL ─────────────────────────────────────
  useEffect(() => {
    if (loading) return;
    const reveals = document.querySelectorAll<HTMLElement>(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, idx) => {
          if (e.isIntersecting) {
            setTimeout(
              () => (e.target as HTMLElement).classList.add("visible"),
              idx * 60,
            );
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    reveals.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [loading]);

  // ── SKILL BARS ────────────────────────────────────────
  useEffect(() => {
    const sec = skillsRef.current;
    if (!sec) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            document
              .querySelectorAll<HTMLElement>(".skill-fill")
              .forEach((b) => {
                b.style.width = (b.dataset.target || "0") + "%";
              });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );
    obs.observe(sec);
    return () => obs.disconnect();
  }, [loading]);

  // ── CUSTOM CURSOR ─────────────────────────────────────
  useEffect(() => {
    if (loading) return;
    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    if (!dot || !ring) return;
    let rx = 0,
      ry = 0,
      mx = 0,
      my = 0;
    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px,${my}px)`;
    };
    const raf = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.transform = `translate(${rx}px,${ry}px)`;
      requestAnimationFrame(raf);
    };
    window.addEventListener("mousemove", move);
    raf();
    const addHover = () => {
      dot.classList.add("hovered");
      ring.classList.add("hovered");
    };
    const rmHover = () => {
      dot.classList.remove("hovered");
      ring.classList.remove("hovered");
    };
    document
      .querySelectorAll("a,button,.skill-card,.project-card,.cert-card")
      .forEach((el) => {
        el.addEventListener("mouseenter", addHover);
        el.addEventListener("mouseleave", rmHover);
      });
    return () => window.removeEventListener("mousemove", move);
  }, [loading]);

  // ── MAGNETIC BUTTONS ──────────────────────────────────
  useEffect(() => {
    if (loading) return;
    const btns = document.querySelectorAll<HTMLElement>(".mag-btn");
    btns.forEach((btn) => {
      const onMove = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        btn.style.transform = `translate(${dx * 0.28}px,${dy * 0.28}px)`;
      };
      const onLeave = () => {
        btn.style.transform = "translate(0,0)";
      };
      btn.addEventListener("mousemove", onMove as EventListener);
      btn.addEventListener("mouseleave", onLeave);
    });
  }, [loading]);

  // ── CARD TILT ─────────────────────────────────────────
  useEffect(() => {
    if (loading) return;
    const cards = document.querySelectorAll<HTMLElement>(".tilt-card");
    cards.forEach((card) => {
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 14;
        const y = ((e.clientY - r.top) / r.height - 0.5) * -14;
        card.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
      };
      const onLeave = () => {
        card.style.transform =
          "perspective(700px) rotateX(0) rotateY(0) translateY(0)";
      };
      card.addEventListener("mousemove", onMove as EventListener);
      card.addEventListener("mouseleave", onLeave);
    });
  }, [loading]);

  // ── PARTICLE CANVAS ───────────────────────────────────
  useEffect(() => {
    if (loading) return;
    const canvas = document.getElementById("particles") as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = (canvas.width = canvas.offsetWidth);
    let H = (canvas.height = canvas.offsetHeight);
    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resize);
    const count = 80;
    const pts = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      c: Math.random() > 0.6 ? "#6c63ff" : "#00d4aa",
    }));
    let rafId: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c + "99";
        ctx.fill();
      });
      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x,
            dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(108,99,255,${0.12 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      rafId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [loading]);

  if (loading)
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#08090d",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          fontFamily: "'Manrope',sans-serif",
        }}
      >
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800&display=swap');`}</style>
        <div
          style={{
            fontWeight: 800,
            fontSize: "3.5rem",
            letterSpacing: "-0.06em",
            background: "linear-gradient(135deg,#6c63ff,#00d4aa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "2.5rem",
          }}
        >
          AS.
        </div>
        <div
          style={{
            width: 220,
            height: 2,
            background: "rgba(255,255,255,0.08)",
            borderRadius: 100,
            overflow: "hidden",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              height: "100%",
              background: "linear-gradient(90deg,#6c63ff,#00d4aa)",
              borderRadius: 100,
              width: `${loadPct}%`,
              transition: "width .1s",
            }}
          />
        </div>
        <div
          style={{
            fontSize: "0.8rem",
            color: "#8888a4",
            fontWeight: 600,
            letterSpacing: "0.1em",
          }}
        >
          {loadPct}%
        </div>
      </div>
    );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        :root {
          --bg:#08090d; --surface:#111218; --surface2:#191b24;
          --border:rgba(255,255,255,0.07); --accent:#6c63ff; --accent2:#00d4aa;
          --text:#f0f0f5; --muted:#8888a4;
          --font-display:'Manrope',sans-serif; --font-body:'Plus Jakarta Sans',sans-serif;
        }
        *,*::before,*::after{box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        body{background:var(--bg);color:var(--text);font-family:var(--font-body);overflow-x:hidden;cursor:none;}
        body::before{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");pointer-events:none;z-index:0;opacity:.5;}

        /* Cursor */
        #cursor-dot{position:fixed;top:-5px;left:-5px;width:8px;height:8px;border-radius:50%;background:#6c63ff;pointer-events:none;z-index:9999;transition:width .2s,height .2s,background .2s;margin-left:-4px;margin-top:-4px;}
        #cursor-ring{position:fixed;top:-18px;left:-18px;width:36px;height:36px;border-radius:50%;border:1.5px solid rgba(108,99,255,0.5);pointer-events:none;z-index:9998;margin-left:-18px;margin-top:-18px;transition:width .2s,height .2s,border-color .2s;}
        #cursor-dot.hovered{width:12px;height:12px;background:#00d4aa;}
        #cursor-ring.hovered{width:50px;height:50px;border-color:rgba(0,212,170,0.5);}

        /* Scroll bar */
        #scroll-bar{position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,#6c63ff,#00d4aa);z-index:200;transition:width .05s linear;pointer-events:none;}

        /* Reveal */
        .reveal{opacity:0;transform:translateY(32px);transition:opacity .75s ease,transform .75s ease;}
        .reveal.visible{opacity:1;transform:none;}

        /* Hero rings */
        .hero-ring{position:absolute;inset:-14px;border-radius:50%;border:1px solid rgba(108,99,255,0.25);animation:spin 12s linear infinite;}
        .hero-ring::after{content:'';position:absolute;top:-4px;left:50%;width:8px;height:8px;border-radius:50%;background:#6c63ff;transform:translateX(-50%);}
        .hero-ring2{position:absolute;inset:-38px;border-radius:50%;border:1px dashed rgba(0,212,170,0.15);animation:spin 20s linear infinite reverse;}
        .hero-ring2::after{content:'';position:absolute;bottom:-4px;right:10%;width:6px;height:6px;border-radius:50%;background:#00d4aa;}
        @keyframes spin{to{transform:rotate(360deg);}}

        /* Floating cards */
        .float-card{position:absolute;background:rgba(17,18,24,0.88);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:10px 14px;box-shadow:0 8px 32px rgba(0,0,0,0.4);animation:float 4s ease-in-out infinite;white-space:nowrap;}
        .float-card:nth-child(2){animation-delay:-1.3s;}
        .float-card:nth-child(3){animation-delay:-2.6s;}
        .float-card:nth-child(4){animation-delay:-0.7s;}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}

        /* Badge */
        .badge-pulse{width:6px;height:6px;border-radius:50%;background:#6c63ff;animation:pulse 2s infinite;display:inline-block;margin-right:6px;}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.4)}}

        /* Skill bars */
        .skill-fill{height:100%;border-radius:100px;background:linear-gradient(90deg,#6c63ff,#00d4aa);width:0%;transition:width 1.5s cubic-bezier(.4,0,.2,1);}

        /* Card hovers */
        .skill-card{transition:border-color .2s,transform .3s;}
        .skill-card:hover{border-color:rgba(108,99,255,.3)!important;}
        .project-card{transition:border-color .3s,transform .4s;}
        .project-card:hover .project-overlay{opacity:1!important;}
        .project-card:hover .project-img-scale{transform:scale(1.05);}
        .cert-card{transition:border-color .3s,transform .4s;}
        .cert-card:hover{border-color:rgba(108,99,255,.35)!important;}
        .cert-card:hover .cert-img-inner{transform:scale(1.04);}

        /* Tilt */
        .tilt-card{transition:transform .4s cubic-bezier(.03,.98,.52,.99);will-change:transform;}

        /* Nav */
        .nav-link{transition:color .2s;}
        .nav-link:hover,.nav-link.active{color:#f0f0f5!important;}
        .nav-link.active{position:relative;}
        .nav-link.active::after{content:'';position:absolute;bottom:-4px;left:0;right:0;height:2px;background:linear-gradient(90deg,#6c63ff,#00d4aa);border-radius:2px;}

        /* Buttons */
        .btn-primary{transition:transform .2s,box-shadow .2s,opacity .2s;}
        .btn-primary:hover{opacity:.9;box-shadow:0 8px 30px rgba(108,99,255,.35);}
        .btn-outline{transition:border-color .2s,color .2s;}
        .btn-outline:hover{border-color:rgba(108,99,255,.5)!important;color:#f0f0f5!important;}

        /* Magnetic transition */
        .mag-btn{transition:transform .4s cubic-bezier(.03,.98,.52,.99);}

        /* Contact */
        .contact-item{transition:border-color .2s,transform .2s;}
        .contact-item:hover{border-color:rgba(108,99,255,.3)!important;transform:translateX(4px);}

        /* Back to top */
        #back-top{position:fixed;bottom:2rem;right:2rem;z-index:150;width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#6c63ff,#00d4aa);border:none;cursor:none;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(108,99,255,.4);transition:opacity .3s,transform .3s;}
        #back-top:hover{transform:translateY(-3px);}
        #back-top svg{width:18px;height:18px;}

        /* Page entrance */
        .page-enter{animation:enterUp .8s cubic-bezier(.16,1,.3,1) both;}
        @keyframes enterUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
      `}</style>

      {/* Custom cursor */}
      <div id="cursor-dot" />
      <div id="cursor-ring" />

      {/* Scroll progress bar */}
      <div id="scroll-bar" style={{ width: `${scrollPct}%` }} />

      {/* Back to top */}
      {showTop && (
        <button
          id="back-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      )}

      <div
        className="page-enter"
        style={{
          background: "var(--bg)",
          color: "var(--text)",
          fontFamily: "var(--font-body)",
          minHeight: "100vh",
        }}
      >
        {/* ===== NAVBAR ===== */}
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            padding: "1.2rem 3rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "rgba(8,9,13,0.88)",
            backdropFilter: "blur(24px)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "1.35rem",
              letterSpacing: "-0.05em",
              background: "linear-gradient(135deg,#6c63ff,#00d4aa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AS.
          </div>
          <div style={{ display: "flex", gap: "2.5rem" }}>
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`nav-link${activeSection === item.toLowerCase() ? " active" : ""}`}
                style={{
                  color:
                    activeSection === item.toLowerCase()
                      ? "#f0f0f5"
                      : "var(--muted)",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                }}
              >
                {item}
              </a>
            ))}
          </div>
          <a
            href="/cv.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="mag-btn"
            style={{
              background: "linear-gradient(135deg,#6c63ff,#5a52e0)",
              color: "#fff",
              padding: "0.6rem 1.4rem",
              borderRadius: "100px",
              fontSize: "0.85rem",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Download CV
          </a>
        </nav>

        {/* ===== HERO ===== */}
        <section
          id="home"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            padding: "6rem 3rem 4rem",
            position: "relative",
            zIndex: 1,
            overflow: "hidden",
          }}
        >
          {/* Particle canvas */}
          <canvas
            id="particles"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* Glow blobs */}
          <div
            style={{
              position: "absolute",
              top: "20%",
              right: "5%",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(108,99,255,0.07),transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "10%",
              right: "20%",
              width: 250,
              height: 250,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(0,212,170,0.05),transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* LEFT */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: "rgba(108,99,255,0.12)",
                  border: "1px solid rgba(108,99,255,0.25)",
                  borderRadius: "100px",
                  padding: "0.35rem 1rem",
                  fontSize: "0.8rem",
                  color: "#a09aff",
                  marginBottom: "1.8rem",
                  fontWeight: 600,
                }}
              >
                <span className="badge-pulse" />
                Open to opportunities
              </div>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3.2rem,5.5vw,5.5rem)",
                  fontWeight: 800,
                  lineHeight: 1.06,
                  letterSpacing: "-0.05em",
                  marginBottom: "1.4rem",
                }}
              >
                Hi, I&apos;m
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg,#6c63ff,#00d4aa)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {typedName}
                </span>
              </h1>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "1.1rem",
                  maxWidth: 420,
                  marginBottom: "2.5rem",
                  lineHeight: 1.9,
                  fontWeight: 400,
                }}
              >
                Information Systems student at Binus University. I build
                full-stack apps, wrangle databases, and turn raw data into
                stories.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a
                  href="#projects"
                  className="btn-primary mag-btn"
                  style={{
                    background: "linear-gradient(135deg,#6c63ff,#5a52e0)",
                    color: "#fff",
                    padding: "0.9rem 2.2rem",
                    borderRadius: "100px",
                    fontWeight: 700,
                    textDecoration: "none",
                    fontSize: "0.95rem",
                  }}
                >
                  View My Work
                </a>
                <a
                  href="#contact"
                  className="btn-outline mag-btn"
                  style={{
                    border: "1px solid var(--border)",
                    color: "var(--muted)",
                    padding: "0.9rem 2.2rem",
                    borderRadius: "100px",
                    fontWeight: 700,
                    textDecoration: "none",
                    fontSize: "0.95rem",
                  }}
                >
                  Let&apos;s Talk
                </a>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "2.5rem",
                  marginTop: "3rem",
                  paddingTop: "2rem",
                  borderTop: "1px solid var(--border)",
                }}
              >
                {[
                  ["3.79", "GPA / 4.00"],
                  ["5+", "Projects"],
                  ["10+", "Skills"],
                ].map(([num, label]) => (
                  <div key={label}>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "2.2rem",
                        fontWeight: 800,
                        letterSpacing: "-0.05em",
                      }}
                    >
                      {num}
                    </div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--muted)",
                        fontWeight: 500,
                        marginTop: "0.1rem",
                      }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                height: 480,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: 320,
                  height: 320,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle,rgba(108,99,255,0.18),transparent 65%)",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle,rgba(0,212,170,0.1),transparent 70%)",
                  top: "15%",
                  right: "5%",
                  pointerEvents: "none",
                }}
              />
              <div style={{ position: "relative", zIndex: 2 }}>
                <div className="hero-ring2" />
                <div className="hero-ring" />
                <div
                  style={{
                    width: 210,
                    height: 210,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "3px solid rgba(108,99,255,0.45)",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src="/pp.png"
                    alt="Albert Sumedha KT"
                    width={210}
                    height={210}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      display: "block",
                    }}
                  />
                </div>
              </div>
              <div className="float-card" style={{ top: "4%", left: "0%" }}>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--muted)",
                    fontWeight: 600,
                    marginBottom: 2,
                  }}
                >
                  GPA
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.3rem",
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                  }}
                >
                  3.79
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--muted)",
                      fontWeight: 500,
                    }}
                  >
                    /4.00
                  </span>
                </div>
              </div>
              <div
                className="float-card"
                style={{ bottom: "12%", left: "-4%" }}
              >
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--muted)",
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                >
                  Top Skill
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#6c63ff",
                    }}
                  />
                  <div style={{ fontSize: "0.85rem", fontWeight: 700 }}>
                    MySQL 96%
                  </div>
                </div>
              </div>
              <div className="float-card" style={{ top: "8%", right: "-2%" }}>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--muted)",
                    fontWeight: 600,
                    marginBottom: 2,
                  }}
                >
                  University
                </div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700 }}>
                  Binus University
                </div>
              </div>
              <div className="float-card" style={{ bottom: "4%", right: "0%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#00d4aa",
                      boxShadow: "0 0 6px #00d4aa",
                    }}
                  />
                  <div
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      color: "#00d4aa",
                    }}
                  >
                    Available for hire
                  </div>
                </div>
              </div>
              <svg
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                  opacity: 0.06,
                  zIndex: 0,
                }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="grid"
                    width="32"
                    height="32"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 32 0 L 0 0 0 32"
                      fill="none"
                      stroke="white"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
          </div>
        </section>

        {/* ===== SKILLS ===== */}
        <section
          id="skills"
          ref={skillsRef}
          style={{
            padding: "7rem 3rem",
            background: "var(--surface)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            className="reveal"
            style={{ maxWidth: 1100, margin: "0 auto 4rem" }}
          >
            <div
              style={{
                fontSize: "0.78rem",
                color: "#00d4aa",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "0.85rem",
              }}
            >
              What I know
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem,4vw,3.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.05em",
              }}
            >
              Skills & Expertise
            </h2>
          </div>
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
              gap: "1.25rem",
            }}
          >
            {skills.map((skill, i) => (
              <div
                key={i}
                className="skill-card tilt-card reveal"
                style={{
                  background: "var(--surface2)",
                  border: "1px solid var(--border)",
                  borderRadius: 16,
                  padding: "1.5rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "1.2rem",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: "rgba(108,99,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={skill.logo}
                      alt={skill.name}
                      width={36}
                      height={36}
                      style={{ objectFit: "contain", padding: 4 }}
                    />
                  </div>
                  <div
                    style={{ flex: 1, fontWeight: 600, fontSize: "0.95rem" }}
                  >
                    {skill.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.1rem",
                      fontWeight: 800,
                      color: "#6c63ff",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {skill.level}%
                  </div>
                </div>
                <div
                  style={{
                    height: 4,
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 100,
                    overflow: "hidden",
                  }}
                >
                  <div className="skill-fill" data-target={skill.level} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== PROJECTS ===== */}
        <section
          id="projects"
          style={{
            padding: "7rem 3rem",
            background: "var(--bg)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            className="reveal"
            style={{ maxWidth: 1100, margin: "0 auto 4rem" }}
          >
            <div
              style={{
                fontSize: "0.78rem",
                color: "#00d4aa",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "0.85rem",
              }}
            >
              What I&apos;ve built
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem,4vw,3.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.05em",
              }}
            >
              Featured Projects
            </h2>
          </div>
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
              gap: "1.5rem",
            }}
          >
            {projects.map((p, i) => (
              <div
                key={i}
                className="project-card tilt-card reveal"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 20,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: 190,
                    background: "var(--surface2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <Image
                    src={p.image}
                    alt={p.title}
                    width={300}
                    height={190}
                    className="project-img-scale"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      transition: "transform .4s",
                      padding: "1rem",
                    }}
                  />
                  <div
                    className="project-overlay"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top,rgba(8,9,13,0.6),transparent)",
                      opacity: 0,
                      transition: "opacity .3s",
                    }}
                  />
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <div
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: "#00d4aa",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {p.tag}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.2rem",
                      fontWeight: 800,
                      marginBottom: "0.5rem",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {p.title}
                  </div>
                  <p
                    style={{
                      color: "var(--muted)",
                      fontSize: "0.9rem",
                      lineHeight: 1.8,
                      marginBottom: "1.2rem",
                      fontWeight: 400,
                    }}
                  >
                    {p.desc}
                  </p>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      color: "#6c63ff",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      textDecoration: "none",
                    }}
                  >
                    View Project →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== CERTIFICATES ===== */}
        <section
          id="certificates"
          style={{
            padding: "7rem 3rem",
            background: "var(--surface)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            className="reveal"
            style={{ maxWidth: 1100, margin: "0 auto 4rem" }}
          >
            <div
              style={{
                fontSize: "0.78rem",
                color: "#00d4aa",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "0.85rem",
              }}
            >
              What I&apos;ve earned
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem,4vw,3.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.05em",
              }}
            >
              Certificates
            </h2>
          </div>
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
              gap: "1.5rem",
            }}
          >
            {certificates.map((cert, i) => (
              <div key={i} className="cert-card tilt-card reveal">
                <div
                  style={{
                    height: 200,
                    background: "var(--surface2)",
                    overflow: "hidden",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    width={400}
                    height={200}
                    className="cert-img-inner"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform .4s",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top,rgba(8,9,13,0.7) 0%,transparent 50%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      background: "rgba(108,99,255,0.85)",
                      backdropFilter: "blur(8px)",
                      borderRadius: 100,
                      padding: "4px 10px",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: "#fff",
                      letterSpacing: "0.05em",
                    }}
                  >
                    CERTIFIED
                  </div>
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.05rem",
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                      lineHeight: 1.3,
                      marginBottom: "0.6rem",
                    }}
                  >
                    {cert.title}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      marginBottom: "1.2rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--muted)",
                        fontWeight: 500,
                      }}
                    >
                      {cert.issuer}
                    </span>
                    <span style={{ color: "var(--border)" }}>·</span>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--muted)",
                        fontWeight: 500,
                      }}
                    >
                      {cert.date}
                    </span>
                  </div>
                  <a
                    href={cert.credential}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      background: "rgba(108,99,255,0.1)",
                      border: "1px solid rgba(108,99,255,0.25)",
                      borderRadius: 100,
                      padding: "0.45rem 1rem",
                      color: "#a09aff",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      textDecoration: "none",
                    }}
                  >
                    View Credential →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== ABOUT ===== */}
        <section
          id="about"
          style={{
            padding: "7rem 3rem",
            background: "var(--bg)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1.3fr",
              gap: "6rem",
              alignItems: "center",
            }}
          >
            <div className="reveal" style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  top: -16,
                  right: -16,
                  width: 80,
                  height: 80,
                  borderRadius: 16,
                  background: "linear-gradient(135deg,#6c63ff,#00d4aa)",
                  opacity: 0.15,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: -16,
                  left: -16,
                  width: 60,
                  height: 60,
                  borderRadius: 12,
                  background: "linear-gradient(135deg,#00d4aa,#6c63ff)",
                  opacity: 0.1,
                }}
              />
              <Image
                src="/AboutPP.png"
                alt="Albert at desk"
                width={480}
                height={600}
                style={{
                  width: "100%",
                  aspectRatio: "4/5",
                  objectFit: "cover",
                  borderRadius: 24,
                  display: "block",
                }}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,1fr)",
                  gap: "0.75rem",
                  marginTop: "1.5rem",
                }}
              >
                {[
                  ["3.79", "GPA"],
                  ["5/5", "Indonesian"],
                  ["4/5", "English"],
                  ["HSK 3", "Mandarin"],
                ].map(([val, label]) => (
                  <div
                    key={label}
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      padding: "0.75rem",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1rem",
                        fontWeight: 800,
                        letterSpacing: "-0.04em",
                      }}
                    >
                      {val}
                    </div>
                    <div
                      style={{
                        fontSize: "0.72rem",
                        color: "var(--muted)",
                        marginTop: "0.2rem",
                        fontWeight: 500,
                      }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal">
              <div
                style={{
                  fontSize: "0.78rem",
                  color: "#00d4aa",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: "0.85rem",
                }}
              >
                The human behind the code
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.4rem,4vw,3.5rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.05em",
                  marginBottom: "1.5rem",
                }}
              >
                About Me
              </h2>
              <p
                style={{
                  color: "var(--muted)",
                  marginBottom: "1rem",
                  lineHeight: 1.9,
                  fontWeight: 400,
                }}
              >
                I&apos;m an undergraduate student passionate about software
                development and data management. I have hands-on experience
                building full-stack web apps with Laravel, desktop apps with
                JavaFX and MySQL, and database design using MSSQL and MongoDB.
              </p>
              <p
                style={{
                  color: "var(--muted)",
                  marginBottom: "2rem",
                  lineHeight: 1.9,
                  fontWeight: 400,
                }}
              >
                I love exploring new technologies, applying analytical thinking,
                and building clean user-friendly solutions. Currently levelling
                up in{" "}
                <span style={{ color: "#6c63ff", fontWeight: 700 }}>
                  Tableau, Excel and Accounting
                </span>
                .
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1.25rem",
                  marginBottom: "2rem",
                }}
              >
                {[
                  ["Full-Stack & Web", "Laravel, PHP, Tailwind, HTML/CSS"],
                  ["Desktop & Database", "JavaFX, MySQL, SQL Server, MongoDB"],
                  ["Data Analysis", "Tableau, Excel, Power BI"],
                  ["Business", "Accounting, ISAD, Business Analytics"],
                ].map(([title, desc]) => (
                  <div key={title}>
                    <h4
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        marginBottom: "0.3rem",
                      }}
                    >
                      {title}
                    </h4>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--muted)",
                        lineHeight: 1.75,
                        fontWeight: 400,
                      }}
                    >
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
              <a
                href="/Resume.pdf"
                download="AlbertSumedha_Resume.pdf"
                className="mag-btn"
                style={{
                  display: "inline-block",
                  background: "linear-gradient(135deg,#6c63ff,#5a52e0)",
                  color: "#fff",
                  padding: "0.9rem 2.2rem",
                  borderRadius: "100px",
                  fontWeight: 700,
                  textDecoration: "none",
                  fontSize: "0.95rem",
                }}
              >
                Download Resume
              </a>
            </div>
          </div>
        </section>

        {/* ===== CONTACT ===== */}
        <section
          id="contact"
          style={{
            padding: "7rem 3rem",
            background: "var(--surface)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div className="reveal">
              <div
                style={{
                  fontSize: "0.78rem",
                  color: "#00d4aa",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: "0.85rem",
                }}
              >
                Say hello
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.4rem,4vw,3.5rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.05em",
                }}
              >
                Get In Touch
              </h2>
              <p
                style={{
                  color: "var(--muted)",
                  marginTop: "0.75rem",
                  maxWidth: 440,
                  lineHeight: 1.9,
                  fontWeight: 400,
                }}
              >
                Have a project in mind or want to collaborate? I&apos;d love to
                hear from you.
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.4fr",
                gap: "4rem",
                marginTop: "4rem",
              }}
            >
              <div
                className="reveal"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                {[
                  {
                    label: "Email",
                    val: "albertsk2581@gmail.com",
                    href: "mailto:albertsk2581@gmail.com",
                    color: "rgba(108,99,255,0.12)",
                  },
                  {
                    label: "Phone",
                    val: "+62 857 5322 0875",
                    href: "tel:+6285753220875",
                    color: "rgba(0,212,170,0.1)",
                  },
                  {
                    label: "LinkedIn",
                    val: "albert-sumedha-kusuma-the",
                    href: "https://www.linkedin.com/in/albert-sumedha-kusuma-the",
                    color: "rgba(10,102,194,0.15)",
                  },
                  {
                    label: "GitHub",
                    val: "github.com/AlbertSumedha",
                    href: "https://github.com/AlbertSumedha",
                    color: "rgba(255,255,255,0.06)",
                  },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-item"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "1.25rem",
                      background: "var(--surface2)",
                      border: "1px solid var(--border)",
                      borderRadius: 14,
                      textDecoration: "none",
                      color: "var(--text)",
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: item.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ fontSize: "1rem" }}>
                        {item.label === "Email"
                          ? "✉"
                          : item.label === "Phone"
                            ? "📞"
                            : item.label === "LinkedIn"
                              ? "in"
                              : "⌥"}
                      </span>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "0.78rem",
                          color: "var(--muted)",
                          marginBottom: "0.1rem",
                          fontWeight: 500,
                        }}
                      >
                        {item.label}
                      </div>
                      <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                        {item.val}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              <div className="reveal">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer
          style={{
            background: "var(--bg)",
            borderTop: "1px solid var(--border)",
            padding: "2rem 3rem",
            textAlign: "center",
            color: "var(--muted)",
            fontSize: "0.85rem",
            position: "relative",
            zIndex: 1,
            fontWeight: 500,
          }}
        >
          © 2025 Albert Sumedha Kusuma The · Building reliable solutions, one
          project at a time.
        </footer>
      </div>
    </>
  );
}
