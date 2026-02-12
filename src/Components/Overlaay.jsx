import { Scroll } from "@react-three/drei";
import { PROFILE } from "../data";

const Section = ({ align, children }) => (
  <div className={`h-screen flex flex-col justify-center p-10 ${align === 'right' ? 'items-end' : 'items-start'}`}>
    <div className="w-1/2">
      {children}
    </div>
  </div>
);

export default function Overlay() {
  return (
    <Scroll html style={{ width: "100%" }}>
      {/* PAGE 1: HERO */}
      <Section align="left">
        <h1 className="text-6xl font-bold mb-4 tracking-tighter">
          <span className="text-neon-blue">INSIGHT</span> ENGINE
        </h1>
        <p className="text-xl font-mono text-gray-400">
          {PROFILE.role}
        </p>
        <div className="mt-8 border-l-4 border-neon-blue pl-4">
           <p className="text-sm">Initiating ETL Pipeline...</p>
           <p className="text-sm">Source: {PROFILE.experience[0].company}</p>
        </div>
      </Section>

      {/* PAGE 2: SKILLS */}
      <Section align="right">
        <h2 className="text-4xl font-bold mb-6 text-neon-purple">TRANSFORMATION LOG</h2>
        <div className="bg-black/80 p-6 border border-gray-800 backdrop-blur-md rounded">
          {PROFILE.experience.map((exp, i) => (
            <div key={i} className="mb-6">
              <h3 className="text-xl font-bold text-white">{exp.role}</h3>
              <p className="text-neon-blue text-sm">{exp.company} | {exp.period}</p>
              <p className="text-gray-400 text-xs mt-1">{exp.details}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* PAGE 3: PROJECTS */}
      <Section align="left">
         <h2 className="text-4xl font-bold mb-6 text-green-400">OUTPUT DATA</h2>
         <div className="space-y-4">
            {PROFILE.projects.map((proj, i) => (
              <div key={i} className="border-l-4 border-white pl-4 py-2 hover:border-neon-blue transition-colors">
                 <h3 className="text-2xl font-bold">{proj.title}</h3>
                 <p className="text-sm text-gray-300">{proj.desc}</p>
                 <p className="text-xs text-neon-blue font-mono mt-1">{proj.tech}</p>
              </div>
            ))}
         </div>
      </Section>

      {/* PAGE 4: FOOTER */}
      <Section align="center">
        <div className="w-full text-center bg-black/90 p-10 rounded-xl border border-gray-800">
            <h2 className="text-3xl font-bold mb-4">PIPELINE COMPLETE</h2>
            <div className="flex gap-4 justify-center">
                <button 
                    onClick={() => window.alert("Downloading Resume...")}
                    className="px-8 py-3 bg-neon-blue text-black font-bold hover:bg-white transition-all"
                >
                    DOWNLOAD LOGS (CV)
                </button>
                <a 
                    href={`https://${PROFILE.socials.linkedin}`} 
                    target="_blank"
                    className="px-8 py-3 border border-neon-blue text-neon-blue font-bold hover:bg-neon-blue/10 transition-all"
                >
                    CONNECT
                </a>
            </div>
        </div>
      </Section>
    </Scroll>
  );
}
