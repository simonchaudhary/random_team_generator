import message from '../languages/en';
import { interpolate } from '../utils/interpolate';

interface TableTitleProps {
  title: string;
  count?: number;
  isLoading?: boolean;
}

function TableTitle(props: TableTitleProps) {
  const { title, count, isLoading } = props;

  const subtitle = isLoading
    ? message.TITLE.LOADING
    : interpolate(message.OTHERS.SHOWING, {
        count: count || 0,
        title: title
      });

  return (
    <div className="border-b border-solid border-gray-200 py-4 px-4">
      <p className="text-sm text-gray-700 font-bold">{title}</p>

      <p className="text-xs text-gray-600">{subtitle}</p>
    </div>
  );
}

export default TableTitle;
