import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Category } from "./type";

@Entity({ name: "Category" })
@ObjectType({
    description: "Категория обучения"
})
export class CategoryEntity extends BaseEntity implements Category {
    @Field(() => Number, {
        nullable: false,
        description: "id категории"
    })
    @PrimaryGeneratedColumn()
    public id: number;

    @Field(() => String, {
        nullable: false,
        description: "описание категории"
    })
    @Column()
    public description: string;

    constructor(
        id: number,
        description: string,
    ) {
        super();
        this.id = id;
        this.description = description;
    }
}