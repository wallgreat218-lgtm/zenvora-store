import React from "react";

export default function ZenvoraLogo({ className = "" }: { className?: string }) {
  const gid = React.useId();
  const gradId = `zv-${gid}`;
  return (
    <div className={`zvLogo ${className}`.trim()} aria-label="Zenvora Electronics">
      <svg className="zvIcon" viewBox="0 0 64 64" role="img" aria-hidden="true">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0ea5e9" />
            <stop offset="1" stopColor="#2563eb" />
          </linearGradient>
        </defs>
        <path
          d="M32 6l20 10v16c0 14-8.5 22.7-20 26C20.5 54.7 12 46 12 32V16L32 6z"
          fill={`url(#${gradId})`}
          opacity="0.95"
        />
        <path
          d="M22 22h20l-18 20h18"
          fill="none"
          stroke="white"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div>
        <div className="zvTitle">ZENVORA</div>
        <div className="zvSubtitle">ELECTRONICS</div>
      </div>
    </div>
  );
}
