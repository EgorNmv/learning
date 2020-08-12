import { Training } from "../training/type";

export interface Request {
  id: number;
  date: string;
  training: Training;
  userId: string;
  trainingId: number;
  status: number;
  deletedAt?: Date;
}
