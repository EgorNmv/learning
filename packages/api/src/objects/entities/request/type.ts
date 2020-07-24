import { User } from "../user/type";
import { Training } from "../training/type";

export interface Request {
    id: number;
    user: User;
    date: string;
    training: Training;
    userId: string;
    trainingId: number;
    status: number;
    deletedAt?: Date;
}