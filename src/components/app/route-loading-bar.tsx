import { useRouterState } from "@tanstack/react-router";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function RouteLoadingBar() {
  const isRouting = useRouterState({
    select: (s) => s.isLoading || s.isTransitioning,
  });
  const fetching = useIsFetching();
  const mutating = useIsMutating();
  const active = isRouting || fetching > 0 || mutating > 0;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setVisible(true), 80);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisible(false), 200);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div
      aria-hidden={!visible}
      role="progressbar"
      aria-label="Carregando"
      className="pointer-events-none fixed left-0 right-0 top-0 z-[9999] h-[2px] overflow-hidden"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 200ms ease" }}
    >
      <div
        className="h-full w-1/3 rounded-r-full bg-primary"
        style={{
          boxShadow: "0 0 10px hsl(var(--primary) / 0.6), 0 0 4px hsl(var(--primary) / 0.8)",
          animation: "route-loading-slide 1.1s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        }}
      />
      <style>{`
        @keyframes route-loading-slide {
          0%   { transform: translateX(-100%) scaleX(0.6); }
          50%  { transform: translateX(80%)  scaleX(1); }
          100% { transform: translateX(260%) scaleX(0.5); }
        }
      `}</style>
    </div>
  );
}