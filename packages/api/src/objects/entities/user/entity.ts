import { ObjectType, Field } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, RelationId } from "typeorm";
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
    @ManyToOne(type => RoleEntity, role => role.id)
    @JoinColumn()
    public role: RoleEntity;
    // TODO: заменить nullable на дефолт в новой базе!!!
    @Column({ nullable: true })
    @RelationId((user: UserEntity) => user.role)
    public roleId: number;

    @Field(() => String, {
        nullable: true,
        description: "аватар пользователя"
    })
    @Column({ nullable: true })
    public photo: string;

    constructor(
        id: number,
        fullname: string,
        login: string,
        role: RoleEntity,
        photo: string | null
    ) {
        super();
        this.id = id;
        this.fullname = fullname;
        this.login = login;
        this.role = role;
        this.photo = photo;
    }
}
