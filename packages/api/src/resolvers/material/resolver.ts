import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {MaterialEntity} from "../../objects/entities/material/entity";
import {findMaterialById} from "./queries/findMaterialById";
import {findAllMaterials} from "./queries/findAllMaterials";
import {InputMaterial} from "../../objects/input-objects/inputMaterial";
import {createMaterial} from "./queries/createMaterial";
import {updateMaterialById} from "./queries/updateMaterialById";
import {deleteMaterialById} from "./queries/deleteMaterialById";

@Resolver(MaterialEntity)
export class MaterialResolver {
    @Query(() => MaterialEntity || null, {
        nullable: true
    })
    public async material(@Arg("id") id: number) {
        return await findMaterialById(id);
    }

    @Query(() => [MaterialEntity])
    public async materials() {
        return await findAllMaterials();
    }

    @Mutation(() => MaterialEntity)
    public async createMaterial(@Arg("data") data: InputMaterial) {
        return await createMaterial(data);
    }

    @Mutation(() => MaterialEntity)
    public async updateMaterialById(
        @Arg("id") id: number,
        @Arg("data") data: InputMaterial) {
        return await updateMaterialById(id, data);
    }

    @Mutation(() => Boolean)
    public async deleteMaterialById(@Arg("id") id: number) {
        return deleteMaterialById(id);
    }
}