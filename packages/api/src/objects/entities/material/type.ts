import { Training } from "../training/type";

export interface Material {
  id: number;
  training: Training;
  link: string;
  trainingId: number;
  deletedAt: Date;
  originName: string;
  createdAt: Date;
}
