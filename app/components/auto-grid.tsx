import { Loader2Icon } from "lucide-react";
import { useInView } from "motion/react";
import { useQueryState } from "nuqs";
import { type ReactNode, useEffect, useRef, useState } from "react";
import ArticleCard from "./article-card";


export default function ({ children }: { children: ReactNode }) {
  const [date] = useQueryState("date")

  const ref = useRef<HTMLDivElement>(null)

  const [articles, setArticles] = useState<any[]>([]);
  const [offset, setOffset] = useState<number>(0);

  const [isAll, setIsAll] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const inView = useInView(ref);

  const handleNewArticles = async () => {
    if (!inView) return;
    setLoading(true);
    try {
      const newOffset = offset + 16;

      const base = "https://api.yz13.ru/";
      const pathname = "v1/news";

      const url = new URL(pathname, base);

      const searchParams = url.searchParams

      searchParams.set("offset", String(newOffset));
      if (date) searchParams.set("date", date);

      const response = await fetch(url.toString())

      const articles = await response.json()

      const newArticles = articles ?? [];
      if (newArticles.length === 0) setIsAll(true);
      else {
        setOffset(newOffset);
        setArticles((prev) => [...prev, ...newArticles]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (inView) handleNewArticles();
  }, [inView, date]);
  return (
    <>
      {children}
      {
        articles.map((article: any) => {
          return <ArticleCard key={article.id} article={article} />
        })
      }
      {loading && (
        <div className="w-full py-6 col-span-full flex items-center gap-2 justify-center text-muted-foreground">
          <Loader2Icon size={18} className="animate-spin" />
          <span className="text-sm">Подгружаем новости...</span>
        </div>
      )}
      {isAll && (
        <div className="w-full col-span-full py-6 flex justify-center">
          <span className="text-sm text-muted-foreground">
            Вы дошли до конца списка
          </span>
        </div>
      )}
      {!isAll && <div ref={ref} className="w-full h-px" />}
    </>
  )
}
