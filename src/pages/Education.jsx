import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  MapPin,
  BookOpen,
  Award,
  FileText,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  School,
  X,
  Eye,
} from "lucide-react";
import collegeImg from "@/assets/education/college_img.jpg";
import schoolImg from "@/assets/education/school_img.jpg";
import bTechPdf from "@/assets/files/education_pdf/B Tech.pdf";
import hsMarkSheetPdf from "@/assets/files/education_pdf/HS MARK SHEET.pdf";

const educationData = [
  {
    id: "btech",
    degree: "B.Tech - Electronics and Telecommunication Engineering",
    school: "Anjuman I-Islam's Kalsekar Technical Campus (AIKTC)",
    affiliation: "Affiliated with University of Mumbai",
    location: "Navi Mumbai, Maharashtra, India",
    duration: "July 2019 - June 2023",
    status: "DEGREE CONFERRED",
    gradeBadge: "CGPA: 8.01 / 10",
    gradeScore: "8.01",
    gradeScale: "10.0",
    image: collegeImg,
    documentPdf: bTechPdf,
    docLabel: "Degree Certificate (PDF)",
    overview:
      "Rigorous 4-year engineering program combining computational logic, signal processing, network protocols, and distributed systems. Built strong foundation in data structures, algorithms, and modular software engineering.",
    coreCompetencies: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming (Java/C++)",
      "Computer Networks & TCP/IP Stack",
      "Microprocessor & Microcontroller Architectures",
      "Database Management Systems (DBMS)",
      "Digital Signal Processing & Fourier Systems",
    ],
    highlights: [
      "Secured 8.01 CGPA across 8 rigorous semesters of engineering curriculum.",
      "Spearheaded software projects integrating hardware sensors with web telemetry backends.",
      "Participated actively in collegiate hackathons, competitive programming, and technical symposiums.",
    ],
  },
  {
    id: "hsc",
    degree: "Higher Secondary Certificate (HSC · 12th Grade)",
    school: "B.P.S. Public Inter College",
    affiliation: "UPMSP Board",
    location: "Mau, Uttar Pradesh, India",
    duration: "June 2016 - July 2017",
    status: "CREDENTIAL CONFERRED",
    gradeBadge: "Score: 75.0%",
    gradeScore: "75%",
    gradeScale: "100%",
    image: schoolImg,
    documentPdf: hsMarkSheetPdf,
    docLabel: "Marksheet (PDF)",
    overview:
      "Senior secondary education focused strictly on Physics, Chemistry, and Advanced Mathematics (PCM), building rigorous deductive reasoning, calculus, and computational modeling skills.",
    coreCompetencies: [
      "Differential & Integral Calculus",
      "Vector Algebra & Analytical Geometry",
      "Classical Mechanics & Electromagnetism",
      "Chemical Kinetics & Molecular Structure",
      "Statistical Probability & Data Analysis",
    ],
    highlights: [
      "Achieved 75% aggregate score in UPMSP Higher Secondary Examinations.",
      "Formed strong analytical problem-solving foundation instrumental in modern computer science.",
    ],
  },
  {
    id: "ssc",
    degree: "Secondary School Certificate (SSC · 10th Grade)",
    school: "S.V.M.H.S.S",
    affiliation: "Secondary State Board",
    location: "Uttar Pradesh, India",
    duration: "Completed with Distinction",
    status: "CREDENTIAL CONFERRED",
    gradeBadge: "Score: 80.0%",
    gradeScore: "80%",
    gradeScale: "100%",
    image: null,
    documentPdf: null,
    docLabel: null,
    overview:
      "General secondary curriculum establishing fundamental discipline in natural sciences, algebra, geometric reasoning, and linguistic communication.",
    coreCompetencies: [
      "Mathematics & Plane Geometry",
      "General Science & Physics Fundamentals",
      "Computer Basics & Logic Flow",
    ],
    highlights: [
      "Graduated with 80% aggregate with distinction across science and mathematical disciplines.",
    ],
  },
];

