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

export type Event = {
  trainingId: number;
  name: string;
  start: string;
  end: string;
};

export type TrainingFormValues = {
  label: string | undefined;
  name: string | undefined;
  category: number | undefined;
  startDate: string | undefined;
  targetAudience: number | undefined;
  organizer: number | undefined;
  endDate: string | undefined;
  trainingFormat: number | undefined;
  tags?: string | undefined;
  description: string | undefined;
  countOfSeats?: number | undefined;
};
