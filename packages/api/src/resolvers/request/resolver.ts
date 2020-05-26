import { Resolver, Query, Arg } from "type-graphql";
import { RequestEntity } from "../../objects/entities/request/entity";
import { findRequestById } from "./queries/findRequestById";
import { findAllRequests } from "./queries/findAllRequests";

@Resolver(RequestEntity)
export class RequestResolver {
    @Query(() => RequestEntity)
    async request(@Arg("id") id: number) {
        const request: RequestEntity = await findRequestById(id);

        return request;
    }

    @Query(() => [RequestEntity])
    async requests() {
        const requests: RequestEntity[] = await findAllRequests();

        return requests;
    }
}