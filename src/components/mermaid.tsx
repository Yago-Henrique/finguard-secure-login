import { useEffect, useRef } from "react";
import mermaid from "mermaid";

let initialized = false;

export function Mermaid({ chart, id }: { chart: string; id: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!initialized) {
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          background: "transparent",
          primaryColor: "#1e1b4b",
          primaryTextColor: "#e0e7ff",
          primaryBorderColor: "#6366f1",
          lineColor: "#818cf8",
          secondaryColor: "#312e81",
          tertiaryColor: "#0f0f23",
        },
      });
      initialized = true;
    }
    let cancelled = false;
    mermaid
      .render(`m-${id}`, chart)
      .then(({ svg }) => {
        if (!cancelled && ref.current) ref.current.innerHTML = svg;
      })
      .catch((e) => {
        if (ref.current) ref.current.innerHTML = `<pre class="text-xs text-destructive">${String(e)}</pre>`;
      });
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  return (
    <div
      ref={ref}
      className="my-4 overflow-x-auto rounded-xl border border-border/60 bg-card/40 p-4 flex justify-center [&_svg]:max-w-full"
    />
  );
}
