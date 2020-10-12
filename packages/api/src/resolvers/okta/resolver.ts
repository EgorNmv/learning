import { Resolver, Query, Arg, Ctx } from "type-graphql";
import { Context } from "../../objects/context";
import { getUserGroupBySub } from "./queries/getUserGroupBySub";

@Resolver()
export class OktaResolver {
  @Query(() => String)
  public async getUserGroups(
    @Ctx() { oktaSdkClient }: Context,
    @Arg("sub") sub: string
  ) {
    return await getUserGroupBySub(oktaSdkClient, sub);
  }
}
