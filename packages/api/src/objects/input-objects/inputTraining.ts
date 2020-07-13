import { Training } from "../entities/training/type";
import { Field, InputType } from "type-graphql";

@InputType()
export class InputTraining
  implements
    Omit<
      Training,
      | "id"
      | "format"
      | "organizer"
      | "audience"
      | "category"
      | "createDate"
      | "listOfRequestsReviewsAndRecomends"
    > {
  @Field()
  public name: string;

  @Field({ nullable: true })
  public label: string;

  @Field()
  public description: string;

  @Field()
  public start: string;

  @Field()
  public end: string;

  @Field({ nullable: true })
  public site: string;

  @Field()
  public formatId: number;

  @Field()
  public organizerId: number;

  @Field()
  public audienceId: number;

  @Field()
  public categoryId: number;

  @Field({ nullable: true })
  public numberOfParticipants: number;
}
