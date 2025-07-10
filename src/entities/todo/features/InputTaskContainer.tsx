import { useCallback } from "react";
import { useTodoStore } from "../model/store";
import InputTask from "../ui/InputTask";

interface Props {
  id: string;
}

export const InputTaskContainer = ({ id }: Props) => {
  const removeTask = useTodoStore(state => state.removeTask)
  const doneTask = useTodoStore(state => state.doneTask)
  const updateTask = useTodoStore(state => state.updateTask)
  const task = useTodoStore((state) => state.tasks.find((t) => t.id === id));

  if (!task) return null;

  const handleEdit = useCallback((title:string) =>{
       updateTask(id, title); 
  },[id,updateTask])

  const handleDelete = useCallback(() =>{
       removeTask(id); 
  },[id,removeTask])

  const handleToggle = useCallback(() =>{
       doneTask(id); 
  },[id,doneTask])

  return (
    <InputTask
      id={id}
      title={task.title}
      done={task.done}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onToggle={handleToggle}
    />
  );
};
