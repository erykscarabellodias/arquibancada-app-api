const returnUserMock = jest.fn().mockReturnValue({
  id: "96f35936-afd5-4d94-8a47-dfa3ac50d46b",
  name: "New User",
  email: "newuser@gmail.com",
});

const inexistentUser = jest.fn().mockReturnValue(null);
export { returnUserMock, inexistentUser };
