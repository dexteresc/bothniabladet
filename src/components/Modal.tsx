// Modal

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
}

const Modal = ({ children, isOpen, onClose, title, className }: ModalProps) => {
  console.log(onClose);
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div className="fixed inset-0 bg-gray-900 opacity-50" onClick={onClose}></div>
          <div className="relative">
            <header>
              {title && <h1 className="text-2xl">{title}</h1>}
              {/* Close button */}
              <button className="absolute top-0 right-0 m-4" onClick={onClose}>
                <span className="material-icons">close</span>
              </button>
            </header>
            <main className={`${className} bg-white dark:bg-gray-700 rounded-lg px-2 pb-2 pt-4 z-50`}>
              {children}
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
