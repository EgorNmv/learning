export type Category = {
  categoryId: number;
  description: string;
  label: string | null;
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
  listOfRequestsReviewsAndRecomends: number[];
};

export type TrainingFormValues = {
  label: string | null;
  name: string;
  category: number;
  startDate: string;
  targetAudience: number;
  organizer: number;
  endDate: string;
  trainingFormat: number;
  tags?: string | null;
  description: string;
  countOfSeats: number | null;
  site: string | null;
};

export type Material = {
  link: string;
};

export type AlertTypes = "success" | "info" | "warning" | "error";

export type Alert = {
  type: AlertTypes;
  message: string;
} | null;
