// User interface
export interface User {
    id: string;
    name: string;
    password: string;
    email: string;
    token?: string
}


// Todo interface
export interface Todo extends Task {
    subTask: Task[]
}

interface Task {
    id: string;
    userId: string;
    title: string;
    completed: boolean;
}

export interface LoginFormValues {
    email: string;
    password: string;
}
export interface taskValues {
    task: string;
}

