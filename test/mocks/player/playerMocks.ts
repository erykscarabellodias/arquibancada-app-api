const playerMock = jest.fn().mockReturnValue({
  id: "f39ef0e4-ca5a-4ecd-b403-f08a82a2e8b7",
  nickname: "Romero",
  complete_name: "Ángel Rodrigo Romero Villamayor",
});

const playerDontExistsMock = jest.fn().mockReturnValue(null);

const playersExistsMock = jest.fn().mockReturnValue([
  {
    id: "f39ef0e4-ca5a-4ecd-b403-f08a82a2e8b7",
    nickname: "Roger Guedes",
    complete_name: "Róger Krug Guedes",
  },
  {
    id: "4f9e8605-101d-4724-b865-2983c4a137a2",
    nickname: "Roger Caveirão",
    complete_name: "Roger Rodrigues da Silva",
  },
]);

export { playerMock, playerDontExistsMock, playersExistsMock };
