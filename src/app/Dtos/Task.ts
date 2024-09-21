export interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    status: 'incomplete' | 'complete';
    userid:number;
    
}

export interface TaskList {
    taskId: number;
    title: string;
    description: string;
    //dueDate: Date; // You might want to use Date type, but keeping it as string for simplicity.
    status: 'incomplete' | 'complete'; // Assuming status can only be these two values.
    createdAt: string; // Same note about using Date type.
    updatedAt: string; // Same note about using Date type.
    userId: number;
}