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

export type Material = {
  link: string;
};

export type AlertTypes = "success" | "info" | "warning" | "error";

export type Alert = {
  type: AlertTypes;
  message: string;
} | null;
