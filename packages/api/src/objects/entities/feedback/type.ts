import { User } from "../user/type";
import { Training } from "../training/type";

export interface Feedback {
  id: number;
  user: User;
  type: number;
  training: Training;
  date: string;
  text: string;
  userId: string;
  trainingId: number;
  status: number;
  rate: number;
  deletedAt?: Date;
}
