import React, { useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import { Modal } from "../../../shared/ui/Modal";

interface Props {
  id: string;
  title: string;
  done: boolean;
  onToggle: () => void;
  onEdit: (newTitle: string) => void;
  onDelete: () => void;
}
const InputTask = ({title, done, onEdit, onDelete, onToggle }: Props) => {

  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState(title);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleEdit = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    onEdit(trimmed);
    setIsEdit(false);
  };

  return (
    <div
      className={`flex flex-col sm:flex-row sm:justify-between justify-between bg-slate-200 mb-3 min-h-[56px] items-center px-3 rounded-[5px] shadow-md transition-all text-wrap  ${
        done ? "bg-slate-300 shadow-none" : ""
      }`}
    >
      <div className="flex gap-x-2 w-full sm:w-auto  overflow-hidden items-center">
        {/* checkbox */}
        <input
          type="checkbox"
          disabled={isEdit}
          checked={isEdit ? false : done}
          onChange={onToggle}
          className="w-5 h-5 sm:mt-0 shrink-0  accent-sky-700"
        />

        {/* edit input */}
        <div
          className={` py-1 w-full relative after:content-[''] after:absolute after:w-[0%] after:bottom-0 after:left-0 after:h-[1px] after:bg-gray-400 after:transition-discrete after:duration-1000 after:ease-out ${
            isEdit ? "after:w-full" : ""
          } `}
        >
          {isEdit ? (
            <div className="flex w-full ">
              <input
                type="text"
                className="w-full  border-gray-400 rounded-sm text-sm sm:text-base"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleEdit();
                  }
                }}
              />
            </div>
          ) : (
            <h3
              className={`${
                done ? "text-gray-600 line-through" : ""
              } break-words text-sm sm:text-base select-none `}
            >
              {title}
            </h3>
          )}
        </div>
      </div>

      {/* edit end remove buttons */}
      <div className="flex gap-1 text-sky-700 mt-3 sm:mt-0 sm:ml-4 justify-end ">
        {isEdit ? (
          // check
          <button
            className="p-2 cursor-pointer hover:text-sky-500 transition-colors"
            onClick={handleEdit}
            aria-label="save edited task"
            disabled={inputValue.trim().length === 0}
          >
            <IoMdCheckmark size={25} />
          </button>
        ) : (
          //  edit
          <button
            className="p-2 cursor-pointer hover:text-sky-500 transition-colors"
            aria-label="edit task"
            onClick={() => setIsEdit((prev) => !prev)}
          >
            <MdEdit size={25} />
          </button>
        )}
        {/* delete */}

        <button
          className="p-2 cursor-pointer hover:text-sky-500 transition-colors"
          aria-label="delete task"
          onClick={() => {
            setIsOpenModal(true);
          }}
        >
          <MdDelete size={"25px"} />
        </button>

        {/* modal */}
        {isOpenModal && (
          <Modal onClose={() => setIsOpenModal(false)}>
            <h2 className="text-center mb-4">
              Are you sure you want to delete this task?
            </h2>
            <div className=" flex justify-center gap-6 text-white">
              <button
                aria-label="Close Modal"
                className="p-2 bg-sky-700 rounded-sm hover:bg-sky-500 transition-colors"
                onClick={() => setIsOpenModal(false)}
              >
                Cancel
              </button>
              <button
                aria-label="delete todo"
                className="p-2 bg-sky-700 rounded-sm hover:bg-sky-500 transition-colors"
                onClick={() => {
                  onDelete();
                  setIsOpenModal(false);
                }}
              >
                Delete
              </button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default React.memo(InputTask);
