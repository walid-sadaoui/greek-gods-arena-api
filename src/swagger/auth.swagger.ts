export const signup = {
  tags: ['Auth'],
  description: 'Create a user account',
  operationId: 'signup',
  //   security: [
  //     {
  //       bearerAuth: [],
  //     },
  //   ],
  requestBody: {
    required: true,
    description: 'User signup data',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/SignupRequestBody',
        },
        example: {
          username: 'hiei',
          email: 'hiei@gmail.com',
          password: 'Hiei123456!',
        },
      },
    },
  },
  responses: {
    '201': {
      description: 'The user created',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                allOf: [
                  {
                    $ref: '#/components/schemas/APIResponseData',
                  },
                  {
                    type: 'object',
                    properties: {
                      user: {
                        $ref: '#/components/schemas/SecureUser',
                      },
                    },
                  },
                ],
              },
            },
          },
          example: {
            data: {
              code: 201,
              message: 'User created!',
              user: {
                _id: '612f3c494a4eb72b3007c179',
                username: 'hiei',
                email: 'hiei@gmail.com',
                characters: [],
                createdAt: '2021-09-01T08:39:37.963Z',
                updatedAt: '2021-09-01T08:39:37.963Z',
              },
            },
          },
        },
      },
    },
    '400': {
      description: 'Error',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Error',
          },
          example: {
            error: {
              code: 400,
              message: 'Username, Email and Password are required',
              description: 'Auth error',
              isOperational: true,
            },
          },
        },
      },
    },
    '409': {
      description: 'Conflict',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Error',
          },
          example: {
            error: {
              code: 409,
              message: 'Email already exists',
              description: 'Auth error',
              isOperational: true,
            },
          },
        },
      },
    },
    '422': {
      description: 'Error',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Error',
          },
          example: {
            error: {
              code: 422,
              message: 'Invalid email format',
              description: 'Auth error',
              isOperational: true,
            },
          },
        },
      },
    },
  },
};

export const login = {
  tags: ['Auth'],
  description: 'Log a user in',
  operationId: 'login',
  requestBody: {
    required: true,
    description: 'User login data',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/LoginRequestBody',
        },
        example: {
          email: 'hiei@gmail.com',
          password: 'Hiei123456!',
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'The user logged in',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                allOf: [
                  {
                    $ref: '#/components/schemas/APIResponseData',
                  },
                  {
                    $ref: '#/components/schemas/LoginResponseData',
                  },
                ],
              },
            },
          },
          example: {
            data: {
              code: 201,
              message: 'User signed in!',
              user: {
                _id: '612f3c494a4eb72b3007c179',
                username: 'hiei',
                email: 'hiei@gmail.com',
                characters: [],
                createdAt: '2021-09-01T08:39:37.963Z',
                updatedAt: '2021-09-01T08:39:37.963Z',
              },
              token:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTJmM2M0NTRhNGViNzJiMzAwN2MxNzUiLCJ1c2VybmFtZSI6Inl1c3VrZSIsImVtYWlsIjoieXVzdWtlQGdtYWlsLmNvbSIsImNoYXJhY3RlcnMiOlt7InNraWxsUG9pbnRzIjo0LCJoZWFsdGgiOjEyLCJhdHRhY2siOjUsImRlZmVuc2UiOjMsIm1hZ2lrIjoxLCJsZXZlbCI6MSwiX2lkIjoiNjEyZjNjYzE0YTRlYjcyYjMwMDdjMTgwIiwibmFtZSI6IkhBREVTIn0seyJza2lsbFBvaW50cyI6NCwiaGVhbHRoIjoxMiwiYXR0YWNrIjo1LCJkZWZlbnNlIjozLCJtYWdpayI6MSwibGV2ZWwiOjEsIl9pZCI6IjYxMmYzY2M3NGE0ZWI3MmIzMDA3YzE4NCIsIm5hbWUiOiJaRVVTIn0seyJza2lsbFBvaW50cyI6MSwiaGVhbHRoIjoxMywiYXR0YWNrIjo2LCJkZWZlbnNlIjo0LCJtYWdpayI6MSwibGV2ZWwiOjEsIl9pZCI6IjYxMmYzY2QxNGE0ZWI3MmIzMDA3YzE4OSIsIm5hbWUiOiJIRVJNRVMifV0sImNyZWF0ZWRBdCI6IjIwMjEtMDktMDFUMDg6Mzk6MzMuMzMxWiIsInVwZGF0ZWRBdCI6IjIwMjEtMDktMDFUMTA6MjY6NDEuODYyWiIsIl9fdiI6NywiaWF0IjoxNjMwNTcwMTM2LCJleHAiOjE2MzA1NzM3MzZ9.YlBp3Io_moCQt5ki0UNdz8oFoRqAqFF_TYxv0rUbM28',
              refreshToken:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTJmM2M0NTRhNGViNzJiMzAwN2MxNzUiLCJpYXQiOjE2MzA1NzAxMzYsImV4cCI6MTYzMDgyOTMzNn0.MKMO5FEfkc4t9MQPrVOxL7S9aBzGdyzf_qIT8LvOcN8',
            },
          },
        },
      },
    },
    '400': {
      description: 'Error',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Error',
          },
          example: {
            error: {
              code: 400,
              message: 'Username, Email and Password are required',
              description: 'Auth error',
              isOperational: true,
            },
          },
        },
      },
    },
    '409': {
      description: 'Conflict',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Error',
          },
          example: {
            error: {
              code: 409,
              message: 'Email already exists',
              description: 'Auth error',
              isOperational: true,
            },
          },
        },
      },
    },
    '422': {
      description: 'Error',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Error',
          },
          example: {
            error: {
              code: 422,
              message: 'Invalid email format',
              description: 'Auth error',
              isOperational: true,
            },
          },
        },
      },
    },
  },
};
