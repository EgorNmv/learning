import { Resolver, Mutation, Arg } from 'type-graphql';
import { GraphQLUpload, FileUpload } from "../../../../core/node_modules/graphql-upload";
import { createWriteStream } from "fs";

@Resolver()
export class FileUploadResolver {
    @Mutation(() => Boolean)
    public async uploadFile(
        @Arg("file", type => GraphQLUpload) file: FileUpload
    ): Promise<boolean> {
        if (!file) {
            return false;
        }
        console.info(file);
        return true;

        // const { createReadStream, filename } = await file;
        // const writableStream = createWriteStream(
        //     `${__dirname}/../../../files/images/${filename}`,
        //     { autoClose: true }
        // );
        // return await new Promise((res, rej) => {
        //     createReadStream()
        //         .pipe(writableStream)
        //         .on("finish", () => res(true))
        //         .on("error", () => rej(false));
        // });
    }
}
