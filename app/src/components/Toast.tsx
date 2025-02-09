import { ToastContainer, toast } from 'react-toastify';

import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle
} from 'react-icons/fa';

import 'react-toastify/dist/ReactToastify.css';

import { classNames } from '../utils/className';

const ICON_SIZE = 20;

type StatusType = 'success' | 'warning' | 'danger';

interface CustomToastProps {
  statusType: StatusType;
  toastMessage: { title: string; message: string };
  toastClassName?: string;
}

const toasts = {
  danger: {
    className: 'danger',
    icon: <FaTimesCircle size={ICON_SIZE} />
  },
  success: {
    className: 'success',
    icon: <FaCheckCircle size={ICON_SIZE} />
  },
  warning: {
    className: 'warning',
    icon: <FaExclamationCircle size={ICON_SIZE} />
  }
};

function CustomToast({
  statusType,
  toastMessage,
  toastClassName
}: CustomToastProps) {
  const toastType = toasts[statusType];

  return (
    <div>
      {toastType && toastType !== undefined && (
        <div
          className={classNames(
            'flex items-center bg-green-600 text-white py-4 px-4 w-full rounded',
            {
              'bg-red-500': toastType.className === 'danger',
              'bg-yellow-500': toastType.className === 'warning'
            },
            toastClassName
          )}
        >
          <div className="self-start leading-0">{toastType.icon}</div>
          <div className="ml-4 text-left">
            <span className="font-bold leading-5 mb-1 capitalize">
              {toastMessage.title}
            </span>
            <p className="mt-1">{toastMessage.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}

interface NotifyProps {
  autoClose?: number;
  className?: string;
  data: { title: string; message: string };
  draggable?: boolean;
  type: StatusType;
}

export const notify = (props: NotifyProps) => {
  const { autoClose = 1000, data, draggable = false, type } = props;

  // Toast message not showing
  toast(<CustomToast statusType={type} toastMessage={data} />, {
    autoClose,
    closeButton: false,
    draggable,
    hideProgressBar: true,
    progressClassName: 'bg-white'
  });
};

export default function Toast() {
  return <ToastContainer className="toast__container" />;
}
