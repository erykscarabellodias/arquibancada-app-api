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
      id: "d6ec1850-f2de-410a-8860-96c6028f1f59",
      ownGoal: true,
    },
    {
      id: "2c598381-164c-4478-819e-0909eeb00a46",
      ownGoal: false,
    },
    {
      id: "56d1488e-638d-4bb3-9f2d-289a0bdc7acb",
      ownGoal: false,
    },
  ],
  fieldCommand: FieldCommand.HOME,
});

const matchDoesNotExistsMock = jest.fn().mockReturnValue(null);

export { returnMatchMock, matchDoesNotExistsMock };
