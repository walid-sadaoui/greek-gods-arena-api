export const APIResponseData = {
  type: 'object',
  properties: {
    code: {
      type: 'number',
    },
    message: {
      type: 'string',
    },
  },
};

export const SignupRequestBody = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
    },
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      format: 'password',
    },
  },
};

export const LoginRequestBody = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      format: 'password',
    },
  },
};

export const LoginResponseData = {
  type: 'object',
  properties: {
    allOf: [
      {
        type: 'object',
        properties: {
          user: {
            $ref: '#/components/schemas/SecureUser',
          },
        },
      },
      {
        properties: {
          token: {
            type: 'string',
          },
          refreshToken: {
            type: 'string',
          },
        },
      },
    ],
  },
};
