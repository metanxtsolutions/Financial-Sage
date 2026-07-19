// Minimal hand-rolled line icons — avoids pulling in an icon library dependency.
// 24x24 viewBox, stroke-based, inherits color via currentColor.

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export type IconName =
  | "document-check"
  | "refresh"
  | "shield-check"
  | "bell"
  | "calendar-check"
  | "truck"
  | "tag"
  | "chat"
  | "users"
  | "globe"
  | "clock"
  | "user-check"
  | "badge-check"
  | "lock";

const paths: Record<IconName, React.ReactNode> = {
  "document-check": (
    <>
      <path d="M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v4h4" />
      <path d="m9.5 14 2 2 4-4" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 11a8 8 0 0 0-14.5-4.5M4 5v5h5" />
      <path d="M4 13a8 8 0 0 0 14.5 4.5M20 19v-5h-5" />
    </>
  ),
  "shield-check": (
    <>
      <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      <path d="m9.5 12.5 2 2 3.5-4" />
    </>
  ),
  bell: (
    <>
      <path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9Z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </>
  ),
  "calendar-check": (
    <>
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" />
      <path d="m9 15 2 2 4-4" />
    </>
  ),
  truck: (
    <>
      <path d="M3 7h11v9H3z" />
      <path d="M14 10h4l3 3v3h-7z" />
      <circle cx="7.5" cy="18" r="1.5" />
      <circle cx="17.5" cy="18" r="1.5" />
    </>
  ),
  tag: (
    <>
      <path d="M12 3h6a1 1 0 0 1 1 1v6l-9 9-7-7 9-9Z" />
      <circle cx="15" cy="7" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  chat: (
    <>
      <path d="M4 5h16v11H8l-4 4V5Z" />
      <path d="M8 9h8M8 12h5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M16 8a3 3 0 1 1 0-6" />
      <path d="M15 14c2.8.3 5 2.8 5 6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 4 5.7 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.7-4-9s1.5-6.5 4-9Z" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  "user-check": (
    <>
      <circle cx="10" cy="8" r="3.5" />
      <path d="M3.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" />
      <path d="m16 9 1.5 1.5L21 7" />
    </>
  ),
  "badge-check": (
    <>
      <path d="M12 3.5 14 5l2.6-.4 1 2.4L20 8.4l-1 2.4.6 2.6-2.2 1.5.4 2.6-2.6.6-1.5 2.2-2.4-1-2.4 1-1.5-2.2-2.6-.6.4-2.6-2.2-1.5.6-2.6-1-2.4L5.4 4.6l2.6.4L10 3.5Z" />
      <path d="m9 12.5 2 2 4-4.5" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="1.5" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg {...common} className={className} aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
