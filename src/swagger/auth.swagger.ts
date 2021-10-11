export const signup = {
  tags: ['signup', 'auth'],
  description: 'Create a user account',
  operationId: 'signup',
  //   security: [
  //     {
  //       bearerAuth: [],
  //     },
  //   ],
  responses: {
    '200': {
      description: 'The user created',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            data: {
              code: 200,
              message: 'User created!',
              user: {
                type: 'object',
              },
            },
          },
        },
      },
    },
  },
};
