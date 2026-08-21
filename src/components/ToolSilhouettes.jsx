import React from 'react';
import { Hammer, Wrench, Bolt, Nut, Drill } from 'lucide-react';

const TOOLS = [Hammer, Wrench, Bolt, Nut, Drill];

// Layout precalculado y fijo (no Math.random() en cada render) para que las
// siluetas no "salten" cuando el componente padre se re-renderiza por scroll.
const LAYOUT = [
  { tool: 0, top: '6%', left: '4%', rotate: -24, size: 46 },
  { tool: 1, top: '14%', left: '92%', rotate: 18, size: 36 },
  { tool: 2, top: '50%', left: '10%', rotate: 32, size: 28 },
  { tool: 3, top: '72%', left: '90%', rotate: -14, size: 40 },
  { tool: 4, top: '38%', left: '50%', rotate: 10, size: 32 },
  { tool: 1, top: '86%', left: '28%', rotate: -35, size: 38 },
  { tool: 0, top: '22%', left: '64%', rotate: 22, size: 32 },
  { tool: 3, top: '4%', left: '38%', rotate: -8, size: 26 },
  { tool: 2, top: '62%', left: '78%', rotate: 45, size: 30 },
  { tool: 4, top: '90%', left: '60%', rotate: -20, size: 34 },
  { tool: 0, top: '44%', left: '88%', rotate: 60, size: 24 },
  { tool: 1, top: '8%', left: '70%', rotate: -45, size: 28 },
  { tool: 3, top: '58%', left: '40%', rotate: 15, size: 22 },
  { tool: 2, top: '30%', left: '20%', rotate: -60, size: 26 },
  { tool: 4, top: '78%', left: '8%', rotate: 40, size: 28 },
  { tool: 0, top: '94%', left: '82%', rotate: -30, size: 32 },
];

/**
 * Fondo decorativo con siluetas de herramientas dispersas y rotadas,
 * inspirado en el patrón de fondo del logo. Puramente estético.
 */
const ToolSilhouettes = ({ className = '' }) => (
  <div
    className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    aria-hidden="true"
  >
    {LAYOUT.map((item, i) => {
      const Icon = TOOLS[item.tool];
      return (
        <Icon
          key={i}
          size={item.size}
          className="absolute text-zinc-400/20"
          style={{ top: item.top, left: item.left, transform: `rotate(${item.rotate}deg)` }}
        />
      );
    })}
  </div>
);

export default ToolSilhouettes;
