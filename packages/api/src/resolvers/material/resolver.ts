import { Arg, Mutation, Query, Resolver, Ctx } from "type-graphql";
import { MaterialEntity } from "../../objects/entities/material/entity";
import { findMaterialById } from "./queries/findMaterialById";
import { findAllMaterials } from "./queries/findAllMaterials";
import { InputMaterial } from "../../objects/input-objects/inputMaterial";
import { createMaterial } from "./queries/createMaterial";
import { updateMaterialById } from "./queries/updateMaterialById";
import { deleteMaterialById } from "./queries/deleteMaterialById";
import { Context } from "../../objects/context";

@Resolver(MaterialEntity)
export class MaterialResolver {
    @Query(() => MaterialEntity || null, {
        nullable: true
    })
    public async material(
        @Ctx() { connection }: Context,
        @Arg("id") id: number) {
        return await findMaterialById(connection, id);
    }

    @Query(() => [MaterialEntity])
    public async materials(
        @Ctx() { connection }: Context,
    ) {
        return await findAllMaterials(connection);
    }

    @Mutation(() => MaterialEntity)
    public async createMaterial(
        @Ctx() { connection }: Context,
        @Arg("data") data: InputMaterial
    ) {
        return await createMaterial(connection, data);
    }

    @Mutation(() => MaterialEntity)
    public async updateMaterialById(
        @Ctx() { connection }: Context,
        @Arg("id") id: number,
        @Arg("data") data: InputMaterial
    ) {
        return await updateMaterialById(connection, id, data);
    }

    @Mutation(() => Boolean)
    public async deleteMaterialById(
        @Ctx() { connection }: Context,
        @Arg("id") id: number
    ) {
        return deleteMaterialById(connection, id);
    }
}