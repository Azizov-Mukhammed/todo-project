import React, { useCallback, useState } from "react";
import { IoMdAdd } from "react-icons/io";

interface InputPlusProps {
  onAdd: (title: string) => void;
  maxLength?: number;
}

export const InputPlus: React.FC<InputPlusProps> = ({
  onAdd,
  maxLength = 50,
}) => {
  const [inputValue, setInputValue] = useState("");
  const handleAdd = useCallback(() => {
    const trimmed = inputValue.trim();
    if (!trimmed || trimmed.length > maxLength) return;
    onAdd(trimmed);
    setInputValue("");
  }, [inputValue, onAdd, maxLength]);

  return (
    <div className="flex w-full gap-y-1 flex-col sm:flex-row mb-4">
      <input
        type="text"
        autoFocus
        maxLength={maxLength}
        placeholder="Add a new task..."
        className="flex-1 p-2.5 rounded sm:rounded-r-[0px] bg-slate-200 border border-gray-400"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAdd();
        }}
      />
      <button
        className="h-[48px] sm:w-[15%] w-full rounded sm:rounded-l-[0px] bg-sky-700 text-white text-3xl flex justify-center items-center cursor-pointer hover:bg-sky-500 transition-colors"
        onClick={handleAdd}
        aria-label="Add task"
      >
        <IoMdAdd />
      </button>
    </div>
  );
};
