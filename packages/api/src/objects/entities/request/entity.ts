import { ObjectType, Field } from "type-graphql";
import { UserEntity } from "../user/entity";
import { TrainingEntity } from "../training/entity";
import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Request } from "./type";

@Entity({ name: "Request" })
@ObjectType({
    description: "Заявка на обучение",
})
export class RequestEntity extends BaseEntity implements Request {
    @Field(() => Number, {
        nullable: false,
        description: "id заявки"
    })
    @PrimaryGeneratedColumn()
    public id: number;

    @Field(() => UserEntity, {
        nullable: false,
        description: "пользователь, который отправил заявку"
    })
    @ManyToOne(type => UserEntity)
    public user: UserEntity;

    @Field(() => String, {
        nullable: false,
        description: "дата подачи заявки на обучение"
    })
    public date: string;

    @Field(() => TrainingEntity, {
        nullable: false,
        description: "id обучния"
    })
    @ManyToMany(type => TrainingEntity)
    @JoinTable()
    public training: TrainingEntity;

    constructor(
        id: number,
        user: UserEntity,
        date: string,
        training: TrainingEntity
    ) {
        super();
        this.id = id;
        this.user = user;
        this.date = date;
        this.training = training;
    }
}