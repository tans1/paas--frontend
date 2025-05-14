import api from "./axios";

interface EnvPair {
  key: string;
  value: string;
}

interface DeployedProject {
  envVars: EnvPair[];
  envFile: File | null;
  owner: string | undefined;
  repo: string | undefined;
  githubUsername: string | undefined;
  branch: string | undefined;
}

interface Project {
  name: string;
  id: number;
  repoId: number;
  url: string;
  linkedByUserId: number;
  createdAt: Date;
  deployedIp: string | null;
  deployedPort: number | null;
  deployedUrl: string | null;
  localRepoPath: string | null;
  zoneId: string | null;
  aRecordId: string | null;
  cnameRecordId: string | null;
}

export default async function deployProject(project: DeployedProject) {
  const { envVars, envFile, owner, repo, githubUsername, branch } = project;

  const formData = new FormData();

  formData.append("envVars", JSON.stringify(envVars));

  if (envFile) {
    formData.append("envFile", envFile);
  }
  if (branch) {
    formData.append("branch", branch);
  }
  if (owner) {
    formData.append("owner", owner);
  }
  if (repo) {
    formData.append("repo", repo);
  }
  if (githubUsername) {
    formData.append("githubUsername", githubUsername);
  }

  return await api.post<Project>("/repositories/deploy", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
