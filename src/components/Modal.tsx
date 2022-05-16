// Modal

import { useEffect, ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

function Modal({ children, isOpen, onClose, className }: ModalProps) {
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
        <button type="button" className="p-4 absolute right-1 top-1" onClick={onClose}>
          <span className="material-icons">close</span>
        </button>
        <div className={className}>{children}</div>
      </div>
    </div>
  ) : null;
}

export default Modal;
