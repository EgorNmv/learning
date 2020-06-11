export type Category = {
  categoryId: number;
  description: string;
};

export type Organizer = {
  organizerId: number;
  name: string;
  address: string;
  site: string;
  type: number;
};

export type TargetAudience = {
  targetAudienceId: number;
  description: string;
};

export type TrainingFormat = {
  trainingFormatId: number;
  description: string;
};

export type User = {
  userId: number;
  fullname: string;
};
