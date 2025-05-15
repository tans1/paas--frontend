import { useEffect, useRef } from "react";
import AnsiToHtml from "ansi-to-html";

interface LogProps {
  logs: string[];
}

const convert = new AnsiToHtml({
  newline: true,
  escapeXML: true,
  colors: {
    0: "#000000", // Black
    1: "#FF0000", // Red
    2: "#00FF00", // Green
    3: "#FFFF00", // Yellow
    4: "#0000FF", // Blue
    5: "#FF00FF", // Magenta
    6: "#00FFFF", // Cyan
    7: "#FFFFFF", // White
    8: "#808080", // Gray
    9: "#FF8080", // Light Red
    10: "#80FF80", // Light Green
    11: "#FFFF80", // Light Yellow
    12: "#8080FF", // Light Blue
    13: "#FF80FF", // Light Magenta
    14: "#80FFFF", // Light Cyan
    15: "#FFFFFF", // Light White
  },
});

export default function Log({ logs }: LogProps) {
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div
      ref={logContainerRef}
      className="w-full h-full bg-black text-white font-mono text-sm p-4 overflow-y-auto"
    >
      {logs.map((log, index) => (
        <div
          key={index}
          className="whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: convert.toHtml(log) }}
        />
      ))}
    </div>
  );
}
