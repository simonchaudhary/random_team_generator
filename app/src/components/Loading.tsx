import message from '../languages/en';
import { classNames } from '../utils/className';

interface LoadingProps {
  className?: string;
}

function Loading(props: LoadingProps) {
  const { className } = props;

  return (
    <div
      className={classNames(
        'flex items-center justify-center h-full',
        className
      )}
    >
      <span className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 animate-[move-gradient_0.5s_infinite]">
        {message.TITLE.LOADING}
      </span>
    </div>
  );
}

export default Loading;
