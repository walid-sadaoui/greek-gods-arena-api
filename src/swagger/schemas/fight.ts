export const Fight = {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
    },
    finished: {
      type: 'boolean',
    },
    firstOpponentId: {
      type: 'string',
    },
    secondOpponentId: {
      type: 'string',
    },
    turns: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/Turn',
      },
    },
    winner: {
      type: 'string',
    },
    loser: {
      type: 'string',
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

export const Turn = {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
    },
    count: {
      type: 'number',
    },
    attacker: {
      $ref: '#/components/schemas/Attacker',
    },
    defender: {
      $ref: '#/components/schemas/Defender',
    },
    attackSuccess: {
      type: 'boolean',
    },
  },
};

export const Attacker = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    attackValue: {
      type: 'number',
    },
    remainingHealth: {
      type: 'number',
    },
  },
};

export const Defender = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    defenseSkillPoints: {
      type: 'number',
    },
    remainingHealth: {
      type: 'number',
    },
  },
};
