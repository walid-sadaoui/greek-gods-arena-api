export const Error = {
  type: 'object',
  properties: {
    error: {
      type: 'object',
      properties: {
        code: {
          type: 'number',
        },
        message: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        isOperational: {
          type: 'boolean',
        },
      },
    },
  },
};
