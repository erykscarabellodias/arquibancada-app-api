const returnUserMock = jest.fn().mockReturnValue({
  id: "96f35936-afd5-4d94-8a47-dfa3ac50d46b",
  name: "New User",
  email: "newuser@gmail.com",
  team: null,
});

const returnUserWithTeamMock = jest.fn().mockReturnValue({
  id: "96f35936-afd5-4d94-8a47-dfa3ac50d46b",
  name: "New User",
  email: "newuser@gmail.com",
  team: {
    id: "f3472988-da25-4315-b01d-ba604bf5b3a9",
    complete_name: "Sport Club Corinthians Paulista",
    nickname: "Corinthians",
    city: "São Paulo",
    state: "São Paulo",
  },
});

const inexistentUser = jest.fn().mockReturnValue(null);

export { returnUserMock, inexistentUser, returnUserWithTeamMock };
