// import { useDashboardStore } from "../store/dashboardStore";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useUserStore } from "../store/userStore";

// const DeployPage: React.FC = () => {
//   const { user } = useUserStore();
//   const {
//     selectedRepo,
//     deploy,
//     createWebSocketConnection,
//     socket,
//     fetchProject,
//     fetchedProject,
//     setCurrentProject,
//   } = useDashboardStore();
//   const navigate = useNavigate();

//   const [framework, setFramework] = useState("Vue.js");
//   const [rootDirectory, setRootDirectory] = useState("./");
//   const [logs, setLogs] = useState<string[]>([]);

//   const frameworks = ["Angular", "React", "Vue.js", "NestJS", "Express"];

//   useEffect(() => {
//     if (!selectedRepo) {
//       navigate("/dashboard"); // Redirect if no repository is selected
//       return;
//     }
    
//     if (selectedRepo && selectedRepo.id) {
//         fetchProject(selectedRepo.id);
//     }
    
//     if (!socket) {
//       createWebSocketConnection(selectedRepo.id || 0);
//     }
//     if (socket) {
//       const handleLog = (data: string) => {
//         setLogs((prevLogs) => [...prevLogs, data]);
//       };

//       socket.on("deploymentLog", handleLog);

//       return () => {
//         socket.off("deploymentLog", handleLog);
//       };
//     }
//   }, [selectedRepo, socket]);

//   if (!selectedRepo) return null;

//   const handleDeploy = () => {
//     if (user?.githubUsername) {
//       deploy(user?.githubUsername, selectedRepo.name, user?.githubUsername);
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto border-2 my-5 rounded">
//       <h1 className="text-2xl font-bold">Deploy {selectedRepo.name}</h1>
//       <p className="text-gray-600">
//         {selectedRepo.description || "No description provided"}
//       </p>
//       <p className="text-gray-600">Last updated: {selectedRepo.updated_at}</p>

//       <div className="mt-4">
//         <h3 className="font-semibold">Framework:</h3>
//         <select
//           className="w-full p-2 border rounded"
//           value={framework}
//           onChange={(e) => setFramework(e.target.value)}>
//           {frameworks.map((fw) => (
//             <option key={fw} value={fw}>
//               {fw}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="mt-2">
//         <h3 className="font-semibold">Root Directory:</h3>
//         <input
//           type="text"
//           className="w-full p-2 border rounded"
//           value={rootDirectory}
//           onChange={(e) => setRootDirectory(e.target.value)}
//         />
//       </div>

//       <div className="mt-2">
//         <h3 className="font-semibold">Vercel Team:</h3>
//         <p className="text-gray-600">Nahom's Projects (Hobby)</p>
//       </div>

//       <div className="mt-4 flex space-x-2">
//         <button
//           className="bg-gray-300 px-4 py-2 rounded"
//           onClick={() => navigate("/dashboard")}>
//           Back
//         </button>
//         {fetchedProject ? (
//           <div
//             onClick={() => {
//               setCurrentProject(fetchedProject!);
//               navigate("/dashboard/ProjectsPage/ProjectDetailPage");
//             }}
//             className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer text-center">
//             Go to deployment
//           </div>
//         ) : (
//           <button
//             className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer text-center"
//             onClick={handleDeploy}>
//             Deploy
//           </button>
//         )}
//       </div>

//       {logs.length > 0 && (
//         <div className="mt-4 bg-gray-100 p-2 rounded max-h-40 overflow-y-auto">
//           <h3 className="font-semibold">Deployment Log</h3>
//           <ul className="text-sm text-gray-700">
//             {logs.map((log, index) => (
//               <li key={index}>{log}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DeployPage;
