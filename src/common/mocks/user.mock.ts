export const createUserMock: any = {
  full_name: 'leonardo crestani',
  document: '53926221941',
  account: '123456',
};

export const userMock: any = {
  full_name: 'leonardo crestani',
  document: '53926221941',
  account: '123456',
  checkingAccountAmount: 0,
  positions: [],
  consolidated: 0,
};

export const usersMock: any = [
  {
    full_name: 'leonardo crestani',
    document: '53926221941',
    account: '123456',
    checkingAccountAmount: 0,
    positions: [],
    consolidated: 0,
  },
  {
    full_name: 'leonardo crestani 2',
    document: '26436218084',
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
  account: '123456',
  checkingAccountAmount: 1000,
  positions: [],
  consolidated: 1000,
};
