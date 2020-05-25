import { ObjectType, Field } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { User } from "./type";

@Entity({ name: "User" })
@ObjectType({
    description: "Пользователь"
})
export class UserEntity extends BaseEntity implements User {
    @Field(() => Number, {
        nullable: false,
        description: "id пользователя"
    })
    @PrimaryGeneratedColumn()
    public id: number;

    @Field(() => String, {
        nullable: false,
        description: "имя пользователя"
    })
    @Column()
    public fullname: string;

    @Field(() => String, {
        nullable: false,
        description: "логин пользователя"
    })
    @Column()
    public login: string;

    constructor(
        id: number,
        fullname: string,
        login: string
    ) {
        super();
        this.id = id;
        this.fullname = fullname;
        this.login = login;
    }
}
