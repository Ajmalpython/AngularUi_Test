export interface ApiResponse<T> {
    message: string;
    data: T[];
}

export interface User {
    userid: number;
    name: string;
    email: string;
    password: string; // Consider removing this for security reasons
    userType: string | null;
    userTasks: any[];
}

export interface UserWithDisplayName {
    userid: number;
    Name: string;  // Use capital "N" for this property
    email: string;
}
