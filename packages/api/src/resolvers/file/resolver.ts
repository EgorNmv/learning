import { Resolver, Mutation, Arg } from 'type-graphql';
import { GraphQLUpload, FileUpload } from "graphql-upload";
import { createWriteStream } from "fs";
import { ReadStream } from "fs";
import { GraphQLNonNull } from 'graphql';
import { FileInput } from './fileType';


// export interface FileUpload {
//     filename: string;
//     mimetype: string;
//     encoding: string;
//     createReadStream(): ReadStream;
// }

@Resolver()
export class FileUploadResolver {
    @Mutation(() => Boolean)
    public async fileUpload(
        @Arg("file", type => GraphQLUpload) file: FileUpload
    ): Promise<boolean> {

        const { createReadStream, filename } = await file;
        const writableStream = createWriteStream(
            `${__dirname}/../../../files/images/${filename}`,
            { autoClose: true }
        );
        return await new Promise((res, rej) => {
            createReadStream()
                .pipe(writableStream)
                .on("finish", () => res(true))
                .on("error", () => rej(false));
        });
    }
}

// import { Resolver, Mutation, Arg, Int } from 'type-graphql';
// import { GraphQLUpload } from 'apollo-server-express';


// @Resolver()
// export class FileUploadResolver {
//     @Mutation(_ => Int)
//     singleUpload(@Arg('file', () => GraphQLUpload) file: FileUpload): number {
//         console.log(file);
//         return 4; // ideally, you'd return something sensible like an URL 
//     }
// }