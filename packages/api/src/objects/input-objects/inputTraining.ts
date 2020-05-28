import { Training } from "../entities/training/type";
import { Field, InputType } from "type-graphql";

@InputType()
export class InputTraining implements Omit<Training, "id" | "format" | "organizer" | "audience">{
    @Field()
    public name: string;

    @Field()
    public label: string;

    @Field()
    public description: string;

    @Field()
    public start: string;

    @Field()
    public end: string;

    @Field()
    public site: string;

    @Field()
    public formatId: number;

    @Field()
    public organizerId: number;

    @Field()
    public audienceId: number
}