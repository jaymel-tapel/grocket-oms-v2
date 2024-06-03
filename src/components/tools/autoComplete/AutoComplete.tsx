import React, { InputHTMLAttributes, useState } from "react";
import { cn } from "../../../utils/utils";
import { useVirtualizer } from "@tanstack/react-virtual";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  suggestions: string[];
  className?: string;
  handleChange?: (value: string) => void;
  handleSelect?: (value: string) => void;
};

const AutoComplete: React.FC<Props> = (props) => {
  const {
    handleChange,
    handleSelect,
    suggestions,
    className = "",
    ...inputProps
  } = props;

  const [filteredSuggestions, setFilteredSuggestions] =
    useState<string[]>(suggestions);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const parentRef = React.useRef(null);
  const virtualizer = useVirtualizer({
    count: filteredSuggestions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 41.6,
    overscan: 100,
  });

  const virtualOptions = virtualizer.getVirtualItems();
  const value = props.value as string;

  React.useEffect(() => {
    setFilteredSuggestions(
      suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes((value ?? "").toLowerCase() ?? [])
      )
    );
  }, [suggestions, value]);

  const onChange = (e) => {
    setShowSuggestions(true);
    setActiveSuggestionIndex(0);

    if (handleChange) {
      handleChange(e.target.value);
    }
  };

  const onClick = (e) => {
    setShowSuggestions(false);

    if (handleSelect) {
      handleSelect(e.currentTarget.innerText);
    }
  };

  const onKeyDown = (e) => {
    // User pressed the enter key
    if (e.keyCode === 13) {
      e.preventDefault();
      setShowSuggestions(false);

      if (handleSelect) {
        handleSelect(filteredSuggestions[activeSuggestionIndex]);
      }
      setActiveSuggestionIndex(0);
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestionIndex === 0) {
        return;
      }
      setActiveSuggestionIndex(activeSuggestionIndex - 1);
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestionIndex === filteredSuggestions.length - 1) {
        return;
      }
      setActiveSuggestionIndex(activeSuggestionIndex + 1);
    }
  };

  return (
    <div className="w-full relative">
      <input
        {...inputProps}
        autoComplete="off"
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={async () => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          setShowSuggestions(false);
        }}
        onFocus={async () => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          setShowSuggestions(true);
        }}
        className={cn(
          "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6",
          className
        )}
      />
      {showSuggestions && (
        <ul
          ref={parentRef}
          className="absolute z-10 left-0 right-0 max-h-48 overflow-auto border border-gray-300 bg-white"
          style={{
            height: `${virtualizer.getTotalSize()}px`,
          }}
        >
          {virtualOptions.map((virtualOption, index) => {
            let className = "p-2 truncate";

            // Flag the active suggestion with a class
            if (index === activeSuggestionIndex) {
              className = "p-2 truncate bg-grBlue-light text-white";
            }

            return (
              <li
                className={className}
                key={`${filteredSuggestions[virtualOption.index]}-${index}`}
                onClick={onClick}
                style={{
                  height: `${virtualOption.size}px`,
                  // transform: `translateY(${virtualOption.start}px)`,
                }}
              >
                {filteredSuggestions[virtualOption.index]}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
