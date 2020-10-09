import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
} from "typeorm";
import { Organizer } from "./type";

@Entity({ name: "Organizer" })
@ObjectType({
  description: "Организатор обучения",
})
export class OrganizerEntity extends BaseEntity implements Organizer {
  @Field(() => Number, {
    nullable: false,
    description: "id организатора обучния",
  })
  @PrimaryGeneratedColumn()
  public id: number;

  @Field(() => String, {
    nullable: false,
    description: "имя организатора обучения",
  })
  @Column()
  public name: string;

  @Field(() => String, {
    nullable: false,
    description: "адресс организатора обучения",
  })
  @Column()
  public address: string;

  @Field(() => String, {
    nullable: true,
    description: "сайт организатора обучения",
  })
  @Column({ nullable: true })
  public site: string;

  @Field(() => Number, {
    nullable: false,
    description: "тип организатора обучения",
  })
  @Column()
  public type: number;

  @DeleteDateColumn()
  public deletedAt: Date;

  @Field(() => String, {
    nullable: true,
    description: "контактная информация организатора",
  })
  @Column({ nullable: true })
  public contactInfo: string;

  @Field(() => String, {
    nullable: true,
    description: "спикер/преподаватель/докладчик",
  })
  @Column({ nullable: true })
  public speaker: string;

  constructor(
    id: number,
    name: string,
    address: string,
    site: string,
    type: number
  ) {
    super();
    this.id = id;
    this.name = name;
    this.address = address;
    this.site = site;
    this.type = type;
  }
}
