type P = { size?: number; className?: string };

export const Flower = ({ size = 22, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    {[0, 72, 144, 216, 288].map((r) => (
      <ellipse key={r} cx="12" cy="6.5" rx="3.2" ry="5.2" transform={`rotate(${r} 12 12)`} opacity="0.9" />
    ))}
    <circle cx="12" cy="12" r="2.4" fill="var(--bg)" />
  </svg>
);

export const Petal = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 2C7 6 5.5 11 7.5 16S12 22 12 22s2.5-1 4.5-6S17 6 12 2z" />
  </svg>
);

export const Sun = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
    <circle cx="12" cy="12" r="4.2" />
    {Array.from({ length: 8 }).map((_, i) => (
      <line key={i} x1="12" y1="2.5" x2="12" y2="4.8" transform={`rotate(${i * 45} 12 12)`} />
    ))}
  </svg>
);

export const Moon = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden>
    <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
    <path d="M17 3.5l.6 1.4 1.4.6-1.4.6L17 7.5l-.6-1.4-1.4-.6 1.4-.6z" fill="currentColor" />
  </svg>
);

export const Arrow = ({ size = 16 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow" aria-hidden>
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

export const ArrowUp = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
);

export const Download = ({ size = 16 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 4v11M7 10.5l5 5 5-5" />
    <path d="M5 19.5h14" />
  </svg>
);

export const GitHub = ({ size = 16 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
  </svg>
);

export const Mail = ({ size = 16 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="M4 7l8 6 8-6" />
  </svg>
);

export const Phone = ({ size = 16 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </svg>
);

export const Pin = ({ size = 16 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

export const Copy = ({ size = 16 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="8" y="8" width="13" height="13" rx="3" />
    <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
  </svg>
);

export const Check = ({ size = 16 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

export const Cap = ({ size = 16 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M2 9l10-5 10 5-10 5z" />
    <path d="M6 11v5c3 2 9 2 12 0v-5" />
  </svg>
);

/* project motifs — simple line illustrations */
export const Motif = ({ name }: { name: string }) => {
  const common = {
    className: "motif",
    viewBox: "0 0 120 120",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "hotel":
      return (
        <svg {...common}>
          <path d="M24 100V34l36-16 36 16v66" />
          <path d="M14 100h92" />
          <path d="M50 100V78h20v22" />
          <path d="M40 46h8M72 46h8M40 62h8M72 62h8" />
          <path d="M56 36h8" />
        </svg>
      );
    case "plane":
      return (
        <svg {...common}>
          <path d="M18 68l84-30-26 52-14-22-22-4z" />
          <path d="M62 68l40-30" />
          <path d="M20 92c14 0 18-8 30-8" strokeDasharray="2 8" />
        </svg>
      );
    case "globe":
      return (
        <svg {...common}>
          <circle cx="60" cy="60" r="40" />
          <path d="M20 60h80M60 20c14 14 14 66 0 80M60 20c-14 14-14 66 0 80" />
          <path d="M28 38h64M28 82h64" />
        </svg>
      );
    case "school":
      return (
        <svg {...common}>
          <path d="M16 46l44-22 44 22-44 22z" />
          <path d="M34 56v24c14 10 38 10 52 0V56" />
          <path d="M104 46v28" />
        </svg>
      );
    case "invoice":
      return (
        <svg {...common}>
          <path d="M30 14h60v92l-10-7-10 7-10-7-10 7-10-7-10 7z" />
          <path d="M44 38h32M44 54h32M44 70h18" />
          <path d="M70 70h6" />
        </svg>
      );
    case "pharmacy":
      return (
        <svg {...common}>
          <rect x="22" y="44" width="76" height="32" rx="16" transform="rotate(-45 60 60)" />
          <path d="M49 49l22 22" />
          <path d="M84 84h20M94 74v20" />
        </svg>
      );
    case "post":
      return (
        <svg {...common}>
          <rect x="22" y="18" width="76" height="84" rx="12" />
          <path d="M36 40h48M36 56h48M36 72h28" />
          <circle cx="86" cy="86" r="14" fill="currentColor" stroke="none" opacity=".35" />
          <path d="M80 86h12M86 80v12" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect x="18" y="30" width="84" height="64" rx="10" />
          <path d="M18 46h84M34 30l8 16M58 30l8 16M82 30l8 16" />
          <path d="M52 62l18 10-18 10z" fill="currentColor" />
        </svg>
      );
  }
};
