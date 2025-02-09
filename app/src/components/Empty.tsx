import { ReactElement } from 'react';

import { FaSadTear } from 'react-icons/fa';

import { classNames } from '../utils/className';

interface EmptyProps {
  message: string;
  icon?: ReactElement;
  className?: string;
  textClassName?: string;
}

function Empty(props: EmptyProps) {
  const {
    message,
    icon = <FaSadTear size={32} className="text-blue-400" />,
    className,
    textClassName
  } = props;

  return (
    <div
      className={classNames(
        'flex flex-col items-center justify-center h-full',
        className
      )}
    >
      {icon && <div className="mb-4">{icon}</div>}

      <p className={classNames('text-gray-400 text-center', textClassName)}>
        {message}
      </p>
    </div>
  );
}

export default Empty;
