import { BsCalendar3EventFill } from "react-icons/bs";

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <BsCalendar3EventFill className="text-primary text-xl sm:text-2xl" />
      <span className="text-foreground font-title text-xl font-semibold sm:text-3xl">MyEvents</span>
    </div>
  );
}
