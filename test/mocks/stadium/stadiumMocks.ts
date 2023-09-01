const createdStadiumMock = jest.fn().mockReturnValue({
  id: "334a78c4-074d-48a3-b27b-dca43ed00b9b",
  name: "Neo Química Arena",
  public_capacity: 47000,
  created_at: new Date(),
});

const stadiumDoesNotExistsMock = jest.fn().mockReturnValue(null);

export { createdStadiumMock, stadiumDoesNotExistsMock };
