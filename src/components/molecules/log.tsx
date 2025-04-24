import { useEffect, useRef, useState } from "react";

interface Props {
  logs?: string[];

  autoScroll?: boolean;
}

export default function Log({ logs = [], autoScroll = true }: Props) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [localLogs, setLocalLogs] = useState<string[]>(logs);

  useEffect(() => {
    setLocalLogs(logs);
  }, [logs]);

  useEffect(() => {
    if (autoScroll && terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [localLogs, autoScroll]);

  return (
    <div className={`flex flex-col  overflow-hidden w-full h-full`}>
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
      </div>
      <div
        ref={terminalRef}
        className={`bg-gray-900 p-4 font-mono text-sm overflow-y-auto h-full`}>
        {localLogs.length === 0 ? (
          <div className="text-gray-500 italic">No logs to display</div>
        ) : (
          localLogs.map((log, index) => (
            <div key={index} className="mb-1 leading-relaxed break-words">
              <span className="text-gray-300">{log}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
