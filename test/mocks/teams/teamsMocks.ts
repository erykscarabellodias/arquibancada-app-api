const returnTeamMock = jest.fn().mockReturnValue({
  id: "f3472988-da25-4315-b01d-ba604bf5b3a9",
  complete_name: "Sport Club Corinthians Paulista",
  nickname: "Corinthians",
  city: "São Paulo",
  state: "São Paulo",
});

const teamAlreadyExists = jest.fn().mockReturnValue(true);

const teamNotExistsYet = jest.fn().mockReturnValue(false);

export { returnTeamMock, teamAlreadyExists, teamNotExistsYet };
