import React from "react";

interface Props {
  title: string;
  subtitle?: string;
}

export default function PagesTitle({ title, subtitle }: Props) {
  return (
    <div className="">
      <p className="text-black text-4xl font-bold mb-4">{title}</p>
      {/* <p className="text-black">{subtitle}</p> */}
      <p className="bg-black h-px w-full"></p>
    </div>
  );
}
