import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "App page" },
    { name: "description", content: "Welcome!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <span className="text-4xl font-bold">Template</span>
    </div>
  );
}
