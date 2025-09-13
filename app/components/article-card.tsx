import { Skeleton } from "@yz13/ui/skeleton";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { ArrowRightIcon, ExternalLinkIcon } from "lucide-react";
import { Link } from "react-router";



type ArticleCardProps = {
  article: any
}

export const ArticleCardSkeleton = () => {
  return (
    <div className="space-y-3 py-4 gap-2 relative">
      <Skeleton className="w-full h-[28px]" />
      <Skeleton className="w-1/3 h-4" />
      <div className="flex items-center justify-between">
        <Skeleton className="w-1/4 h-4" />
        <Skeleton className="w-1/4 h-4" />
      </div>
    </div>
  )
}

export default function ({ article }: ArticleCardProps) {

  const title = article.title

  const author = article.author
  const publishedAt = parseISO(article.published_at)

  const image = article.img
  const imageUrl = image?.url

  const sourceLink = article.news_source?.url;
  const articleLink = article.url;
  return (
    <div className="space-y-3 py-4 gap-2 relative" key={article.id}>
      {/*{
        imageUrl
          ? <img src={imageUrl} className="md:w-36 w-full md:absolute relative md:-left-40 left-0 aspect-video rounded-lg object-cover" alt={title} />
          : <div className="md:w-36 w-full md:absolute relative md:flex hidden border md:-left-40 left-0 aspect-video rounded-lg object-cover  items-center justify-center">
            <ImageOffIcon size={24} className="text-muted-foreground" />
          </div>
      }*/}
      <div>
        <span className="text-lg font-medium text-pretty">{title}</span>
      </div>
      <span className="text-xs block text-muted-foreground capitalize">
        {formatDistanceToNow(publishedAt, { locale: ru, addSuffix: true })}
      </span>
      <div className="flex items-center gap-3">
        {
          author &&
          <span className="text-xs text-muted-foreground">{author}</span>
        }
        <Link
          to={sourceLink}
          target="_blank"
          className="text-xs hover:underline inline-flex items-center gap-1 text-muted-foreground"
        >
          Источник
          <ExternalLinkIcon size={12} />
        </Link>
        <Link
          to={articleLink}
          target="_blank"
          className="ml-auto text-xs hover:underline inline-flex items-center gap-1 text-muted-foreground"
        >
          Открыть
          <ArrowRightIcon size={12} />
        </Link>
      </div>
    </div>
  )
}
