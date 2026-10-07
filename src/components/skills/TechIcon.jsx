import React from "react";
import {
  JavaScriptLogo,
  TypeScriptLogo,
  PythonLogo,
  ReactLogo,
  NextjsLogo,
  TailwindLogo,
  NodeLogo,
  ExpressLogo,
  MongoDBLogo,
  AWSLogo,
  GitLogo,
  PostmanLogo,
  JWTLogo,
} from "@/components/TechLogos";
import {
  Cpu,
  Brain,
  Network,
  Database,
  Layers,
  Sparkles,
  Server,
  Terminal,
  Shield,
  Zap,
  Globe,
  Binary,
  Workflow,
  Radio,
  FileCode2,
  Boxes,
  Lock,
  Flame,
  CheckCircle2,
  CreditCard,
  UploadCloud,
  FileCheck,
  Container,
} from "lucide-react";

/**
 * TechIcon renders custom SVG icons tailored for the tech stack
 */
export const TechIcon = ({ id, className = "w-5 h-5", color = "currentColor" }) => {
  switch (id) {
    case "javascript":
      return <JavaScriptLogo />;
    case "typescript":
      return <TypeScriptLogo />;
    case "python":
      return <PythonLogo />;
    case "react":
      return <ReactLogo />;
    case "nextjs":
      return <NextjsLogo />;
    case "tailwind":
      return <TailwindLogo />;
    case "nodejs":
      return <NodeLogo />;
    case "express":
      return <ExpressLogo />;
    case "mongodb":
      return <MongoDBLogo />;
    case "aws":
      return <AWSLogo />;
    case "git_github":
      return <GitLogo />;
    case "postman":
      return <PostmanLogo />;
    case "jwt_auth":
      return <JWTLogo />;

    // Java
    case "java":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <path d="M5 19c3.5 1.5 10.5 1.5 14 0" strokeLinecap="round" />
          <path d="M6 16c2.5 1 9.5 1 12 0" strokeLinecap="round" />
          <path d="M8 13c1.5.5 6.5.5 8 0" strokeLinecap="round" />
          <path d="M12 2c1 2-2 4 0 6s2 3 0 4" strokeLinecap="round" />
          <path d="M15 3c.7 1.4-1.3 2.7 0 4.1" strokeLinecap="round" />
        </svg>
      );

    // SQL / Relational
    case "sql":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
          <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
          <path d="M8 12h2" strokeLinecap="round" />
          <path d="M8 15h4" strokeLinecap="round" />
        </svg>
      );

    // DSA & OOP
    case "dsa_oop":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <circle cx="12" cy="4" r="2.5" />
          <circle cx="6" cy="18" r="2.5" />
          <circle cx="18" cy="18" r="2.5" />
          <path d="M10.5 6.2L7.5 15.5M13.5 6.2l3 9.3" strokeLinecap="round" />
        </svg>
      );

    // HTML5
    case "html5":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <path d="M4 3l1.5 15 6.5 2 6.5-2L20 3H4z" strokeLinejoin="round" />
          <path d="M7.5 7h9M7.8 11h8.4L15.5 16l-3.5 1-3.5-1-.2-3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    // FastAPI
    case "fastapi":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" opacity="0.2" />
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" strokeLinejoin="round" />
        </svg>
      );

    // Spring Boot
    case "springboot":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <path d="M12 2a10 10 0 0 1 10 10c0 5.5-4.5 10-10 10S2 17.5 2 12A10 10 0 0 1 12 2z" strokeDasharray="3 3" />
          <path d="M8 14c2-4 6-5 8-5-1 3-2 6-5 7-1.5.5-3 0-3-2z" fill="currentColor" opacity="0.3" />
          <path d="M8 14c2-4 6-5 8-5-1 3-2 6-5 7-1.5.5-3 0-3-2z" strokeLinejoin="round" />
        </svg>
      );

    // REST APIs
    case "rest_apis":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <rect x="2" y="6" width="20" height="12" rx="3" />
          <path d="M6 12h3M12 10v4M15 10l3 4M18 10l-3 4" strokeLinecap="round" />
        </svg>
      );

    // Socket.io
    case "socketio":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 6v6l4 2" strokeLinecap="round" />
          <path d="M7 16l2-2M17 8l-2 2" strokeLinecap="round" />
        </svg>
      );

    // MVC Architecture
    case "mvc":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="8.5" y="14" width="7" height="7" rx="1.5" />
          <path d="M6.5 10v2a2 2 0 0 0 2 2M17.5 10v2a2 2 0 0 1-2 2" strokeLinecap="round" />
        </svg>
      );

    // LangChain
    case "langchain":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <rect x="3" y="8" width="6" height="8" rx="2" />
          <rect x="15" y="8" width="6" height="8" rx="2" />
          <path d="M9 12h6" strokeLinecap="round" strokeWidth="2.5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          <path d="M6 5v3M18 5v3M6 16v3M18 16v3" strokeLinecap="round" />
        </svg>
      );

    // LangGraph
    case "langgraph":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <circle cx="6" cy="6" r="3" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="12" cy="18" r="3" />
          <path d="M8.5 7.5l4 8M15.5 7.5l-4 8M9 6h6" strokeLinecap="round" />
          <circle cx="12" cy="11.5" r="1" fill="currentColor" />
        </svg>
      );

    // RAG & Vector Embeddings
    case "rag_embeddings":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <path d="M4 5h16M4 12h10M4 19h16" strokeLinecap="round" />
          <circle cx="19" cy="12" r="3" fill="currentColor" opacity="0.2" />
          <circle cx="19" cy="12" r="3" />
          <path d="M19 10v4M17 12h4" strokeLinecap="round" />
        </svg>
      );

    // AI Agents
    case "ai_agents":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <rect x="4" y="6" width="16" height="12" rx="4" />
          <circle cx="9" cy="12" r="1.5" fill="currentColor" />
          <circle cx="15" cy="12" r="1.5" fill="currentColor" />
          <path d="M12 2v4M8 22l1-4M16 22l-1-4M2 12h2M20 12h2" strokeLinecap="round" />
        </svg>
      );

    // Tool & Function Calling
    case "tool_calling":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          <circle cx="6" cy="18" r="1" fill="currentColor" />
        </svg>
      );

    // MCP (Model Context Protocol)
    case "mcp":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <rect x="5" y="5" width="14" height="14" rx="3" strokeDasharray="3 2" />
          <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.25" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeLinecap="round" />
        </svg>
      );

    // Prompt Engineering
    case "prompt_eng":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <rect x="3" y="4" width="18" height="16" rx="3" />
          <path d="M7 9l3 3-3 3M13 15h4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    // PostgreSQL
    case "postgresql":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <ellipse cx="12" cy="6" rx="7" ry="3" />
          <path d="M5 6v10c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
          <path d="M5 11c0 1.66 3.13 3 7 3s7-1.34 7-3" />
          <path d="M12 14v5" strokeLinecap="round" />
        </svg>
      );

    // MySQL & Sequelize
    case "mysql_sequelize":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <rect x="3" y="4" width="18" height="6" rx="2" />
          <rect x="3" y="14" width="18" height="6" rx="2" />
          <path d="M7 10v4M17 10v4" strokeLinecap="round" />
          <circle cx="12" cy="7" r="1" fill="currentColor" />
          <circle cx="12" cy="17" r="1" fill="currentColor" />
        </svg>
      );

    // Redis & BullMQ
    case "redis_bullmq":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinejoin="round" />
          <path d="M2 12l10 5 10-5" strokeLinejoin="round" />
          <path d="M2 17l10 5 10-5" strokeLinejoin="round" />
          <polygon points="12 7 10 12 14 12 12 17" fill="currentColor" opacity="0.4" />
        </svg>
      );

    // Docker & Compose
    case "docker":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <rect x="4" y="9" width="3" height="3" rx="0.5" />
          <rect x="8" y="9" width="3" height="3" rx="0.5" />
          <rect x="12" y="9" width="3" height="3" rx="0.5" />
          <rect x="8" y="5" width="3" height="3" rx="0.5" />
          <rect x="12" y="5" width="3" height="3" rx="0.5" />
          <path d="M2 14c1.5 4 5 6 10 6 6 0 9-3 10-5-1-.5-2.5-.5-3.5 0-.5-2-2-3-3.5-3H3c-.6 0-1 .4-1 1v1z" strokeLinejoin="round" />
        </svg>
      );

    // CI/CD & GitHub Actions
    case "github_actions":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <circle cx="12" cy="12" r="8" strokeDasharray="4 2" />
          <polygon points="10 8 16 12 10 16" fill="currentColor" />
        </svg>
      );

    // Multer
    case "multer":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <path d="M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" strokeLinecap="round" />
          <polyline points="16 8 12 4 8 8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="12" y1="4" x2="12" y2="15" strokeLinecap="round" />
        </svg>
      );

    // Jest & Supertest
    case "jest_supertest":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <path d="M9 3h6M10 3v6l-4 8a3 3 0 0 0 3 4h6a3 3 0 0 0 3-4l-4-8V3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 15h8" strokeLinecap="round" />
          <circle cx="11" cy="18" r="1" fill="currentColor" />
        </svg>
      );

    // Razorpay
    case "razorpay":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <path d="M14 3l-6 10h5l-3 8 10-11h-5l3-7z" fill="currentColor" opacity="0.3" />
          <path d="M14 3l-6 10h5l-3 8 10-11h-5l3-7z" strokeLinejoin="round" />
        </svg>
      );

    // CORS
    case "cors":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.75">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 4a8 8 0 0 0-8 8M12 20a8 8 0 0 0 8-8" strokeLinecap="round" strokeWidth="2.5" />
          <path d="M8 8l8 8M16 8l-8 8" strokeLinecap="round" />
        </svg>
      );

    default:
      return <Cpu className={className} />;
  }
};
