import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Role } from "./type";

@Entity({ name: "Role" })
@ObjectType({
    description: "Роли пользователей"
})
export class RoleEntity extends BaseEntity implements Role {
    @Field(() => Number, {
        nullable: false,
        description: "id роли"
    })
    @PrimaryGeneratedColumn()
    public id: number;

    @Field(() => String, {
        nullable: false,
        description: "описание роли"
    })
    @Column()
    public description: string;

    constructor(
        id: number,
        description: string
    ) {
        super();
        this.id = id;
        this.description = description;
    }
}