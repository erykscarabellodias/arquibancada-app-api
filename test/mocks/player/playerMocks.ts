const playerMock = jest.fn().mockReturnValue({
  id: "f39ef0e4-ca5a-4ecd-b403-f08a82a2e8b7",
  nickname: "Romero",
  complete_name: "Ángel Rodrigo Romero Villamayor",
});

const playerDontExistsMock = jest.fn().mockReturnValue(null);

export { playerMock, playerDontExistsMock };
