import { InputType, Field } from "type-graphql";
import { Feedback } from "../entities/feedback/type";

@InputType()
export class InputFeedback
  implements Omit<Feedback, "id" | "user" | "training"> {
  @Field()
  type: number;

  @Field()
  date: string;

  @Field()
  text: string;

  @Field()
  userId: string;

  @Field()
  trainingId: number;

  @Field({ nullable: true })
  status: number;

  @Field({ nullable: true })
  rate: number;
}
