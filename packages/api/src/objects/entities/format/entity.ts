import { ObjectType, Field } from "type-graphql";
import { Format } from "./type";
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  DeleteDateColumn,
} from "typeorm";

@Entity({ name: "Format" })
@ObjectType({
  description: "Формат обучения",
})
export class FormatEntity extends BaseEntity implements Format {
  @Field(() => Number, {
    nullable: false,
    description: "id формата обучния",
  })
  @PrimaryGeneratedColumn()
  public id: number;

  @Field(() => String, {
    nullable: false,
    description: "описание формата обучения",
  })
  @Column()
  public description: string;

  @DeleteDateColumn()
  public deletedAt: Date;

  constructor(id: number, description: string) {
    super();
    this.id = id;
    this.description = description;
  }
}
