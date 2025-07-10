import { create } from "zustand";
import { generateId } from "./helpers";
import { persist } from "zustand/middleware";
import type { IToDoStore } from "./types";

export const useTodoStore = create<IToDoStore>()(
    persist(
        (set, get) => ({
            tasks: [],
            createTask: (title) => {
                const { tasks } = get();
                const newTask = {
                    id: generateId(),
                    title,
                    createdAt: Date.now(),
                    done: false,
                }
                set({ tasks: [newTask, ...tasks] })

            },
            updateTask: (id, title) => {
                const { tasks } = get();
                set({
                    tasks: tasks.map((task) =>
                        task.id === id ? { ...task, title } : task
                    )
                })
            },
            removeTask: (id) => {
                const { tasks } = get();
                set({
                    tasks: tasks.filter((task) => task.id !== id)
                })

            },
            doneTask: (id) => {
                const { tasks } = get();
                set({
                    tasks: tasks.map((task) => ({ ...task, done: task.id === id ? !task.done : task.done }))
                })
            },
            removeAllTasks: () => {
                set({ tasks: [] })
            },
            removeDoneTasks: () => {
                const { tasks } = get();
                set({
                    tasks: tasks.filter((task) => !task.done)
                })
            }
        }),
        { name: "todo-storage" }
    ))