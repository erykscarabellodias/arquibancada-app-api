const createdStadiumMock = jest.fn().mockReturnValue({
  id: "334a78c4-074d-48a3-b27b-dca43ed00b9b",
  name: "Neo Química Arena",
  public_capacity: 47000,
  created_at: new Date(),
});

const createdStadiumsListMock = jest.fn().mockReturnValue([
  {
    id: "334a78c4-074d-48a3-b27b-dca43ed00b9b",
    name: "Neo Química Arena",
    public_capacity: 47000,
    created_at: new Date(),
  },
  {
    id: "ca509c8b-f4f3-4be1-9b9c-3f267b4fe50a",
    name: "Arena MRV",
    public_capacity: 46000,
    created_at: new Date(),
  },
]);

const returnEmptyStadiumList = jest.fn().mockReturnValue([]);

const stadiumDoesNotExistsMock = jest.fn().mockReturnValue(null);

export {
  createdStadiumMock,
  stadiumDoesNotExistsMock,
  createdStadiumsListMock,
  returnEmptyStadiumList,
};
