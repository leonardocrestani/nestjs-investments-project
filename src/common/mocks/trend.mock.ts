export const trendMock: any = {
  symbol: 'PETR4',
  currentPrice: 120.14,
};

export const updateTrendMock: any = {
  ...trendMock,
  currentPrice: trendMock.currentPrice + 123,
};

export const trendsMock: any = [
  {
    symbol: 'PETR4',
    currentPrice: 120.14,
  },
  {
    symbol: 'MGLU3',
    currentPrice: 45.14,
  },
  {
    symbol: 'VVAR3',
    currentPrice: 25.91,
  },
];
