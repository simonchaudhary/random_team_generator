import { classNames } from '../utils/className';

interface InputProps {
  label?: string;
  type: React.InputHTMLAttributes<HTMLInputElement>['type'];
  placeholder?: string;
  value: React.InputHTMLAttributes<HTMLInputElement>['value'];
  onChange?: React.InputHTMLAttributes<HTMLInputElement>['onChange'];
  disabled?: boolean;
  error?: string;
  className?: string;
  name?: string;
  showLabel?: boolean;
  onBlur?: React.InputHTMLAttributes<HTMLInputElement>['onBlur'];
  ref?: React.Ref<HTMLInputElement>;
  readOnly?: boolean;
}

function Input(props: InputProps) {
  const {
    label,
    type,
    placeholder,
    value,
    onChange,
    disabled,
    error,
    name,
    ref,
    className,
    readOnly,
    onBlur,
    showLabel = true
  } = props;

  return (
    <div className="w-full">
      {showLabel && (
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}

      <input
        readOnly={readOnly}
        ref={ref}
        onBlur={onBlur}
        name={name}
        id={label}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={classNames(
          'border bg-gray-100 h-11 px-3 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full',
          {
            'border-none': disabled
          },
          className
        )}
      />

      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}

export default Input;
