import { Format } from "../format/type";
import { Organizer } from "../oraganizer/type";
import { TargetAudience } from "../target-audience/type";
import { Category } from "../category/type";

export interface Training {
  id: number;
  label: string;
  name: string;
  description: string;
  format: Format;
  organizer: Organizer;
  start: string;
  end: string;
  audience: TargetAudience;
  site: string;
  formatId: number;
  organizerId: number;
  audienceId: number;
  category: Category;
  categoryId: number;
  createDate: string;
  listOfRequestsReviewsAndRecomends: number[];
  numberOfParticipants: number;
  deletedAt: Date;
  isDateSet: boolean;
  averageRating: number;
}
