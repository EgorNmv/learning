import { Resolver, Query, Arg } from "type-graphql";
import { MaterialEntity } from "../../objects/entities/material/entity";
import { findMaterialById } from "./queries/findMaterialById";
import { findAllMaterials } from "./queries/findAllMaterials";

@Resolver(MaterialEntity)
export class MaterialResolver {
    @Query(() => MaterialEntity)
    async material(@Arg("id") id: number) {
        const material: MaterialEntity = await findMaterialById(id);

        return material;
    }

    @Query(() => [MaterialEntity])
    async materials() {
        const materials: MaterialEntity[] = await findAllMaterials();

        return materials;
    }
}