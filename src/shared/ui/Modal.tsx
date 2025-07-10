import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="relative w-[90%] max-w-xl bg-white  p-6 rounded-2xl shadow-lg animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-sky-700 text-xl hover:text-sky-500 transition cursor-pointer"
        >
          <IoMdClose />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};
