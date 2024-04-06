const playerMock = jest.fn().mockReturnValue({
  nickname: "Romero",
  complete_name: "Ángel Rodrigo Romero Villamayor",
});

const playerDontExistsMock = jest.fn().mockReturnValue(null);

export { playerMock, playerDontExistsMock };
