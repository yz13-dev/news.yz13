import ArticleCard from "@/components/article-card";
import AutoGrid from "@/components/auto-grid";
import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Button } from "@yz13/ui/button";

export const loader = async () => {

  const response = await fetch("https://api.yz13.ru/v1/news")

  const articles = await response.json()

  return { articles }
}

export const meta: MetaFunction = () => {
  return [
    { title: "Новостной аггрегатор" },
    { name: "description", content: "Welcome!" },
  ];
};

export default function Index() {

  const { articles } = useLoaderData<typeof loader>();

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
      <div className="px-8 pb-8 max-w-lg w-full mx-auto divide-y">
        <AutoGrid>
          {
            articles.map((article: any) => {
              return <ArticleCard key={article.id} article={article} />
            })
          }
        </AutoGrid>
      </div>
    </>
  );
}
