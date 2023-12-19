interface IsProps {
  id: string;
  label?: string;
  value?: string;
  name?: string;
  selected?: string;
  onChange?: (_selected: string) => void;
  defaultChecked?: boolean;
  className?: string;
}

const ClientsManagersFilter: React.FC<IsProps> = ({
  id,
  label,
  value,
  name = "",
  selected = "",
  onChange,
  defaultChecked = false,
  className = "",
}) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="check-box"
        value={value}
        name={name}
        defaultChecked={defaultChecked}
        checked={value === selected}
        onChange={(e) => (onChange ? onChange(e.target.value) : "")}
        className={`${className}h-4 w-4 focus:ring-green-500`}
      />
      <label
        htmlFor={id}
        className="ml-3 block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
    </div>
  );
};

export default ClientsManagersFilter;
