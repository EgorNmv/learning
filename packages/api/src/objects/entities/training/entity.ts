import { ObjectType, Field } from "type-graphql";
import { FormatEntity } from "../format/entity";
import { OrganizerEntity } from "../oraganizer/entity";
import { TargetAudienceEntity } from "../target-audience/entity";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Training } from "./type";

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

    @Field(() => OrganizerEntity, {
        nullable: false,
        description: "организатор обучения"
    })
    @ManyToOne(type => OrganizerEntity, organizer => organizer.id)
    @JoinColumn()
    public organizer: OrganizerEntity;

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

    @Field(() => String, {
        nullable: false,
        description: "ссылка на информацию по обучению"
    })
    @Column()
    public site: string;

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