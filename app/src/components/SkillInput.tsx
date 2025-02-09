import { classNames } from '../utils/className';

interface SkillInputProps {
  name?: string;
  options: number[];
  selectedValue: number | null;
  onChange?: (value: number) => void;
  error?: string;
  disabled?: boolean;
}

function SkillInput(props: SkillInputProps) {
  const { name, options, selectedValue, onChange, error, disabled } = props;

  return (
    <div>
      <div className="flex bg-gray-100 p-2 rounded-md space-x-2">
        {options.map((option) => (
          <label
            key={option}
            className={classNames(
              'select-none w-8 h-8 flex items-center justify-center  rounded-md font-bold cursor-pointer transition',
              {
                'bg-white hover:bg-blue-50 text-gray-500':
                  selectedValue !== option,
                'bg-blue-500 text-white': selectedValue === option
              }
            )}
          >
            <span>{option}</span>

            <input
              type="radio"
              name={name}
              value={option}
              checked={selectedValue === option}
              onChange={() => onChange?.(option)}
              className="hidden peer"
              disabled={disabled}
            />
          </label>
        ))}
      </div>

      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}

export default SkillInput;
