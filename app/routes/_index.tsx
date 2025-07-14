import type { MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Button } from "@yz13/ui/button";
import { formatRelative, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { ExternalLinkIcon, ImageOffIcon } from "lucide-react";

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
        {
          articles.map((article: any) => {

            const title = article.title

            const author = article.author
            const publishedAt = parseISO(article.published_at)

            const image = article.img
            const imageUrl = image?.url

            const sourceLink = article.news_source?.url;
            return (
              <div className="space-y-3 py-4 gap-2 relative" key={article.id}>
                {
                  imageUrl
                    ? <img src={imageUrl} className="md:w-36 w-full md:absolute relative md:-left-40 left-0 aspect-video rounded-lg object-cover" alt={title} />
                    : <div className="md:w-36 w-full md:absolute relative md:flex hidden border md:-left-40 left-0 aspect-video rounded-lg object-cover  items-center justify-center">
                      <ImageOffIcon size={24} className="text-muted-foreground" />
                    </div>
                }
                <div>
                  <span className="text-lg font-medium text-pretty">{title}</span>
                </div>
                <span className="text-xs block text-muted-foreground capitalize">
                  {formatRelative(publishedAt, new Date(), { locale: ru })}
                </span>
                <div className="flex items-center gap-3">
                  {
                    author &&
                    <span className="text-xs text-muted-foreground">{author}</span>
                  }
                  <Link to={sourceLink} className="text-xs hover:underline inline-flex items-center gap-1 text-muted-foreground">
                    Источник
                    <ExternalLinkIcon size={12} />
                  </Link>
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  );
}
