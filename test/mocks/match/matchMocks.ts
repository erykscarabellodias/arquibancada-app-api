import FieldCommand from "../../../src/modules/matches/registerMatch/enums/FieldCommand";

const returnMatchMock = jest.fn().mockReturnValue({
  opponentId: "6e9bbb89-e3ed-4562-acf2-2ce48bd9467e",
  stadiumId: "85fb581e-1464-4094-8804-a18be3bc263f",
  tournamentId: "efa8a079-d8ba-46e3-87b3-8cc29f873d21",
  season: 2016,
  yourTeamGoals: 3,
  opponentGoals: 0,
  scorers: [
    {
      name: "Kadu",
      ownGoal: true,
    },
    {
      name: "Bruno Henrique",
      ownGoal: false,
    },
    {
      name: "Guilherme",
      ownGoal: false,
    },
  ],
  fieldCommand: FieldCommand.HOME,
});

const matchDoesNotExistsMock = jest.fn().mockReturnValue(null);

export { returnMatchMock, matchDoesNotExistsMock };
