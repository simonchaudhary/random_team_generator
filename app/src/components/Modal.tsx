import React from 'react';
import ReactModal from 'react-modal';

import { classNames } from '../utils/className';

ReactModal.setAppElement('#root');

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

function Modal(props: ModalProps) {
  const { isOpen, onClose, title, children, className } = props;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal"
      className={classNames(
        'outline-none bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6 relative',
        className
      )}
      overlayClassName="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-200 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {title && (
        <h2 className="text-lg font-bold text-gray-800 mb-4">{title}</h2>
      )}

      <div className="text-gray-700">{children}</div>
    </ReactModal>
  );
}

export default Modal;
