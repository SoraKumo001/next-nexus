import { PrismaSelect } from "@paljs/plugins";
import { list, nonNull, objectType, queryField } from "nexus";
import { User } from "nexus-prisma";

/**
 * @name UserType
 * @description User Type
 * @type GraphQLObjectType
 * @returns {object} GraphQLObjectType
 **/

export const UserType = objectType({
  name: User.$name,
  description: User.$description,
  definition(t) {
    Object.entries(User)
      .filter(([key]) => !key.startsWith("$"))
      .forEach(([, value]) => t.field(value));
  },
});

export const UserQuery = queryField("Users", {
  type: nonNull(list(nonNull(UserType))),
  resolve: (_parent, {}, { prisma }, info) => {
    const select = new PrismaSelect(info, {
      defaultFields: { Post: { id: true } },
    }).value;
    return prisma.user.findMany({
      ...select,
    });
  },
});
