import { ObjectType, Field } from "type-graphql";
import { TrainingEntity } from "../training/entity";
import { Entity, BaseEntity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column } from "typeorm";
import { Material } from "./type";

@Entity({ name: "Material" })
@ObjectType({
    description: "Материалы обучения"
})
export class MaterialEntity extends BaseEntity implements Material {
    @Field(() => Number, {
        nullable: false,
        description: "id материала"
    })
    @PrimaryGeneratedColumn()
    public id: number;

    @Field(() => TrainingEntity, {
        nullable: false,
        description: "идентификатор обучения"
    })
    @OneToOne(type => TrainingEntity, training => training.id)
    @JoinColumn()
    public training: TrainingEntity;

    @Field(() => String, {
        nullable: false,
        description: "ссылка на материалы в файловом хранилище"
    })
    @Column()
    public link: string;

    constructor(
        id: number,
        training: TrainingEntity,
        link: string
    ) {
        super();
        this.id = id;
        this.training = training;
        this.link = link;
    }
}