// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useDashboardStore } from "../store/dashboardStore";
// import { useUserStore } from "../store/userStore";

// const RepositoriesList: React.FC = () => {
//   const { user } = useUserStore();
//   const { repositories = [], setSelectedRepo, fetchRepositories } = useDashboardStore();
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     if (user?.githubUsername) {
//       fetchRepositories(user.githubUsername);
//     }
//   }, [fetchRepositories]);

//   // Show the most recent 5 repositories by default
//   const recentRepos = repositories.slice(0, 5);

//   // Filter repositories based on search input
//   const filteredRepos = search
//     ? repositories.filter(repo => repo.name.toLowerCase().includes(search.toLowerCase()))
//     : recentRepos;

//   return (
//     <div className="p-6 max-w-md mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Your Repositories</h2>

//       <input
//         type="text"
//         placeholder="Search repositories..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="border border-gray-300 p-2 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//       />

//       <div className="flex flex-col space-y-3">
//         {filteredRepos.map((repo) => (
//           <Link to="/dashboard/repo" key={repo.id}>
//             <div
//               className="p-4 border border-gray-200 rounded-md shadow-sm cursor-pointer transition duration-200 ease-in-out hover:bg-gray-100"
//               onClick={() => setSelectedRepo(repo)}
//             >
//               <p className="text-lg font-medium text-gray-800">{repo.name}</p>
//               <p className="text-sm text-gray-500">{new Date(repo.updated_at).toLocaleDateString()}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RepositoriesList;
