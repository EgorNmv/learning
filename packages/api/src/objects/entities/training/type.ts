import { Format } from "../format/type";
import { Organizer } from "../oraganizer/type";
import { TargetAudience } from "../target-audience/type";

export interface Training {
    id: number;
    label: string;
    name: string;
    description: string;
    format: Format;
    organizer: Organizer;
    start: string;
    end: string;
    audience: TargetAudience[];
    site: string;
}