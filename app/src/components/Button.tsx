import message from '../languages/en';
import { classNames } from '../utils/className';

interface ButtonProps {
  label: string;
  type: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  isLoading?: boolean;
  className?: string;
}

function Button(props: ButtonProps) {
  const { label, type, onClick, isLoading, className } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={classNames(
        'w-fit max-w-[144px] h-11 whitespace-nowrap bg-blue-500 hover:bg-blue-700 text-white font-medium px-4 text-sm rounded-md',
        className
      )}
    >
      {isLoading ? message.TITLE.LOADING : label}
    </button>
  );
}

export default Button;
