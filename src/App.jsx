import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Terminal, Cpu, Database, Shield, Radio, Crosshair, ChevronRight } from 'lucide-react';
import { PROFILE } from './data';

// --- GAME COMPONENTS ---

// 1. The HUD (Heads Up Display) - Fixed to screen
const HUD = ({ progress }) => (
  <div className="fixed inset-0 pointer-events-none z-50 p-6 flex flex-col justify-between">
    {/* Top Bar */}
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-2 text-cyan-500">
        <Radio className="animate-pulse" size={16} />
        <span className="font-mono text-xs tracking-widest">LIVE FEED // SECURE_CHANNEL</span>
      </div>
      <div className="text-right">
        <div className="font-mono text-xs text-cyan-500 mb-1">DECRYPTION PROGRESS</div>
        <div className="w-32 h-2 bg-gray-900 border border-cyan-900">
          <motion.div 
            className="h-full bg-cyan-500 shadow-[0_0_10px_#00f3ff]"
            style={{ width: progress }}
          />
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="flex justify-between items-end text-cyan-900/50 font-mono text-[10px]">
      <div>SYS_ID: {PROFILE.name.replace(" ", "_").toUpperCase()}</div>
      <div>V.2.0.24</div>
    </div>
  </div>
);

// 2. The "Data Card" (Inventory Item)
const DataModule = ({ title, icon: Icon, children, delay }) => (
  <motion.div 
    initial={{ x: -50, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ delay, type: "spring", stiffness: 50 }}
    className="relative group mb-8"
  >
    {/* The 'Scanner' Line effect on hover */}
    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gray-800 group-hover:bg-cyan-500 transition-colors duration-300" />
    
    <div className="bg-gray-900/80 backdrop-blur border border-gray-800 p-6 ml-4 group-hover:border-cyan-500/30 transition-all">
      <div className="flex items-center gap-3 mb-4 text-cyan-500">
        <Icon size={20} />
        <h3 className="font-bold font-mono tracking-wider text-white">{title}</h3>
      </div>
      {children}
    </div>
  </motion.div>
);

// 3. The Skill Bar (Power Level)
const SkillGauge = ({ name, level, color }) => (
  <div className="mb-4">
    <div className="flex justify-between text-xs font-mono mb-1 text-gray-400">
      <span>{name}</span>
      <span>{level}%</span>
    </div>
    <div className="h-1 bg-gray-800 w-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className={`h-full ${color} shadow-[0_0_8px_currentColor]`}
      />
    </div>
  </div>
);

// --- MAIN LEVEL ---

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Custom Cursor Logic
  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-gray-300 font-mono selection:bg-cyan-500/30 cursor-none">
      
      {/* Custom Crosshair Cursor */}
      <div 
        className="fixed w-6 h-6 border border-cyan-500 rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ left: mousePos.x, top: mousePos.y }}
      >
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-cyan-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>

      <HUD progress={scaleX} />

      <main className="max-w-4xl mx-auto px-6 py-24 relative">
        
        {/* HERO SECTION */}
        <section className="h-[80vh] flex flex-col justify-center border-l border-dashed border-gray-800 pl-12 relative">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-1/4 -left-3 text-cyan-500"
          >
            <Crosshair className="animate-spin-slow" />
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white mb-2 tracking-tighter">
            {PROFILE.name.split(" ")[0]}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-600">
              {PROFILE.name.split(" ")[1]}
            </span>
          </h1>
          <p className="text-xl text-cyan-500/80 mb-8">{PROFILE.tagline}</p>
          
          <div className="flex gap-4">
             <button className="px-6 py-3 bg-cyan-600 text-black font-bold hover:bg-white transition-colors flex items-center gap-2">
                <Terminal size={16} /> INITIATE_SCAN
             </button>
          </div>
        </section>

        {/* STATS GRID */}
        <div className="grid grid-cols-3 gap-4 mb-24 border-y border-gray-800 py-8 bg-gray-900/20">
            {PROFILE.stats.map((stat, i) => (
                <div key={i} className="text-center">
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest">{stat.label}</div>
                </div>
            ))}
        </div>

        {/* SKILLS MODULE */}
        <DataModule title="CORE_ABILITIES" icon={Cpu} delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROFILE.skills.map((s, i) => (
              <SkillGauge key={i} name={s.name} level={s.level} color={s.color} />
            ))}
          </div>
        </DataModule>

        {/* PROJECTS MODULE */}
        <DataModule title="ACTIVE_MISSIONS" icon={Database} delay={0.2}>
           <div className="space-y-8">
              {PROFILE.projects.map((p, i) => (
                  <div key={i} className="border-l-2 border-gray-700 pl-4 hover:border-purple-500 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg font-bold text-white">{p.title}</h4>
                          <span className="text-[10px] bg-purple-900/30 text-purple-400 px-2 py-1 rounded border border-purple-500/30">
                              {p.category.toUpperCase()}
                          </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">{p.desc}</p>
                      <div className="flex gap-2">
                          {p.tech.map((t, j) => (
                              <span key={j} className="text-[10px] text-cyan-400 font-mono">[{t}]</span>
                          ))}
                      </div>
                  </div>
              ))}
           </div>
        </DataModule>

        {/* EXPERIENCE MODULE */}
        <DataModule title="DATA_LOGS" icon={Shield} delay={0.3}>
            {PROFILE.experience.map((exp, i) => (
                <div key={i} className="mb-6 last:mb-0 relative pl-6">
                    <div className="absolute left-0 top-1 w-2 h-2 bg-cyan-900 rounded-full" />
                    <h4 className="text-white font-bold">{exp.role}</h4>
                    <div className="text-xs text-cyan-600 mb-1">{exp.company} // {exp.date}</div>
                    <p className="text-sm text-gray-500">{exp.desc}</p>
                </div>
            ))}
        </DataModule>

        {/* FOOTER */}
        <footer className="mt-24 pt-12 border-t border-gray-800 flex justify-between items-center text-xs text-gray-600">
           <div>MISSION_STATUS: <span className="text-green-500">COMPLETE</span></div>
           <div className="flex gap-6">
              <a href={PROFILE.socials.linkedin} className="hover:text-cyan-500 transition-colors">LINKEDIN_UPLINK</a>
              <a href={PROFILE.socials.github} className="hover:text-cyan-500 transition-colors">GITHUB_REPO</a>
           </div>
        </footer>

      </main>
    </div>
  );
}
