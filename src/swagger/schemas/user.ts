export const User = {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
    },
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
    characters: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/Character',
      },
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
    },
  },
};

export const SecureUser = {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
    },
    username: {
      type: 'string',
    },
    email: {
      type: 'string',
      format: 'email',
    },
    characters: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/Character',
      },
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
    },
  },
};

export const Character = {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    skillPoints: {
      type: 'number',
    },
    health: {
      type: 'number',
    },
    attack: {
      type: 'number',
    },
    defense: {
      type: 'number',
    },
    magik: {
      type: 'number',
    },
    level: {
      type: 'number',
    },
  },
};
