import { ObjectType, Field } from "type-graphql";
import { FormatEntity } from "../format/entity";
import { OrganizerEntity } from "../oraganizer/entity";
import { TargetAudienceEntity } from "../target-audience/entity";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  RelationId,
  DeleteDateColumn,
} from "typeorm";
import { Training } from "./type";
import { CategoryEntity } from "../category/entity";
import { formatDate } from "../../../utils/utils";

@Entity({ name: "Training" })
@ObjectType({
  description: "Обучение",
})
export class TrainingEntity extends BaseEntity implements Training {
  @Field(() => Number, {
    nullable: false,
    description: "id обучения",
  })
  @PrimaryGeneratedColumn()
  public id: number;

  @Field(() => String, {
    nullable: true,
    description: "ярлык(картинка) обучения",
  })
  @Column({ nullable: true })
  public label: string;

  @Field(() => String, {
    nullable: false,
    description: "имя обучения",
  })
  @Column()
  public name: string;

  @Field(() => String, {
    nullable: false,
    description: "описание обучения",
  })
  @Column()
  public description: string;

  @Field(() => FormatEntity, {
    nullable: false,
    description: "формат обучения",
  })
  @ManyToOne((type) => FormatEntity, (format) => format.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  public format: FormatEntity;

  @Column()
  @RelationId((training: TrainingEntity) => training.format)
  public formatId: number;

  @Field(() => OrganizerEntity, {
    nullable: false,
    description: "организатор обучения",
  })
  @ManyToOne((type) => OrganizerEntity, (organizer) => organizer.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  public organizer: OrganizerEntity;

  @Column()
  @RelationId((training: TrainingEntity) => training.organizer)
  public organizerId: number;

  @Field(() => String, {
    nullable: true,
    description: "дата начала обучения",
  })
  @Column({ nullable: true })
  public start: string;

  @Field(() => String, {
    nullable: true,
    description: "дата окончания обучения",
  })
  @Column({ nullable: true })
  public end: string;

  @Field(() => TargetAudienceEntity, {
    nullable: false,
    description: "целевая аудитория обучения",
  })
  @ManyToOne((type) => TargetAudienceEntity, (audience) => audience.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  public audience: TargetAudienceEntity;

  @Column()
  @RelationId((training: TrainingEntity) => training.audience)
  public audienceId: number;

  @Field(() => String, {
    nullable: true,
    description: "ссылка на информацию по обучению",
  })
  @Column({ nullable: true })
  public site: string;

  @Field(() => CategoryEntity, {
    nullable: false,
    description: "категория обучения",
  })
  @ManyToOne((type) => CategoryEntity, (category) => category.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  public category: CategoryEntity;

  @Column()
  @RelationId((training: TrainingEntity) => training.category)
  public categoryId: number;

  @Field(() => String, {
    nullable: false,
    description: "дата создания обучения",
  })
  @Column({ default: formatDate(new Date()) })
  public createDate: string;

  @Field(() => [Number], {
    nullable: true,
    description: "Заявки / Отзывы / Рекомендации",
  })
  public listOfRequestsReviewsAndRecomends: number[];

  @Field(() => Number, {
    nullable: true,
    description: "Количество мест для участия",
  })
  @Column({ nullable: true })
  public numberOfParticipants: number;

  @DeleteDateColumn()
  public deletedAt: Date;

  @Field(() => Boolean, {
    nullable: false,
    description: "Дата события не определена (поля start и end null)",
  })
  @Column({ default: true })
  public isDateSet: boolean;

  @Field(() => Number, {
    nullable: true,
    description: "Средняя оценка события",
  })
  public averageRating: number;

  constructor(
    id: number,
    label: string,
    name: string,
    description: string,
    format: FormatEntity,
    organizer: OrganizerEntity,
    start: string,
    end: string,
    audience: TargetAudienceEntity,
    site: string
  ) {
    super();
    this.id = id;
    this.name = name;
    this.label = label;
    this.description = description;
    this.format = format;
    this.organizer = organizer;
    this.start = start;
    this.end = end;
    this.audience = audience;
    this.site = site;
  }
}
