import { User } from "../../../../../src/modules/accounts/entities/User";
import CheckIfUserHaveATeamService from "../../../../../src/modules/accounts/services/CheckIfUserHaveATeam.service";

describe("check if user have a team service unit tests suit", () => {
  const service = new CheckIfUserHaveATeamService();

  it("user have a team", () => {
    const user: User = {
      id: "96f35936-afd5-4d94-8a47-dfa3ac50d46b",
      name: "New User",
      email: "newuser@gmail.com",
      created_at: new Date(),
      password: "fakePassword",
      matches: null,
      team: {
        id: "f3472988-da25-4315-b01d-ba604bf5b3a9",
        complete_name: "Sport Club Corinthians Paulista",
        nickname: "Corinthians",
        city: "São Paulo",
        state: "São Paulo",
        isForeigner: false,
        created_at: new Date(),
        users: [],
        stadium: null,
        matchesAsOpponent: null,
      },
    };

    const userHaveATeam = service.checkIfUserHaveATeam(user);

    expect(userHaveATeam).toBeTruthy();
  });

  it("user dont have a team", () => {
    const user: User = {
      id: "96f35936-afd5-4d94-8a47-dfa3ac50d46b",
      name: "New User",
      email: "newuser@gmail.com",
      created_at: new Date(),
      password: "fakePassword",
      team: null,
      matches: null,
    };

    const userHaveATeam = service.checkIfUserHaveATeam(user);

    expect(userHaveATeam).toBeFalsy();
  });
});
