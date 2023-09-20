const returnTeamMock = jest.fn().mockReturnValue({
  id: "f3472988-da25-4315-b01d-ba604bf5b3a9",
  complete_name: "Sport Club Corinthians Paulista",
  nickname: "Corinthians",
  city: "São Paulo",
  state: "São Paulo",
});

const returnTeamListMock = jest.fn().mockReturnValue([
  {
    id: "f3472988-da25-4315-b01d-ba604bf5b3a9",
    complete_name: "Sport Club Corinthians Paulista",
    nickname: "Corinthians",
    city: "São Paulo",
    state: "São Paulo",
  },
  {
    id: "9ac3776f-3b46-4184-8184-44dfb26dfd6c",
    complete_name: "Coritiba Foot Ball Club",
    nickname: "Coritiba",
    city: "Curitiba",
    state: "Paraná",
  },
]);

const chooseStadiumMock = jest.fn().mockReturnValue({
  id: "f3472988-da25-4315-b01d-ba604bf5b3a9",
  complete_name: "Sport Club Corinthians Paulista",
  nickname: "Corinthians",
  city: "São Paulo",
  state: "São Paulo",
  stadium: {
    id: "334a78c4-074d-48a3-b27b-dca43ed00b9b",
    name: "Neo Química Arena",
    public_capacity: 47000,
    created_at: new Date(),
  },
});

const teamDoesNotExist = jest.fn().mockReturnValue(null);

const returnEmptyTeamList = jest.fn().mockReturnValue([]);

const teamAlreadyExists = jest.fn().mockReturnValue(true);

const teamNotExistsYet = jest.fn().mockReturnValue(false);

export {
  returnTeamMock,
  teamAlreadyExists,
  teamNotExistsYet,
  returnTeamListMock,
  returnEmptyTeamList,
  teamDoesNotExist,
  chooseStadiumMock,
};
