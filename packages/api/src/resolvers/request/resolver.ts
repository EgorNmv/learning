import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {RequestEntity} from "../../objects/entities/request/entity";
import {findRequestById} from "./queries/findRequestById";
import {findAllRequests} from "./queries/findAllRequests";
import {InputRequest} from "../../objects/input-objects/inputRequest";
import {createRequest} from "./queries/createRequest";
import {updateRequestById} from "./queries/updateRequestById";
import {deleteRequestById} from "./queries/deleteRequestById";

@Resolver(RequestEntity)
export class RequestResolver {
    @Query(() => RequestEntity || null, {
        nullable: true
    })
    public async request(@Arg("id") id: number) {
        return await findRequestById(id);
    }

    @Query(() => [RequestEntity])
    public async requests() {
        return await findAllRequests();
    }

    @Mutation(() => RequestEntity)
    public async createRequest(@Arg("data") data: InputRequest) {
        return await createRequest(data);
    }

    @Mutation(() => RequestEntity)
    public async updateOrganizerById(
        @Arg("id") id: number,
        @Arg("data") data: InputRequest
    ) {
        return await updateRequestById(id, data);
    }

    @Mutation(() => Boolean)
    public async deleteOrganizerById(@Arg("id") id: number) {
        return await deleteRequestById(id);
    }
}