interface IsProps {
  id: string;
  label?: string;
  checked?: boolean;
  toggleChecked?: (id?: string) => void;
}

const NormalCheckBox: React.FC<IsProps> = ({
  id,
  label,
  checked,
  toggleChecked,
}) => {
  return (
    <div className="space-y-5">
      <div className="relative flex items-start gap-4">
        <div className="flex h-6 items-center">
          <input
            id={id}
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            checked={checked}
            onChange={() => toggleChecked && toggleChecked(id)}
          />
        </div>
        {label ? (
          <label htmlFor={id} className="font-medium text-gray-900">
            {label}
          </label>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default NormalCheckBox;
