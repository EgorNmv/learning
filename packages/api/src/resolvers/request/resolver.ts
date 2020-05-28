import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { RequestEntity } from "../../objects/entities/request/entity";
import { findRequestById } from "./queries/findRequestById";
import { findAllRequests } from "./queries/findAllRequests";
import { InputRequest } from "../../objects/input-objects/inputRequest";
import { createRequest } from "./queries/createRequest";
import { updateRequestById } from "./queries/updateRequestById";
import { deleteRequestById } from "./queries/deleteRequestById";

@Resolver(RequestEntity)
export class RequestResolver {
    @Query(() => RequestEntity)
    public async request(@Arg("id") id: number) {
        const request: RequestEntity = await findRequestById(id);

        return request;
    }

    @Query(() => [RequestEntity])
    public async requests() {
        const requests: RequestEntity[] = await findAllRequests();

        return requests;
    }

    @Mutation(() => RequestEntity)
    public async createRequest(@Arg("data") data: InputRequest) {
        const request: RequestEntity = await createRequest(data);

        return request;
    }

    @Mutation(() => RequestEntity)
    public async updateOrganizerById(
        @Arg("id") id: number,
        @Arg("data") data: InputRequest
    ) {
        const updatedOrganizer: RequestEntity = await updateRequestById(id, data);

        return updatedOrganizer;
    }

    @Mutation(() => Boolean)
    public async deleteOrganizerById(@Arg("id") id: number) {
        return await deleteRequestById(id);
    }
}