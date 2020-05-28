import { ObjectType, Field } from "type-graphql";
import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, RelationId } from "typeorm";
import { Feedback } from "./type";
import { UserEntity } from "../user/entity";
import { TrainingEntity } from "../training/entity";

@Entity({ name: "Feedback" })
@ObjectType({
    description: "Рекомендации и отзывы"
})
export class FeedbackEntity extends BaseEntity implements Feedback {
    @Field(() => Number, {
        nullable: false,
        description: "id отзыва"
    })
    @PrimaryGeneratedColumn()
    public id: number;

    @Field(() => UserEntity, {
        nullable: false,
        description: "пользователь, оставивиший отзыв"
    })
    @ManyToOne(type => UserEntity, user => user.id)
    @JoinColumn()
    public user: UserEntity;

    @Column()
    @RelationId((feedback: FeedbackEntity) => feedback.user)
    public userId: number;

    @Field(() => Number, {
        nullable: false,
        description: "тип(1-рекомендация, 2-отзыв)"
    })
    @Column()
    public type: number;

    @Field(() => TrainingEntity, {
        nullable: false,
        description: "курс, на который оставлен отзыв"
    })
    @ManyToOne(type => TrainingEntity, training => training.id)
    @JoinColumn()
    public training: TrainingEntity;

    @Column()
    @RelationId((feedback: FeedbackEntity) => feedback.training)
    public trainingId: number;

    @Field(() => String, {
        nullable: false,
        description: "дата предоставления фидбека"
    })
    @Column()
    public date: string;

    @Field(() => String, {
        nullable: false,
        description: "текст фидбека"
    })
    @Column()
    public text: string;

    constructor(
        id: number,
        user: UserEntity,
        type: number,
        training: TrainingEntity,
        date: string,
        text: string
    ) {
        super();
        this.id = id;
        this.user = user;
        this.type = type;
        this.training = training;
        this.date = date;
        this.text = text;
    }
}