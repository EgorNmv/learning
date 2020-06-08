import { ObjectType, Field } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, RelationId } from "typeorm";
import { User } from "./type";
import { RoleEntity } from "../role/entity";

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

    @Field(() => RoleEntity, {
        nullable: false,
        description: "роль пользователя"
    })
    @OneToOne(type => RoleEntity, role => role.id)
    @JoinColumn()
    public role: RoleEntity;

    @Column()
    @RelationId((user: UserEntity) => user.role)
    public roleId: number;

    constructor(
        id: number,
        fullname: string,
        login: string,
        role: RoleEntity
    ) {
        super();
        this.id = id;
        this.fullname = fullname;
        this.login = login;
        this.role = role;
    }
}
