// Modal

import { useEffect, ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
}

function Modal({ children, isOpen, onClose, title, className }: ModalProps) {
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);
  return isOpen ? (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-gray-900 opacity-50"
        onClick={onClose}
        onKeyDown={(e) => e.key === "esc" && onClose}
        role="none"
      />
      <div className="relative bg-white dark:bg-gray-700 rounded-lg px-2 pb-2 pt-4 z-50">
        <header className="mb-4 flex">
          {title && <h1 className="text-2xl mr-10">{title}</h1>}
          <button
            type="button"
            className="p-4"
            onClick={onClose}
          >
            <span className="material-icons">close</span>
          </button>
        </header>
        <main className={className}>{children}</main>
      </div>
    </div>
  ) : null;
}

export default Modal;
