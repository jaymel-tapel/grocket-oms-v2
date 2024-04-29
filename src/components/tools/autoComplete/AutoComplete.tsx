import React, { InputHTMLAttributes, useState } from "react";
import { cn } from "../../../utils/utils";

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

  // const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const onChange = (e) => {
    // const userInput = e.target.value;

    // Filter our suggestions that don't contain the user's input
    // const unLinked = suggestions.filter(
    //   (suggestion) =>
    //     suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    // );

    // setFilteredSuggestions(unLinked);
    setActiveSuggestionIndex(0);

    if (handleChange) {
      handleChange(e.target.value);
    }
  };

  const onClick = (e) => {
    // setFilteredSuggestions([]);
    setActiveSuggestionIndex(0);
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
      setActiveSuggestionIndex(0);

      if (handleSelect) {
        handleSelect(suggestions[activeSuggestionIndex]);
      }
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
      if (activeSuggestionIndex - 1 === suggestions.length) {
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
        <ul className="absolute z-10 left-0 right-0 max-h-48 overflow-auto border border-gray-300 bg-white">
          {suggestions.map((suggestion, index) => {
            let className;
            // Flag the active suggestion with a class
            if (index === activeSuggestionIndex) {
              className = "p-2 bg-grBlue-light text-white";
            } else {
              className = "p-2";
            }
            return (
              <li
                className={className}
                key={`${suggestion}-${index}`}
                onClick={onClick}
              >
                {suggestion}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
