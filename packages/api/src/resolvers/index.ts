import { NonEmptyArray } from "type-graphql";
import { UserResolver } from "./user/resolver";
import { FormatResolver } from "./format/resolver";
import { RequestResolver } from "./request/resolver";
import { MaterialResolver } from "./material/resolver";
import { TrainingResolver } from "./training/resolver";
import { FeedbackResolver } from "./feedback/resolver";
import { OrganizerResolver } from "./organizer/resolver";
import { TargetAudienceResolver } from "./target-audience/resolver";
import { CategoryResolver } from "./category/resolver";
import { OktaResolver } from "./okta/resolver";

export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
    FeedbackResolver,
    FormatResolver,
    MaterialResolver,
    OrganizerResolver,
    RequestResolver,
    TargetAudienceResolver,
    TrainingResolver,
    UserResolver,
    CategoryResolver,
    OktaResolver
];