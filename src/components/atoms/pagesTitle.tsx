import { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  component?: ReactNode;
}

export default function PagesTitle({ title, subtitle, component }: Props) {
  return (
    <div className="">
      <p className="text-black text-4xl font-bold mb-4">{title}</p>
      {subtitle && <p className="text-black">{subtitle}</p>}
      {component && <div>{component}</div>}
      <p className="bg-black h-px w-full"></p>
    </div>
  );
}
