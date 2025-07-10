import React from "react";
import { useTodoStore } from "../entities/todo/model/store";
import { InputPlus } from "../entities/todo/ui/InputPlus";
import { InputTaskContainer } from "../entities/todo/features/InputTaskContainer";
import { FooterLogic } from "../entities/todo/features/FooterLogic";

export const Home: React.FC = () => {
    const createTask = useTodoStore(state => state.createTask)
    const tasks = useTodoStore(state => state.tasks)


  return (
  <article className="bg-white w-full max-w-[600px] mx-auto sm:min-w-[60vh] rounded-3xl px-4 sm:px-6 py-5 max-h-[90vh] flex flex-col ">
    <h1 className="text-2xl sm:text-4xl mb-4 text-center font-bold">To Do App</h1>

    <section className="pb-5 border-b border-gray-400 mb-5">
      <InputPlus onAdd={createTask} />
    </section>

    <section className="overflow-auto max-h-[400px] mb-5 px-1">
      {!tasks.length && <p className="text-center text-gray-500">There is no one task.</p>}
      {tasks.map((task) => (
        <InputTaskContainer key={task.id} id={task.id} />
      ))}
    </section>

    <section>
      <FooterLogic />
    </section>
  </article>
  );
};
