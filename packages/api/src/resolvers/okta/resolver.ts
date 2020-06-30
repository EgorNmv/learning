import { Resolver, Query, Arg } from "type-graphql";
import { getUserGroupBySub } from "./getUserGroupBySub";

@Resolver()
export class OktaResolver {
  @Query(() => String)
  public async getUserGroups(@Arg("sub") sub: string) {
    return await getUserGroupBySub(sub);
  }
}
