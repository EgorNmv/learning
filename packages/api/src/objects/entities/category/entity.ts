import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Category } from "./type";

@Entity({ name: "Category" })
@ObjectType({
  description: "Категория обучения",
})
export class CategoryEntity extends BaseEntity implements Category {
  @Field(() => Number, {
    nullable: false,
    description: "id категории",
  })
  @PrimaryGeneratedColumn()
  public id: number;

  @Field(() => String, {
    nullable: false,
    description: "описание категории",
  })
  @Column()
  public description: string;

  @Field(() => String, {
    nullable: true,
    description: "изображение категории",
  })
  @Column({ nullable: true })
  public label: string;

  @DeleteDateColumn()
  public deletedAt: Date;

  constructor(id: number, description: string, label: string) {
    super();
    this.id = id;
    this.description = description;
    this.label = label;
  }
}
