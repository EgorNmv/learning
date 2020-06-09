import { Role } from "../role/type";

export interface User {
    id: number;
    fullname: string;
    login: string;
    role: Role;
    roleId: number;
    photo: string;
}