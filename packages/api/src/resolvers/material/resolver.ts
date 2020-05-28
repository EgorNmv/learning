import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { MaterialEntity } from "../../objects/entities/material/entity";
import { findMaterialById } from "./queries/findMaterialById";
import { findAllMaterials } from "./queries/findAllMaterials";
import { InputMaterial } from "../../objects/input-objects/inputMaterial";
import { createMaterial } from "./queries/createMaterial";
import { updateMaterialById } from "./queries/updateMaterialById";
import { deleteMaterialById } from "./queries/deleteMaterialById";

@Resolver(MaterialEntity)
export class MaterialResolver {
    @Query(() => MaterialEntity)
    public async material(@Arg("id") id: number) {
        const material: MaterialEntity = await findMaterialById(id);

        return material;
    }

    @Query(() => [MaterialEntity])
    public async materials() {
        const materials: MaterialEntity[] = await findAllMaterials();

        return materials;
    }

    @Mutation(() => MaterialEntity)
    public async createMaterial(@Arg("data") data: InputMaterial) {
        const material: MaterialEntity = await createMaterial(data);

        return material;
    }

    @Mutation(() => MaterialEntity)
    public async updateMaterialById(
        @Arg("id") id: number,
        @Arg("data") data: InputMaterial) {
        const updatedMaterial: MaterialEntity = await updateMaterialById(id, data);

        return updatedMaterial;
    }

    @Mutation(() => Boolean)
    public async deleteMaterialById(@Arg("id") id: number) {
        return deleteMaterialById(id);
    }
}