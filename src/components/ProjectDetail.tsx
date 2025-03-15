import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDashboardStore } from '../store/dashboardStore';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const { currentProject } = useDashboardStore();

  if (!currentProject) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 text-gray-900">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-[70%] min-h-screen bg-gray-100 text-gray-900 mx-auto">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          {/* // TODO: Back button doesn't appropiately work. */}
          <Link
            to="/"
            className="rounded bg-indigo-50 px-3 py-1 text-indigo-600 transition-colors hover:bg-indigo-100"
          >
            ← Back
          </Link>
          <h1 className="text-xl font-semibold">{currentProject.name}</h1>
          <div />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <section className="mb-8 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">Project Information</h2>

          <div className="mb-6 flex flex-wrap items-center gap-4">
            {currentProject.url && (
              <a
                href={currentProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-indigo-600 hover:underline"
              >
                GitHub: {currentProject.url.replace('https://', '')}
              </a>
            )}

            {currentProject.deployedIp && currentProject.deployedPort && (
              <a
                href={`http://${currentProject.deployedIp}:${currentProject.deployedPort}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-indigo-600 hover:underline"
              >
                Deployment: {currentProject.deployedIp}:{currentProject.deployedPort}
              </a>
            )}
          </div>

        </section>

        <section className="mb-8 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-6 text-lg font-semibold">Deployments</h2>

          {currentProject.deployments && currentProject.deployments.length > 0 ? (
  <ul className="space-y-4">
    {currentProject.deployments.map((deployment) => (
      <li
        key={deployment.id}
        className="rounded-md border border-gray-200 bg-gray-50 p-4"
      >
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-medium">Status:</span>
            <StatusBadge status={deployment.status} />
          </div>
          <div>
            <span className="font-medium">Branch:</span>{' '}
            <span className="font-normal">{deployment.branch}</span>
          </div>
        </div>

        <div>
          <span className="font-medium">Created: </span>
          <span className="font-normal">
            {new Date(deployment.createdAt).toLocaleString()}
          </span>
        </div>

        <details className="mt-4">
          <summary className="cursor-pointer text-indigo-600 hover:underline">
            Show Logs
          </summary>
          {deployment.logs && deployment.logs.length > 0 ? (
            <ul className="mt-2">
              {deployment.logs.map((log) => (
                <li
                  key={log.id}
                  className=" border-gray-300 bg-white p-2 flex gap-2"
                >
                  <p className="text-sm font-medium w-[30%]">
                    <span>
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </p>
                  <p className="text-sm w-[70%]">{log.message}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-gray-500">No logs available.</p>
          )}
        </details>
      </li>
    ))}
  </ul>
) : (
  <p>No deployments found.</p>
)}

        </section>

        <section className="mb-8 rounded-lg bg-white p-6 shadow">
          <h3 className="mb-4 text-md font-semibold">Deployment Configuration</h3>
          <p className="text-sm text-gray-700">
            (Place any environment configuration, build settings, or relevant data here)
          </p>
        </section>

        <section className="mb-8 rounded-lg bg-white p-6 shadow">
          <h3 className="mb-4 text-md font-semibold">Build Logs</h3>
          <p className="text-sm text-gray-700">
            (You could link to or embed build logs for each deployment here)
          </p>
        </section>

        <section className="mb-8 rounded-lg bg-white p-6 shadow">
          <h3 className="mb-4 text-md font-semibold">Deployment Summary</h3>
          <p className="text-sm text-gray-700">
            (Summaries, stats, or usage info for each deployment can go here)
          </p>
        </section>
      </main>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  let bgColor = 'bg-gray-200';
  let textColor = 'text-gray-800';
  let label = status;

  if (status === 'ready') {
    bgColor = 'bg-green-100';
    textColor = 'text-green-700';
    label = 'Ready';
  } else if (status === 'building') {
    bgColor = 'bg-yellow-100';
    textColor = 'text-yellow-700';
    label = 'Building';
  } else if (status === 'error') {
    bgColor = 'bg-red-100';
    textColor = 'text-red-700';
    label = 'Error';
  }

  return (
    <span
      className={`inline-block rounded px-2 py-1 text-xs font-semibold ${bgColor} ${textColor}`}
    >
      {label}
    </span>
  );
}
