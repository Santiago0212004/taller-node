import { AuthenticationError, ForbiddenError } from 'apollo-server-express';
import { Context } from '../../graphql/types/context';
import UserService from '../../services/user.service';
import UserExistsError from '../../exceptions/UserExistsError';
import UserDoesNotExistsError from '../../exceptions/UserDoesNotExistsError';

export const userResolvers = {
  Query: {
    users: async (_: any, __: any, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError('Not authenticated');
      }
      if (!['user', 'superuser'].includes(context.user.role)) {
        throw new ForbiddenError('Not authorized');
      }
      return await UserService.findAll();
    },

    user: async (_: any, { id }: { id: string }, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError('Not authenticated');
      }
      if (!['user', 'superuser'].includes(context.user.role)) {
        throw new ForbiddenError('Not authorized');
      }
      try {
        return await UserService.get(id);
      } catch (error) {
        if (error instanceof UserDoesNotExistsError) {
          throw new Error('User does not exist');
        }
        throw error;
      }
    },

    me: async (_: any, __: any, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError('Not authenticated');
      }
      try {
        return await UserService.get(context.user.id);
      } catch (error) {
        if (error instanceof UserDoesNotExistsError) {
          throw new Error('User does not exist');
        }
        throw error;
      }
    },
  },

  Mutation: {
    register: async (_: any, { input }: { input: any }, context: Context) => {
      if (!context.user || context.user.role !== 'superuser') {
        throw new ForbiddenError('Not authorized');
      }
      try {
        input.isActive = true;
        return await UserService.create(input);
      } catch (error) {
        if (error instanceof UserExistsError) {
          throw new Error('User already exists');
        }
        throw error;
      }
    },

    login: async (_: any, { input }: { input: any }) => {
      try {
        const result = await UserService.login(input);
        return {
          token: result.token,
          user: await UserService.get(result.id as string)
        };
      } catch (error) {
        if (error instanceof UserDoesNotExistsError) {
          throw new Error('User does not exist');
        }
        if (error instanceof ReferenceError) {
          throw new AuthenticationError('Invalid credentials');
        }
        throw error;
      }
    },

    updateUser: async (_: any, { id, input }: { id: string, input: any }, context: Context) => {
      if (!context.user || context.user.role !== 'superuser') {
        throw new ForbiddenError('Not authorized');
      }
      try {
        const updatedUser = await UserService.update(id, input);
        if (!updatedUser) {
          throw new Error('User does not exist');
        }
        return updatedUser;
      } catch (error) {
        if (error instanceof UserDoesNotExistsError) {
          throw new Error('User does not exist');
        }
        throw error;
      }
    },

    deleteUser: async (_: any, { id }: { id: string }, context: Context) => {
      if (!context.user || context.user.role !== 'superuser') {
        throw new ForbiddenError('Not authorized');
      }
      try {
        const deletedUser = await UserService.delete(id);
        if (!deletedUser) {
          throw new Error('User does not exist');
        }
        return deletedUser;
      } catch (error) {
        if (error instanceof UserDoesNotExistsError) {
          throw new Error('User does not exist');
        }
        throw error;
      }
    },
  },
};