export const createUserMock: any = {
  full_name: 'leonardo crestani',
  document: '53926221941',
  password: '123456',
  account: '123456',
};

export const userMock: any = {
  full_name: 'leonardo crestani',
  document: '53926221941',
  password: '$2b$10$uhupw9t4ItMBEsM4qZpAMe.IV7M/sA44EtEwpdTHj3oC1w7Tl1n7G',
  account: '123456',
  checkingAccountAmount: 0,
  positions: [],
  consolidated: 0,
};

export const usersMock: any = [
  {
    full_name: 'leonardo crestani',
    document: '53926221941',
    password: '$2b$10$uhupw9t4ItMBEsM4qZpAMe.IV7M/sA44EtEwpdTHj3oC1w7Tl1n7G',
    account: '123456',
    checkingAccountAmount: 0,
    positions: [],
    consolidated: 0,
  },
  {
    full_name: 'leonardo crestani 2',
    document: '26436218084',
    password: '$2b$10$uhupw9t4ItMBEsM4qZpAMe.IV7M/sA44EtEwpdTHj3oC1w7Tl1n7G',
    account: '123789',
    checkingAccountAmount: 0,
    positions: [
      {
        symbol: 'PETR4',
        currentPrice: 120.14,
        amount: 2,
      },
    ],
    consolidated: 0,
  },
];

export const updateUserMock: any = {
  full_name: 'leonardo crestani',
  document: '53926221941',
  password: '$2b$10$uhupw9t4ItMBEsM4qZpAMe.IV7M/sA44EtEwpdTHj3oC1w7Tl1n7G',
  account: '123456',
  checkingAccountAmount: 1000,
  positions: [],
  consolidated: 1000,
};
