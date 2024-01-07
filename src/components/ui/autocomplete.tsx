import { FC, useCallback, useEffect, useState } from "react";

import { Combobox } from "@headlessui/react";
import debounce from "lodash/debounce";
import { v4 } from "uuid";

import { cn } from "@utils/utils";
import { ComponentProps, ReactNode } from "react";
import { Textfield, TextfieldProps } from ".";

export type AutocompleteProps = {
  options?: any[];
  value?: any;
  onChange?: (value: any) => void;
  getOptionLabel?: (option: any) => string;
  label?: string;
  renderInput?: (props: any) => ReactNode;
  placeholder?: string;
  renderOption?: (option: any) => ReactNode;

  emptyMessage?: string | ReactNode;

  onSearch?: (query: string) => void;
  ms?: number;

  disabled?: boolean;

  classNameOptions?: string;
  classNameList?: string;

  inputProps?: TextfieldProps;
} & Omit<ComponentProps<"div">, "children">;

export const Autocomplete: FC<AutocompleteProps> = ({
  options,
  inputProps,
  getOptionLabel = (option) => option,
  renderInput = (props) => (
    <Textfield placeholder={placeholder} {...props} {...inputProps} />
  ),
  onChange,
  value: valueProp,
  placeholder = "Selecione uma opção",
  classNameOptions = "hover:bg-gray-4 gap-2 px-3 h-10 w-full text-md text-gray-12 flex items-center",
  classNameList = "bg-white rounded-2xl shadow-button border border-solid border-gray-3 w-[85%] p-2 ",
  renderOption = (option) => getOptionLabel(option),
  label,
  ms = 500,
  emptyMessage = "Nenhum resultado encontrado",
  onSearch,
  id = `autocomplete-${v4()}`,
}) => {
  const [localValue, setLocalValue] = useState(valueProp);
  Autocomplete;
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const [filteredOptions, setFilteredOptions] = useState(options ?? []);

  const onClose = debounce(() => setOpen(false), 250);

  const handleSearch = useCallback(
    debounce((value: string) => {
      onSearch?.(value);
    }, ms),
    [ms, onSearch],
  );

  const handleChange = useCallback(
    (value: string) => {
      setQuery(value);

      if (onSearch) {
        handleSearch(value);
        return;
      }

      if (!value || value === "") {
        setFilteredOptions(options);
        return;
      }

      setFilteredOptions(
        options?.filter((option) =>
          getOptionLabel(option).toLowerCase().startsWith(value.toLowerCase()),
        ) ?? [],
      );
    },
    [filteredOptions, options, query, onSearch, handleSearch, renderInput],
  );

  useEffect(() => {
    setLocalValue(valueProp);
  }, [valueProp]);

  useEffect(() => setFilteredOptions(options), [options]);

  return (
    <>
      {label && (
        <label htmlFor={id} className="text-body font-medium text-gray-12">
          {label}
        </label>
      )}
      <Combobox
        value={localValue ? getOptionLabel(localValue) : ""}
        onChange={(value) => {
          onChange?.(value);
          setLocalValue(value);
          setOpen(false);
        }}
      >
        {renderInput({
          onChange: (event: any) => {
            setLocalValue(undefined);
            handleChange(event.currentTarget.value);
          },
          placeholder,
          onBlur: () => onClose(),
          onFocus: () => setOpen(true),
          role: "combobox",
          id,
          "aria-expanded": open,
          value: localValue ? getOptionLabel(localValue) : query,
        })}
        <Combobox.Options
          static={open}
          className={cn(
            " max-h-[20dvh] w-full list-none overflow-y-scroll",
            classNameList,
          )}
        >
          {filteredOptions?.length === 0 ? (
            <li className="min-h-10 px-3 py-2 text-center font-semibold text-gray-10">
              {emptyMessage}
            </li>
          ) : (
            filteredOptions?.map((option) => (
              <Combobox.Option
                id={`autocomplete-option-${v4()}`}
                disabled={option?.disabled}
                value={option}
                className={cn("cursor-pointer", classNameOptions)}
              >
                {renderOption(option)}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </Combobox>
    </>
  );
};
