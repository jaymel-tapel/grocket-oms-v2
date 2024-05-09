import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

type Props = {
  label?: string;
  value: Date | null;
  onChange: (date: string) => void;
};

const CustomDatePicker = ({ label, value, onChange }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-gray-500 ml-0.5">{label}</span>
      <DatePicker
        selected={value}
        onChange={(date) => {
          onChange(dayjs(date).format("MM-DD-YYYY"));
        }}
        className="block w-full min-md:max-w-[12rem] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
      />
    </div>
  );
};

export default CustomDatePicker;
