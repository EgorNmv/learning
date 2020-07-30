import { ObjectType, Field } from "type-graphql";
import { UserEntity } from "../user/entity";
import { TrainingEntity } from "../training/entity";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  RelationId,
  DeleteDateColumn,
} from "typeorm";
import { Request } from "./type";

@Entity({ name: "Request" })
@ObjectType({
  description: "Заявка на обучение",
})
export class RequestEntity extends BaseEntity implements Request {
  @Field(() => Number, {
    nullable: false,
    description: "id заявки",
  })
  @PrimaryGeneratedColumn()
  public id: number;

  @Field(() => UserEntity, {
    nullable: false,
    description: "пользователь, который отправил заявку",
  })
  // @ManyToOne(type => UserEntity, user => user.id)
  public user: UserEntity;

  @Field(() => String, {
    nullable: false,
    description: "id пользователя заявки в okta",
  })
  @Column()
  // @RelationId((request: RequestEntity) => request.user)
  public userId: string;

  @Field(() => String, {
    nullable: false,
    description: "дата подачи заявки на обучение",
  })
  @Column()
  public date: string;

  @Field(() => TrainingEntity, {
    nullable: false,
    description: "id обучния",
  })
  @ManyToOne((type) => TrainingEntity, (training) => training.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  public training: TrainingEntity;

  @Column()
  @RelationId((request: RequestEntity) => request.training)
  public trainingId: number;

  @Field(() => Number, {
    nullable: true,
    description: "статус запроса (0-ожидает, 1-принят, 2-отклонён)",
  })
  @Column({ default: 0 })
  public status: number;

  @DeleteDateColumn()
  public deletedAt: Date;

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
