import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
} from "typeorm";
import { TargetAudience } from "./type";

@Entity({ name: "TargetAudience" })
@ObjectType({
  description: "Целевая аудитория",
})
export class TargetAudienceEntity extends BaseEntity implements TargetAudience {
  @Field(() => Number, {
    nullable: false,
    description: "id целевой аудитории",
  })
  @PrimaryGeneratedColumn()
  public id: number;

  @Field(() => String, {
    nullable: false,
    description: "описание целевой аудитории",
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
