const futureYearMock = jest.fn().mockReturnValue(2024);
const pastYearMock = jest.fn().mockReturnValue(2015);
const exactYearMock = jest.fn().mockReturnValue(2016);

const futureDayMock = jest.fn().mockReturnValue(new Date("2024-01-01"));
const pastDayMock = jest.fn().mockReturnValue(new Date("2015-01-01"));
const exactDayMock = jest.fn().mockReturnValue(new Date("2016-05-16"));

export {
  futureYearMock,
  pastYearMock,
  exactYearMock,
  futureDayMock,
  pastDayMock,
  exactDayMock,
};
