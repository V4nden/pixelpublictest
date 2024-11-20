"use client";
import React, {
  ComponentPropsWithoutRef,
  isValidElement,
  ReactNode,
  useMemo,
  useRef,
  useState,
} from "react";
import useSwitch from "../../utils/useSwitch";
import classNames from "classnames";

import { renderToString } from "react-dom/server";
import useDebounce from "../../utils/useDebounce";
interface SelectOption<T> {
  display: ReactNode;
  value: T;
}

interface SelectProps<T>
  extends Omit<ComponentPropsWithoutRef<"div">, "onChange"> {
  className?: string;
  clearOnChange?: boolean;
  options: SelectOption<T>[];
  initialValue?: SelectOption<T>;
  onChange: (value: T) => void;
}

const Select = <T,>({
  onChange,
  options,
  clearOnChange,
  initialValue,
  className,
  ...rest
}: SelectProps<T>) => {
  const [selected, setSelected] = useState<SelectOption<T> | null>(
    initialValue ? initialValue : null
  );
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [opened, switchOpened] = useSwitch(false);

  const searchRef = useRef<HTMLInputElement>(null);

  function textContentReact(node: ReactNode): string {
    try {
      const div = document.createElement("div");
      if (!div) return "";
      div.innerHTML = renderToString(node);
      return String(div.textContent);
    } catch {
      return "";
    }
  }

  const filterOptionsBySearch = useMemo(() => {
    return options
      .filter((option) => {
        return textContentReact(option.display)
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase());
      })
      .slice(0, 20);
  }, [options, debouncedSearch]);

  return (
    <div className={classNames("relative w-full", className)} {...rest}>
      {selected ? (
        <div
          className="active border p-4 cursor-pointer"
          onClick={() => {
            setSelected(null);
            switchOpened();

            setTimeout(() => {
              searchRef.current && searchRef.current.focus();
            });
          }}
        >
          {selected.display}
        </div>
      ) : (
        <div className="active border p-4 w-full flex gap-4 items-center cursor-pointer">
          <input
            ref={searchRef}
            className="outline-none bg-text/0 w-full"
            placeholder="Выбрать из..."
            value={search}
            disabled={options.length === 0}
            onChange={(e) => {
              setSearch(e.currentTarget.value);
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                e.preventDefault();
                if (filterOptionsBySearch.length > 0) {
                  onChange(filterOptionsBySearch[0].value);
                  !clearOnChange && setSelected(filterOptionsBySearch[0]);
                  switchOpened(false);
                }
              }
            }}
            onFocus={(e) => {
              switchOpened(true);
            }}
            onBlur={(e) => {
              switchOpened(false);
            }}
          />
        </div>
      )}

      <div
        className={classNames(
          "absolute top-full active border px-4 py-2 my-2 flex flex-col max-h-72 overflow-y-scroll scrollbar-hide w-full transition-all ease-out z-10",
          { "opacity-0 pointer-events-none": !opened }
        )}
      >
        {filterOptionsBySearch.map((option, index, arr) => {
          return (
            <React.Fragment key={JSON.stringify(option.value)}>
              <button
                className="text-left my-4"
                onMouseDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();

                  onChange(option.value);

                  !clearOnChange && setSelected(option);
                  clearOnChange && searchRef.current?.blur();

                  switchOpened();
                }}
              >
                {option.display}
              </button>
              {index != arr.length - 1 && <hr className="active" />}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Select;
