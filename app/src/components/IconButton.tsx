import { ReactElement } from 'react';

import { classNames } from '../utils/className';

interface IconButtonProps {
  icon: ReactElement;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

function IconButton(props: IconButtonProps) {
  const { icon, onClick, className, disabled, ariaLabel } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={classNames(
        'flex items-center justify-center w-10 h-10 rounded-full transition duration-200 text-gray-600 hover:text-gray-800 hover:bg-gray-100',
        {
          'opacity-50 cursor-not-allowed': disabled
        },
        className
      )}
    >
      {icon}
    </button>
  );
}

export default IconButton;
