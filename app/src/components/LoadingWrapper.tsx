import { ReactElement } from 'react';

import Empty from './Empty';
import Loading from './Loading';

interface LoadingWrapperProps {
  loading: boolean;
  length: number;
  emptyMessage: string;
  children?: ReactElement | ReactElement[];
  emptyIcon?: ReactElement;
  loadingClassName?: string;
  emptyClassName?: string;
  emptyTextClassName?: string;
}

function LoadingWrapper(props: LoadingWrapperProps) {
  const {
    emptyIcon,
    emptyMessage,
    loading,
    children,
    loadingClassName,
    emptyClassName,
    emptyTextClassName,
    length
  } = props;

  const isDataListEmpty = !length;
  const showEmptyMessage = !loading && isDataListEmpty;

  return (
    <>
      {showEmptyMessage && (
        <Empty
          message={emptyMessage}
          icon={emptyIcon}
          className={emptyClassName}
          textClassName={emptyTextClassName}
        />
      )}
      {!isDataListEmpty && !loading && children}

      {loading && <Loading className={loadingClassName} />}
    </>
  );
}

export default LoadingWrapper;
