import { User } from "../../../../../src/modules/accounts/entities/User";
import CheckIfUserTeamHaveAStadiumService from "../../../../../src/modules/stadiums/services/CheckIfUserTeamHaveAStadium.service";

describe("check if user team have a stadium service unit tests suit", () => {
  const service = new CheckIfUserTeamHaveAStadiumService();

  it("user team have a stadium", () => {
    const user: User = {
      id: "96f35936-afd5-4d94-8a47-dfa3ac50d46b",
      name: "New User",
      email: "newuser@gmail.com",
      created_at: new Date(),
      password: "fakePassword",
      matches: [],
      team: {
        id: "f3472988-da25-4315-b01d-ba604bf5b3a9",
        complete_name: "Sport Club Corinthians Paulista",
        nickname: "Corinthians",
        city: "São Paulo",
        state: "São Paulo",
        created_at: new Date(),
        users: [],
        matchesAsOpponent: [],
        stadium: {
          id: "97c929f8-542d-45fa-bbdb-23fd63e2fee8",
          name: "Neo Química Arena",
          public_capacity: 46000,
          created_at: new Date(),
          teams: [],
          matches: [],
        },
      },
    };

    const userTeamHaveAStadium = service.checkIfUserTeamHaveAStadium(user);

    expect(userTeamHaveAStadium).toBeTruthy();
  });

  it("user team dont have a stadium", () => {
    const user: User = {
      id: "96f35936-afd5-4d94-8a47-dfa3ac50d46b",
      name: "New User",
      email: "newuser@gmail.com",
      created_at: new Date(),
      password: "fakePassword",
      matches: [],
      team: {
        id: "f3472988-da25-4315-b01d-ba604bf5b3a9",
        complete_name: "Sport Club Corinthians Paulista",
        nickname: "Corinthians",
        city: "São Paulo",
        state: "São Paulo",
        created_at: new Date(),
        users: [],
        stadium: null,
        matchesAsOpponent: [],
      },
    };

    const userTeamHaveAStadium = service.checkIfUserTeamHaveAStadium(user);

    expect(userTeamHaveAStadium).toBeFalsy();
  });
});
