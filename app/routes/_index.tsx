import type { MetaFunction } from "@remix-run/node";
import { Button } from "@yz13/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "App page" },
    { name: "description", content: "Welcome!" },
  ];
};

export default function Index() {
  return (
    <>
      <div className="max-w-lg p-8 mt-[10%] w-full mx-auto">
        <div className="w-full space-y-3">
          <h1 className="text-2xl block font-medium">Новостной аггрегатор</h1>
          <Button variant="secondary">
            Понедельник, 25 марта
          </Button>
        </div>
      </div>
    </>
  );
}
