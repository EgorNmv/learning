import "reflect-metadata";
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { FormatEntity } from "../../objects/entities/format/entity";
import { findFormatById } from "./queries/findFormatById";
import { findAllFormats } from "./queries/findAllFormats";
import { createFormat } from "./queries/createFormat";
import { updateFormatById } from "./queries/updateFormatById";
import { deleteFormatById } from "./queries/deleteFormatById";

@Resolver(FormatEntity)
export class FormatResolver {
    @Query(() => FormatEntity)
    async format(@Arg("id") id: number) {
        const format = await findFormatById(id);

        return format;
    }

    @Query(() => [FormatEntity])
    async formats() {
        const formats: FormatEntity[] = await findAllFormats();

        return formats;
    }

    @Mutation(() => FormatEntity)
    async createFormat(@Arg("description") description: string) {
        const format: FormatEntity = await createFormat(description);

        return format;
    }

    @Mutation(() => FormatEntity)
    async updateFormatById(
        @Arg("id") id: number,
        @Arg("description") description: string) {
        const updatedFormtat: FormatEntity = await updateFormatById(id, description);

        return updatedFormtat;
    }

    @Mutation(() => Boolean)
    async deleteFormatById(@Arg("id") id: number) {
        return await deleteFormatById(id);
    }
}