import { useState } from "react";
import { Modal } from "../../../shared/ui/Modal";

interface Props {
  done: number;
  total: number;
  onClearAll: () => void;
  onClearCompleted: () => void;
}

type modalMode = "all" | "completed" | "off";

export const FooterBlock = ({
  done,
  total,
  onClearAll,
  onClearCompleted,
}: Props) => {
  const [openModal, setOpenModal] = useState<modalMode>("off");
  const percent = total === 0 ? 0 : ((done / total) * 100).toFixed(0);

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4">
      {/* progress bar */}
      <div
        className="p-5 bg-sky-700 w-full flex items-center justify-center rounded-[5px] overflow-hidden
      text-white relative sm:w-1/2"
      >
        <span
          className="absolute bottom-0 left-0  bg-sky-900 h-full w-[50%] transition-all duration-400"
          style={{ width: `${percent}%` }}
        />
        <span className="relative z-10 text-sm sm:text-base flex">
          {done} of {total}
        </span>
      </div>

      {/*  buttons container  */}
      <div className="flex gap-2 text-white text-sm w-1/2">
        {/* delete all button */}
        <button
          onClick={() => setOpenModal("all")}
          className="p-2 bg-sky-700 rounded-sm w-1/2 hover:bg-sky-500 transition-colors cursor-pointer"
          aria-label="delete all todos"
        >
          Delete all
        </button>
        {/* delete completed button */}
        <button
          onClick={() => setOpenModal("completed")}
          className="p-2 bg-sky-700 rounded-sm w-1/2  hover:bg-sky-500 transition-colors cursor-pointer"
          aria-label="delete completed tasks"
          disabled={done === 0}
        >
          Delete completed tasks
        </button>
      </div>

      {/* modal */}
      {openModal !== "off" && (
        <Modal onClose={() => setOpenModal("off")}>
          <h2 className="text-center mb-4">
            {openModal === "all"
              ? "Are you sure you want to delete all tasks?"
              : "Are you sure you want to delete all completed tasks?"}
          </h2>
          <div className=" flex justify-center gap-6 text-white">
            <button
              className="p-2 bg-sky-700 rounded-sm hover:bg-sky-500 transition-colors cursor-pointer"
              onClick={() => setOpenModal("off")}
              aria-label="Close Modal"
            >
              cancel
            </button>
            <button
              className="p-2 bg-sky-700 rounded-sm hover:bg-sky-500 transition-colors cursor-pointer"
              aria-label="delete todos"
              onClick={() => {
                if (openModal === "all") {
                  onClearAll();
                  setOpenModal("off");
                  return;
                }
                onClearCompleted();
                setOpenModal("off");
              }}
            >
              delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};
