import { InputType, Field } from "type-graphql";
import { Organizer } from "../entities/oraganizer/type";

@InputType()
export class InputOrganizer implements Omit<Organizer, "id" | "deletedAt"> {
  @Field()
  public name: string;

  @Field()
  public address: string;

  @Field({ nullable: true })
  public site: string;

  @Field()
  public type: number;

  @Field({ nullable: true })
  public contactInfo: string;

  @Field({ nullable: true })
  public speaker: string;
}
