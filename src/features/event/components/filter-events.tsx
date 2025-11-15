"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { FormSelect } from "@/components/form/form-select";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { categoryOptions } from "@/data/event-categories";
import { parseValidDate } from "@/lib/utils";
import { eventFilterKeys } from "../event-consts";
import { useMediaQuery } from "@/lib/hooks";
import { SearchIcon, Trash2Icon } from "lucide-react";
import { TooltipContainer } from "@/components/shared/tooltip-container";

export function FilterEvents() {
  const [params, setParams] = useSearchParams();
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const search = params.get(eventFilterKeys.search) ?? "";
  const category = params.get(eventFilterKeys.category) ?? "";
  const startDate = params.get(eventFilterKeys.startDate) ?? "";
  const endDate = params.get(eventFilterKeys.endDate) ?? "";

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);

    if (!value) next.delete(key);
    else next.set(key, value);

    next.set("page", "1");

    setParams(next);
  };

  const clearFilters = () => {
    const next = new URLSearchParams();
    setParams(next);
  };

  const filerProps = { search, category, startDate, endDate, clearFilters, updateParam, isMobile };
  if (isMobile) return <MobileFilter {...filerProps} />;
  return <DesktopFilter {...filerProps} />;
}

type TDesktopFilterProps = TFilterContentProps;
const DesktopFilter = (props: TDesktopFilterProps) => {
  return (
    <div className="border-b p-6">
      <FilterContent {...props} />
    </div>
  );
};

type TMobileFilterProps = TFilterContentProps;
const MobileFilter = (props: TMobileFilterProps) => {
  return (
    <div className="my-4 flex items-center justify-between border-b px-4 pb-2">
      <h2 className="font-title text-xl font-semibold">Events</h2>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="w-fit">Filters</Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>Filters for mobile screen</SheetDescription>
          </SheetHeader>
          <div className="px-4 pb-4">
            <FilterContent {...props} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

type TFilterContentProps = {
  search: string;
  category: string;
  startDate: string;
  endDate: string;
  isMobile: boolean;
  updateParam: (key: string, value: string) => void;
  clearFilters: () => void;
};

const FilterContent = ({ search, category, startDate, endDate, updateParam, clearFilters, isMobile }: TFilterContentProps) => {
  return (
    <section className="flex flex-col gap-4 lg:flex-row">
      <div className="flex flex-col gap-4 lg:flex-row">
        <SearchEventInput key={search} value={search} onChange={(value) => updateParam(eventFilterKeys.search, value)} />
        <FormSelect
          options={categoryOptions}
          value={category}
          onChange={(value: string) => updateParam(eventFilterKeys.category, value)}
          placeholder="Select any category"
        />
      </div>

      <div className="flex flex-col gap-4 lg:ml-auto lg:flex-row">
        <div className="flex-1">
          <DatePicker
            value={parseValidDate(startDate)}
            onChange={(date) => updateParam(eventFilterKeys.startDate, date?.toISOString() || "")}
            placeholder="Select start date"
          />
        </div>
        <div className="flex-1">
          <DatePicker
            value={parseValidDate(endDate)}
            onChange={(date) => updateParam(eventFilterKeys.endDate, date?.toISOString() || "")}
            placeholder="Select end date"
          />
        </div>
      </div>
      <TooltipContainer label="Clear Filter">
        <Button variant="destructive" onClick={clearFilters}>
          {!isMobile ? <Trash2Icon /> : "Clear Filter"}
        </Button>
      </TooltipContainer>
    </section>
  );
};

type TSearchEventInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const SearchEventInput = ({ value, onChange }: TSearchEventInputProps) => {
  const [intervalValue, setInternalValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (intervalValue === value) return;
      onChange(intervalValue);
    }, 500);
    return () => clearTimeout(handler);
  }, [intervalValue, onChange, value]);

  return (
    <div className="relative">
      <SearchIcon size={20} className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2" />
      <Input
        type="text"
        placeholder="Search by title..."
        className="w-full pl-10 lg:min-w-60"
        value={intervalValue}
        onChange={(e) => setInternalValue(e.target.value)}
      />
    </div>
  );
};
