import { useTodoStore } from "../model/store";
import { FooterBlock } from "../ui/FooterBlock";

export const FooterLogic = () => {  
  const tasks = useTodoStore((state) => state.tasks);
  const removeAllTasks = useTodoStore((state) => state.removeAllTasks);
  const removeDoneTasks = useTodoStore((state) => state.removeDoneTasks);

  const done = tasks.filter((t) => t.done).length;

  return (
    <FooterBlock
      done={done}
      total={tasks.length}
      onClearAll={removeAllTasks}
      onClearCompleted={removeDoneTasks}
    />
  );
};
