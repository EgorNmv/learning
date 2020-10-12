import "reflect-metadata";
import { Arg, Mutation, Query, Resolver, Ctx, Authorized } from "type-graphql";
import { Context } from "../../objects/context";
import { CategoryEntity } from "../../objects/entities/category/entity";
import { findCategoryById } from "./queries/findCategoryById";
import { findAllCategories } from "./queries/findAllCategories";
import { createCategory } from "./queries/createCategory";
import { updateCategoryById } from "./queries/updateCategoryById";
import { deleteCategoryById } from "./queries/deleteCategoryById";

@Resolver(CategoryEntity)
export class CategoryResolver {
  @Query(() => CategoryEntity || null, {
    nullable: true,
  })
  public async category(@Ctx() { connection }: Context, @Arg("id") id: number) {
    return await findCategoryById(connection, id);
  }

  @Query(() => [CategoryEntity])
  public async categories(@Ctx() { connection }: Context) {
    return await findAllCategories(connection);
  }

  @Authorized()
  @Mutation(() => CategoryEntity)
  public async createCategory(
    @Ctx() { connection }: Context,
    @Arg("description") description: string,
    @Arg("label", { nullable: true }) label: string
  ) {
    return await createCategory(connection, description, label);
  }

  @Authorized()
  @Mutation(() => CategoryEntity)
  public async updateCategoryById(
    @Ctx() { connection }: Context,
    @Arg("id") id: number,
    @Arg("description") description: string,
    @Arg("label", { nullable: true }) label: string
  ) {
    return await updateCategoryById(connection, id, description, label);
  }

  @Authorized()
  @Mutation(() => Boolean)
  public async deleteCategoryById(
    @Ctx() { connection }: Context,
    @Arg("id") id: number
  ) {
    return await deleteCategoryById(connection, id);
  }
}
