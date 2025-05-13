export const validatePassword = (value: string): string => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
  if (!passwordRegex.test(value)) {
    return "Password must be at least 8 characters long, include 1 uppercase, 1 lowercase, 1 symbol, and 1 number.";
  }
  return "";
};
