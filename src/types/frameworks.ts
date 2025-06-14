export type Framework =
  | "Next"
  | "React"
  | "Vue"
  | "Angular"
  | "NestJS"
  | "Docker"
  | "CreateReactApp"
  | "Vite"
  | "Python";

export const frameworksImageMap: Record<Framework, string> = {
  Next: "https://seeklogo.com/images/N/next-js-logo-8FCFF51DD2-seeklogo.com.png",
  React: "https://seeklogo.com/images/R/react-logo-7B3CE81517-seeklogo.com.png",
  Vue: "https://seeklogo.com/images/V/vuejs-logo-17D586B587-seeklogo.com.png",
  Angular:
    "https://seeklogo.com/images/A/angular-logo-B76B1CDE98-seeklogo.com.png",
  NestJS:
    "https://seeklogo.com/images/N/nestjs-logo-09342F76C0-seeklogo.com.png",
  Docker:
    "https://images.seeklogo.com/logo-png/27/1/docker-logo-png_seeklogo-273037.png",
  CreateReactApp:
    "https://seeklogo.com/images/R/react-logo-7B3CE81517-seeklogo.com.png",
  Vite: "https://seeklogo.com/images/V/vite-logo-BFD4283991-seeklogo.com.png",
  Python:
    "https://seeklogo.com/images/P/python-logo-A32636CAA3-seeklogo.com.png",
};
