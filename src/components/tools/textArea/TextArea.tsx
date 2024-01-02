import { forwardRef } from "react";

interface TextAreaProps {
  id: string;
  name: string;
  label: string;
  value?: string;
  rows?: number;
  className?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { id, name, label, value, rows = 3, className = "", placeholder, onChange },
    ref
  ) => {
    return (
      <div className="col-span-full">
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-black"
        >
          {label}
        </label>
        <div className="mt-2">
          <textarea
            id={id}
            name={name}
            rows={rows}
            className={`block w-full h-[197px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 ${className}`}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            ref={ref}
          />
        </div>
      </div>
    );
  }
);

export default TextArea;
