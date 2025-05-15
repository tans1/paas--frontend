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
  framework: string;
  buildCommand: string | undefined;
  installCommand: string | undefined;
  outputDirectory: string | undefined;
  projectDescription: string;
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

interface ApiResponse {
  success: boolean;
  message: string;
  data: Project;
}

export default async function deployProject(project: DeployedProject) {
  const {
    envVars,
    envFile,
    owner,
    repo,
    githubUsername,
    branch,
    framework,
    buildCommand,
    installCommand,
    outputDirectory,
    projectDescription,
  } = project;

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
  if (framework) {
    formData.append("framework", framework);
  }
  if (buildCommand) {
    formData.append("buildCommand", buildCommand);
  }
  if (installCommand) {
    formData.append("installCommand", installCommand);
  }
  if (outputDirectory) {
    formData.append("outputDirectory", outputDirectory);
  }
  if (projectDescription) {
    formData.append("projectDescription", projectDescription);
  }

  return await api.post<ApiResponse>("/repositories/deploy", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
