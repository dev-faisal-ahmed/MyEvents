import { useSearchParams } from "react-router";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Button } from "../ui/button";

type PaginationProps = {
  totalPage: number;
};

export function Pagination({ totalPage }: PaginationProps) {
  const [params, setParams] = useSearchParams();
  const page = Number(params.get("page") || "1");

  const setPage = (newPage: number) => {
    const nextParams = new URLSearchParams(params);
    nextParams.set("page", newPage.toString());
    setParams(nextParams);
  };

  const makeRange = () => {
    const pages = new Set<number>();

    pages.add(1);
    pages.add(totalPage);

    for (let p = page - 1; p <= page + 1; p++) {
      if (p > 1 && p < totalPage) pages.add(p);
    }

    return [...pages].sort((a, b) => a - b);
  };

  const range = makeRange();

  return (
    <div className="flex items-center justify-center gap-2 border-t py-4">
      {/* PREV */}
      <Button variant="outline" onClick={() => setPage(page - 1)} disabled={page === 1}>
        <IoIosArrowBack />
      </Button>

      {/* PAGE NUMBERS WITH ELLIPSIS */}
      <div className="flex items-center gap-2 font-semibold">
        {range.map((p, i) => {
          const prev = range[i - 1];
          const needEllipsis = prev && p - prev > 1;

          return (
            <div key={p} className="flex items-center gap-2">
              {needEllipsis && <span className="px-2 text-gray-500">…</span>}
              <Button onClick={() => setPage(p)} variant={p === page ? "default" : "outline"}>
                {p}
              </Button>
            </div>
          );
        })}
      </div>

      {/* NEXT */}
      <Button variant="outline" onClick={() => setPage(page + 1)} disabled={page === totalPage}>
        <IoIosArrowForward />
      </Button>
    </div>
  );
}
