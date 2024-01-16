"use client";
import { Textfield } from "@components/ui";
import { useAppDispatch } from "@utils/hooks";
import { setSearch } from "@utils/store";
import debounce from "lodash/debounce";
import { Search } from "lucide-react";
import { useCallback } from "react";

export const SearchInput = () => {
  const dispatch = useAppDispatch();
  const handleSearch = useCallback(
    debounce((value: string) => dispatch(setSearch(value)), 500),
    [],
  );

  return (
    <Textfield
      placeholder="Pesquisar pelo nome"
      onChange={(e) => handleSearch(e.target.value)}
      rightIcon={
        <div className="rounded-full bg-blue-500 p-2">
          <Search className="h-5 w-5 text-gray-1" />
        </div>
      }
    />
  );
};
