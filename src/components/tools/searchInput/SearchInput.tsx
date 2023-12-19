import { ChangeEvent } from "react";
import { SmallMagnifyingIcon } from "../svg/DashboardInboxLogos";
// import style from "./TextInputSearch.module.scss";

// const { container: containerStyle } = style;

interface IsProps {
  label?: string;
  labelColor?: string;
  id?: string;
  type?: "text" | "password" | "email";
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  hideLabel?: boolean;
  className?: string;
  disabled?: boolean;
}

const SearchInput: React.FC<IsProps> = ({
  label = "sample label",
  labelColor = "text-white",
  id,
  type = "text",
  value = "",
  onChange = () => "",
  placeholder = "",
  hideLabel = true,
  className = "",
  disabled = false,
}) => {
  // const [focus, setFocus] = useState<boolean>(false);

  return (
    <div className={`${className}  relative`}>
      {!hideLabel && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium leading-6 ${labelColor} ${
            disabled ? "pointer-events-none" : ""
          }`}
        >
          {label}
        </label>
      )}
      <div className={`${!hideLabel && "mt-2"} relative`}>
        <input
          placeholder={placeholder}
          id={id}
          type={type}
          value={value || ""}
          onChange={onChange}
          required
          aria-label={label}
          // onFocus={() => setFocus(true)}
          // onBlur={() => setFocus(false)}
          className={`block w-full pl-10 rounded-md border-0 h-10 text-lg shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none  ${
            disabled
              ? "pointer-events-none bg-gray-100 text-gray-400"
              : "focus:ring-nextOrange-base"
          }`}
        />
        {/* <span
          data-is-icon
          className={`--mask-icon bg-[#9CA3AF] h-5 w-5 absolute block top-[.6rem] left-3 ${
            focus ? "bg-nextOrange-base" : ""
          }`}
        ></span> */}
        <span className="h-5 w-5 absolute block top-[.7rem] left-3">
          {SmallMagnifyingIcon}
        </span>
      </div>
    </div>
  );
};

export default SearchInput;
