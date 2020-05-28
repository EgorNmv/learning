import { InputType, Field } from "type-graphql";
import { Organizer } from "../entities/oraganizer/type";

@InputType()
export class InputOrganizer implements Omit<Organizer, "id"> {
    @Field()
    public name: string;

    @Field()
    public address: string;

    @Field()
    public site: string;

    @Field()
    public type: number;
}