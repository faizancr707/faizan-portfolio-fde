import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Background3D from "./components/Background3D";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Education = lazy(() => import("./pages/Education"));
const Experience = lazy(() => import("./pages/Experience"));
const Skills = lazy(() => import("./pages/Skills"));
const Projects = lazy(() => import("./pages/Projects"));
const Certificates = lazy(() => import("./pages/Certificates"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Per-page SEO metadata strictly calibrated to Faizan Alam
const pageMeta = {
  "/": {
    title: "Faizan Alam | Full Stack & Backend Developer Command Center",
    description:
      "Faizan Alam — Full Stack & Backend Developer specializing in scalable Node.js, Express, React, Spring Boot, FastAPI, PostgreSQL, Redis, and Cloud deployments.",
  },
  "/about": {
    title: "Dossier // About Faizan Alam | Full Stack Systems Engineer",
    description:
      "Explore the engineering philosophy and architectural blueprint of Faizan Alam — B.Tech Electronics & Telecommunication graduate (8.01 CGPA) and Full Stack Developer.",
  },
  "/skills": {
    title: "Skills Matrix // Faizan Alam | Dynamic Sudoku Command Grid",
    description:
      "Interactive 6x6 Sudoku-inspired tech grid featuring 38 verified skills across Backend, Frontend, Cloud/DevOps, Databases, and Core CS.",
  },
  "/projects": {
    title: "Projects Showcase // Faizan Alam | Engineering Command Center",
    description:
      "Verified production systems and flagship deployments: Job Tracker, Distributed Group Chat, SpamShield.ai, Cloud Kitchen OMS, SaaS CRM Connectors.",
  },
  "/experience": {
    title: "Career Telemetry // Faizan Alam | Deployments & Experience",
    description:
      "Production roles and verified deployments at RIB Technology, I-Geni Technologies, Bharat Intern, CodeClause, Oasis Infobyte, and CodeAlpha.",
  },
  "/education": {
    title: "Academic Registry // Faizan Alam | B.Tech E&TC (8.01 CGPA)",
    description:
      "Academic credentials: B.Tech in Electronics and Telecommunication Engineering from AIKTC Mumbai (8.01 CGPA), verified degrees, and marksheet records.",
  },
  "/certificates": {
    title: "Verified Credentials // Faizan Alam | Accreditations Matrix",
    description:
      "Verified accreditations in TypeScript, AWS ECS Deployment, Docker Fundamentals, JavaScript, Python, and Cybersecurity.",
  },
  "/contact": {
    title: "Command Dispatch // Contact Faizan Alam | Hire Full Stack Engineer",
    description:
      "Initiate transmission with Faizan Alam for full-time Full Stack / Backend roles, system architecture consulting, or technical partnerships.",
  },
};

// Hook to update document title + meta tags on route change
function SEOUpdater() {
  const location = useLocation();

  useEffect(() => {
    const meta = pageMeta[location.pathname] || {
      title: "Faizan Alam | Full Stack Developer Command Center",
      description:
        "Portfolio of Faizan Alam — Full Stack & Backend Developer building high-throughput, resilient software systems.",
    };

    document.title = meta.title;

    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) descTag.setAttribute("content", meta.description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", meta.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", meta.description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl)
      ogUrl.setAttribute(
        "content",
        `https://faizan1.vercel.app${location.pathname}`,
      );

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical)
      canonical.setAttribute(
        "href",
        `https://faizan1.vercel.app${location.pathname}`,
      );
    
    // Scroll to top smoothly on route change
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return null;
}

// Animated route container with page exit & entry transitions
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        <Suspense fallback={<Loading />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/education" element={<Education />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SEOUpdater />
      <div className="min-h-screen flex flex-col bg-[#070a12] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-300">
        <Background3D />
        <Navbar />
        <main className="flex-grow relative z-10">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
