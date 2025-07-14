import { Button } from "@yz13/ui/button";
import { Calendar } from "@yz13/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@yz13/ui/popover";
import { format, isFuture } from "date-fns";
import { ru } from "date-fns/locale";
import { parseAsIsoDate, useQueryState } from "nuqs";

export default function () {
  const [date, setDate] = useQueryState("date", { ...parseAsIsoDate, shallow: false })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="capitalize">
          {format(date ?? new Date(), "EEEE,  d MMMM yyyy", { locale: ru })}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Calendar
          mode="single"
          selected={date ?? new Date()}
          onSelect={date => setDate(date ?? null)}
          locale={ru}
          className="w-full"
          disabled={date => isFuture(date)}
        />
      </PopoverContent>
    </Popover>
  )
}
