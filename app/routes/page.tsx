import ArticleCard, { ArticleCardSkeleton } from "@/components/article-card";
import AutoGrid from "@/components/auto-grid";
import DatePicker from "@/components/date-picker";
import { getNewsV1 } from "@yz13/api";
import { format } from "date-fns";
import { LoaderFunctionArgs, MetaFunction, useLoaderData } from "react-router";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {

    const url = new URL(request.url);

    const searchParams = url.searchParams

    const queryDate = searchParams.get("date")

    const date = queryDate ? queryDate : format(new Date(), "yyyy-MM-dd")

    const articles = await getNewsV1({ date })

    return { articles }
  } catch (error) {
    console.error(error)
    return { articles: [] }
  }
}

export const meta: MetaFunction = () => {
  return [
    { title: "Новостной аггрегатор" },
    { name: "description", content: "Welcome!" },
  ];
};

export function HydrateFallback() {

  const cards = Array.from({ length: 8 }).map((_, i) => i)

  return (
    <>
      <div className="max-w-lg p-8 mt-[10%] w-full mx-auto">
        <div className="w-full space-y-3">
          <h1 className="text-2xl block font-medium">Новостной аггрегатор</h1>
          <DatePicker />
        </div>
      </div>
      <div className="px-8 pb-8 max-w-lg w-full mx-auto divide-y">
        {
          cards.map((card) => <ArticleCardSkeleton key={card} />)
        }
      </div>
    </>
  )
}

export default function Index() {

  const { articles } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="max-w-lg p-8 mt-[10%] w-full mx-auto">
        <div className="w-full space-y-3">
          <h1 className="text-2xl block font-medium">Новостной аггрегатор</h1>
          <DatePicker />
        </div>
      </div>
      <div className="px-8 pb-8 max-w-lg w-full mx-auto divide-y">
        <AutoGrid>
          {
            (articles ?? []).map((article: any) => {
              return <ArticleCard key={article.id} article={article} />
            })
          }
        </AutoGrid>
      </div>
    </>
  );
}
