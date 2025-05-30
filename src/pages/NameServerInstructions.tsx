import { useLocation, useNavigate } from "react-router-dom";

interface NameServerResponse {
  message: string;
  nameservers: string[];
  next_steps: string[];
  documentation_url: string;
}

export default function NameServerInstructions() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as NameServerResponse | undefined;

  if (!state) {
    // If accessed directly, redirect to dashboard
    navigate("/dashboard/projects");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-10">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-lg w-full border border-blue-100">
        <div className="text-3xl font-bold text-blue-700 mb-4 text-center">
          Update Your Domain Name Servers
        </div>
        <div className="text-gray-700 mb-6 text-center">{state.message}</div>
        <div className="mb-6">
          <div className="font-semibold text-gray-800 mb-2 text-center">
            Your new nameservers:
          </div>
          <ul className="bg-blue-50 rounded p-4 flex flex-col gap-2">
            {state.nameservers.map((ns, idx) => (
              <li
                key={idx}
                className="text-blue-700 font-mono text-lg text-center"
              >
                {ns}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-6">
          <div className="font-semibold text-gray-800 mb-2 text-center">
            Next Steps:
          </div>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            {state.next_steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>
        <div className="text-center mb-4">
          <a
            href={state.documentation_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-semibold"
          >
            View Full Setup Guide
          </a>
        </div>
        <div className="text-center">
          <button
            onClick={() => navigate("/dashboard/projects")}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    </div>
  );
}