export default function Education() {
  const [activeImageModal, setActiveImageModal] = useState(null);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* HUD Telemetry Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10 p-4 sm:p-5 rounded-2xl bg-[#0c101b]/90 border border-sky-500/20 backdrop-blur-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-40 bg-gradient-to-l from-sky-500/10 via-emerald-500/5 to-transparent pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <GraduationCap className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-sky-400 uppercase tracking-widest">
                  ACADEMIC_REGISTRY // ARCHIVE
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-sky-500/10 border border-sky-500/30 text-sky-300">
                  3 RECORDS VERIFIED
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                Academic Degrees & Credentials
              </h1>
            </div>
          </div>

          {/* Quick HUD Metrics */}
          <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>B.Tech in Electronics & Telecomm (8.01 CGPA)</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Education Cards Grid */}
      <div className="space-y-10">
        {educationData.map((edu, index) => {
          const isBtech = edu.id === "btech";

          return (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`rounded-2xl bg-[#0c101b]/90 border backdrop-blur-xl overflow-hidden relative transition-all duration-300 hover:shadow-2xl hover:shadow-black/70 ${
                isBtech
                  ? "border-sky-500/30 hover:border-sky-500/60 ring-1 ring-sky-500/10"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              {/* Corner Cyber Accents */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-sky-400/40 pointer-events-none" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-sky-400/40 pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8">
                {/* Left Side: Campus Photo or Badge */}
                <div className="lg:col-span-4 flex flex-col justify-between gap-4">
                  {edu.image ? (
                    <div className="relative aspect-video lg:aspect-[4/3] rounded-xl overflow-hidden border border-white/15 group/img">
                      <img
                        src={edu.image}
                        alt={edu.school}
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c101b] via-transparent to-transparent opacity-60" />
                      <button
                        onClick={() =>
                          setActiveImageModal({
                            title: edu.school,
                            img: edu.image,
                          })
                        }
                        className="absolute bottom-2 right-2 px-2.5 py-1 rounded bg-[#0c101b]/90 border border-white/20 text-[10px] font-mono text-slate-200 hover:text-white flex items-center gap-1 backdrop-blur-sm"
                      >
                        <Eye className="w-3 h-3 text-sky-400" />
                        <span>Enlarge Photo</span>
                      </button>
                    </div>
                  ) : (
                    <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 flex flex-col items-center justify-center p-6 text-center">
                      <School className="w-12 h-12 text-slate-500 mb-2" />
                      <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                        Institutional Record
                      </span>
                    </div>
                  )}

                  {/* Grade Metric Block */}
                  <div className="p-4 rounded-xl bg-[#111726] border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase">ACADEMIC STANDING</div>
                      <div className="text-2xl font-black text-white tracking-tight flex items-baseline gap-1">
                        <span>{edu.gradeScore}</span>
                        <span className="text-xs font-mono text-slate-400">/ {edu.gradeScale}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">
                        STATUS
                      </div>
                      <div className="text-xs font-mono text-slate-300 font-medium">{edu.status}</div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Institution Details & Coursework */}
                <div className="lg:col-span-8 flex flex-col justify-between">
                  <div>
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4 pb-4 border-b border-white/10">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-sky-500/10 text-sky-300 border border-sky-500/30 font-bold">
                            {edu.duration}
                          </span>
                          {edu.affiliation && (
                            <span className="text-[11px] font-mono text-slate-400">
                              · {edu.affiliation}
                            </span>
                          )}
                        </div>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                          {edu.degree}
                        </h2>
                        <div className="text-sm font-semibold text-slate-300 mt-1 flex items-center gap-1.5">
                          <School className="w-4 h-4 text-sky-400" />
                          <span>{edu.school}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-xs font-mono text-slate-400 shrink-0">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{edu.location}</span>
                      </div>
                    </div>

                    {/* Overview */}
                    <p className="text-sm text-slate-300 mb-5 leading-relaxed">{edu.overview}</p>

                    {/* Core Competencies Chips */}
                    <div className="mb-5">
                      <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                        <span>Curriculum Disciplines & Core Competencies</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {edu.coreCompetencies.map((comp) => (
                          <span
                            key={comp}
                            className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-slate-300 hover:border-sky-500/40 transition-colors"
                          >
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-1.5 mb-6">
                      {edu.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                          <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Document Link */}
                  {edu.documentPdf && (
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400">
                        VERIFIED OFFICIAL DOCUMENT ATTACHED
                      </span>
                      <a
                        href={edu.documentPdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-mono text-xs font-bold uppercase tracking-wider hover:from-sky-400 hover:to-blue-500 shadow-md shadow-sky-500/20 transition-all"
                      >
                        <FileText className="w-4 h-4" />
                        <span>View {edu.docLabel}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {activeImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setActiveImageModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full rounded-2xl bg-[#0c101b] border border-white/20 p-5 shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                <h3 className="text-base font-bold text-white tracking-wide">
                  {activeImageModal.title}
                </h3>
                <button
                  onClick={() => setActiveImageModal(null)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="rounded-xl overflow-hidden border border-white/10 max-h-[70vh] flex items-center justify-center bg-black/50">
                <img
                  src={activeImageModal.img}
                  alt={activeImageModal.title}
                  className="max-w-full max-h-[68vh] object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
