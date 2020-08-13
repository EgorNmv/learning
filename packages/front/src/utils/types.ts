export type Category = {
  categoryId: number;
  description: string;
  label: string | null;
  id?: number; //for render correct number in table
};

export type Organizer = {
  organizerId: number;
  name: string;
  address: string;
  site: string;
  type: number;
  id?: number; //for render correct number in table
};

export type TargetAudience = {
  targetAudienceId: number;
  description: string;
  id?: number; //for render correct number in table
};

export type TrainingFormat = {
  trainingFormatId: number;
  description: string;
  id?: number; //for render correct number in table
};

export type User = {
  userId: number;
  fullname: string;
};

export type Event = {
  trainingId: number;
  name: string;
  start: string | null;
  end: string | null;
  isDateSet: boolean;
  listOfRequestsReviewsAndRecomends: number[];
  id?: number; //for render correct number in table
};

export type TrainingFormValues = {
  label: string | null;
  name: string;
  category: number;
  startDate: string | null;
  targetAudience: number;
  organizer: number;
  endDate: string | null;
  trainingFormat: number;
  tags?: string | null;
  description: string;
  countOfSeats: number | null;
  site: string | null;
  isDateSet: boolean;
};

export type Material = {
  link: string;
};

export type AlertTypes = "success" | "info" | "warning" | "error";

export type Alert = {
  type: AlertTypes;
  message: string;
} | null;
