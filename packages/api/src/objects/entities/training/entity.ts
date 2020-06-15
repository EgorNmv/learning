import { ObjectType, Field } from "type-graphql";
import { FormatEntity } from "../format/entity";
import { OrganizerEntity } from "../oraganizer/entity";
import { TargetAudienceEntity } from "../target-audience/entity";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, RelationId } from "typeorm";
import { Training } from "./type";
import { CategoryEntity } from "../category/entity";

@Entity({ name: "Training" })
@ObjectType({
    description: "Обучение"
})
export class TrainingEntity extends BaseEntity implements Training {
    @Field(() => Number, {
        nullable: false,
        description: "id обучения"
    })
    @PrimaryGeneratedColumn()
    public id: number;

    @Field(() => String, {
        nullable: false,
        description: "ярлык(картинка) обучения"
    })
    @Column()
    public label: string;

    @Field(() => String, {
        nullable: false,
        description: "имя обучения"
    })
    @Column()
    public name: string;

    @Field(() => String, {
        nullable: false,
        description: "описание обучения"
    })
    @Column()
    public description: string;

    @Field(() => FormatEntity, {
        nullable: false,
        description: "формат обучения"
    })
    @ManyToOne(type => FormatEntity, format => format.id)
    @JoinColumn()
    public format: FormatEntity;

    @Column()
    @RelationId((training: TrainingEntity) => training.format)
    public formatId: number;

    @Field(() => OrganizerEntity, {
        nullable: false,
        description: "организатор обучения"
    })
    @ManyToOne(type => OrganizerEntity, organizer => organizer.id)
    @JoinColumn()
    public organizer: OrganizerEntity;

    @Column()
    @RelationId((training: TrainingEntity) => training.organizer)
    public organizerId: number;

    @Field(() => String, {
        nullable: false,
        description: "дата начала обучения"
    })
    @Column()
    public start: string;

    @Field(() => String, {
        nullable: false,
        description: "дата окончания обучения"
    })
    @Column()
    public end: string;

    @Field(() => TargetAudienceEntity, {
        nullable: false,
        description: "целевая аудитория обучения"
    })
    @ManyToOne(type => TargetAudienceEntity, audience => audience.id)
    @JoinColumn()
    public audience: TargetAudienceEntity;

    @Column()
    @RelationId((training: TrainingEntity) => training.audience)
    public audienceId: number;

    @Field(() => String, {
        nullable: false,
        description: "ссылка на информацию по обучению"
    })
    @Column()
    public site: string;

    @Field(() => CategoryEntity, {
        nullable: false,
        description: "категория обучения"
    })
    @ManyToOne(type => CategoryEntity, category => category.id)
    @JoinColumn()
    public category: CategoryEntity;

    @Column()
    @RelationId((training: TrainingEntity) => training.category)
    public categoryId: number;

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