import { EntitySchema } from "typeorm";
import { FeedbackEntity } from "./feedback/entity";
import { FormatEntity } from "./format/entity";
import { MaterialEntity } from "./material/entity";
import { OrganizerEntity } from "./oraganizer/entity";
import { RequestEntity } from "./request/entity";
import { TargetAudienceEntity } from "./target-audience/entity";
import { TrainingEntity } from "./training/entity";
import { UserEntity } from "./user/entity";

export const entities: (string | Function | EntitySchema<any>)[] = [
    FeedbackEntity,
    FormatEntity,
    MaterialEntity,
    OrganizerEntity,
    RequestEntity,
    TargetAudienceEntity,
    TrainingEntity,
    UserEntity
];