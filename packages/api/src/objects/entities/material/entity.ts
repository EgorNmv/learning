import { ObjectType, Field } from "type-graphql";
import { TrainingEntity } from "../training/entity";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  JoinColumn,
  Column,
  RelationId,
  ManyToOne,
  DeleteDateColumn,
  CreateDateColumn,
} from "typeorm";
import { Material } from "./type";

@Entity({ name: "Material" })
@ObjectType({
  description: "Материалы обучения",
})
export class MaterialEntity extends BaseEntity implements Material {
  @Field(() => Number, {
    nullable: false,
    description: "id материала",
  })
  @PrimaryGeneratedColumn()
  public id: number;

  @Field(() => TrainingEntity, {
    nullable: false,
    description: "идентификатор обучения",
  })
  @ManyToOne((type) => TrainingEntity, (training) => training.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  public training: TrainingEntity;

  @Column()
  @RelationId((material: MaterialEntity) => material.training)
  public trainingId: number;

  @Field(() => String, {
    nullable: false,
    description: "ссылка на материалы в файловом хранилище",
  })
  @Column()
  public link: string;

  @DeleteDateColumn()
  public deletedAt: Date;

  @Field(() => String, {
    nullable: true,
    description: "имя оригинального файла",
  })
  @Column({ nullable: true })
  public originName: string;

  @CreateDateColumn()
  public createdAt: Date;

  constructor(id: number, training: TrainingEntity, link: string) {
    super();
    this.id = id;
    this.training = training;
    this.link = link;
  }
}
