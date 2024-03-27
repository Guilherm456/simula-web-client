"use client";
import { Textfield } from "@components/ui/";
import debounce from "lodash/debounce";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useCallback } from "react";

type Props = {
  placeholder: string;
};

export const SearchInput: FC<Props> = ({
  placeholder = "Pesquisar pelo nome",
}) => {
  const router = useRouter();

  const pathName = usePathname();

  const queries = useSearchParams();

  const handleSearch = useCallback(
    debounce((value: string) => {
      const query = new URLSearchParams(queries);
      if (value) query.set("search", value);
      else query.delete("search");
      router.replace(`${pathName}?${query.toString()}`);
    }, 500),
    [queries],
  );

  return (
    <Textfield
      placeholder={placeholder}
      defaultValue={(queries.get("search") as string) ?? ""}
      onChange={(e) => handleSearch(e.target.value)}
      rightIcon={
        <div className="rounded-full bg-blue-500 p-2">
          <Search className="h-5 w-5 text-gray-1" />
        </div>
      }
    />
  );
};
