export interface Task {
    id: string;
    title: string;
    createdAt: number;
    done: boolean;
}

export interface IToDoStore {
    tasks: Task[];
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void;
    doneTask: (id: string) => void;
    removeAllTasks: () => void;
    removeDoneTasks: () => void;
}