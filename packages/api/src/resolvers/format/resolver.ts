import "reflect-metadata";
import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {FormatEntity} from "../../objects/entities/format/entity";
import {findFormatById} from "./queries/findFormatById";
import {findAllFormats} from "./queries/findAllFormats";
import {createFormat} from "./queries/createFormat";
import {updateFormatById} from "./queries/updateFormatById";
import {deleteFormatById} from "./queries/deleteFormatById";

@Resolver(FormatEntity)
export class FormatResolver {
    @Query(() => FormatEntity || null, {
        nullable: true
    })
    async format(@Arg("id") id: number) {
        return await findFormatById(id);
    }

    @Query(() => [FormatEntity])
    async formats() {
        return await findAllFormats();
    }

    @Mutation(() => FormatEntity)
    async createFormat(@Arg("description") description: string) {
        return await createFormat(description);
    }

    @Mutation(() => FormatEntity)
    async updateFormatById(
        @Arg("id") id: number,
        @Arg("description") description: string) {
        return await updateFormatById(id, description);
    }

    @Mutation(() => Boolean)
    async deleteFormatById(@Arg("id") id: number) {
        return await deleteFormatById(id);
    }
}