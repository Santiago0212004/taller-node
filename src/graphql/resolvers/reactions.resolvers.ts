import reactionService from "../../services/reaction.service";
import { AuthenticationError } from "apollo-server-express";

export const reactionResolvers = {
  Query: {
    getReactions: async () => {
      return await reactionService.findAll();
    },
    getReaction: async (_: any, { reactionId }: { reactionId: string }) => {
      return await reactionService.get(reactionId);
    },
  },
  Mutation: {
    createReaction: async (_: any, { input }: { input: any }, context: any) => {
      const user = context.user;
      if (!user) {
        throw new AuthenticationError("Unauthorized");
      }

      const reactionInput = { ...input, userId: user.id };
      return await reactionService.create(reactionInput);
    },
    deleteReaction: async (_: any, { reactionId }: { reactionId: string }, context: any) => {
      const user = context.user;
      if (!user) {
        throw new AuthenticationError("Unauthorized");
      }

      return await reactionService.delete(reactionId, user.id);
    },
  },
};
