import api from "./axios";

interface Props {
  email: string;
  password: string;
}
export default async function LoginRequest(payload: Props) {
  return await api.post("/auth/login", payload);
}
