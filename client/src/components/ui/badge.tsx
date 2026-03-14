import React from "react";

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-1 text-xs bg-teal-600 text-white rounded">
      {children}
    </span>
  );
}