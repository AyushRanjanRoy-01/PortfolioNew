// Decorative, on-brand motif: a small multi-agent network that "lights up".
// Black edges/nodes on paper, orange pulses. Pure CSS animation (respects
// prefers-reduced-motion via the global rule).
const NODES = [
  { x: 56, y: 64 },
  { x: 150, y: 42 },
  { x: 226, y: 104 },
  { x: 92, y: 150 },
  { x: 200, y: 188 },
  { x: 134, y: 236 },
];
const EDGES = [
  [0, 1], [1, 2], [0, 3], [3, 4], [2, 4], [1, 3], [4, 5],
];
// a "signal path" that pulses orange in sequence
const FLOW = [[0, 1], [1, 3], [3, 4], [4, 5]];

const INK = "#1B1B18";
const ORANGE = "#F26B21";

export default function HeroArt() {
  return (
    <svg
      viewBox="0 0 280 280"
      width="260"
      height="260"
      fill="none"
      role="img"
      aria-label="Animated diagram of a multi-agent network"
    >
      {EDGES.map(([a, b], i) => (
        <line
          key={`e${i}`}
          x1={NODES[a].x} y1={NODES[a].y}
          x2={NODES[b].x} y2={NODES[b].y}
          stroke={INK} strokeOpacity="0.16" strokeWidth="1"
        />
      ))}

      {FLOW.map(([a, b], i) => (
        <line
          key={`f${i}`}
          x1={NODES[a].x} y1={NODES[a].y}
          x2={NODES[b].x} y2={NODES[b].y}
          stroke={ORANGE} strokeWidth="1.5"
          className="art-pulse"
          style={{ animationDelay: `${i * 0.5}s` }}
        />
      ))}

      <circle
        cx={NODES[1].x} cy={NODES[1].y} r="15"
        stroke={ORANGE} strokeWidth="1"
        className="art-pulse" style={{ animationDelay: "0.2s" }}
      />

      {NODES.map((n, i) => (
        <g key={`n${i}`}>
          <circle cx={n.x} cy={n.y} r="5" fill={INK} />
          <circle
            cx={n.x} cy={n.y} r="5" fill={ORANGE}
            className="art-pulse" style={{ animationDelay: `${i * 0.42}s` }}
          />
        </g>
      ))}
    </svg>
  );
}
