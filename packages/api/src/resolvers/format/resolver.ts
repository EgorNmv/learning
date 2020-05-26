import "reflect-metadata";
import { Resolver, Query, Arg } from "type-graphql";
import { FormatEntity } from "../../objects/entities/format/entity";
import { findFormatById } from "./queries/findFormatById";
import { findAllFormats } from "./queries/findAllFormats";

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
}