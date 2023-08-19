import { Team } from "../../../entities/Team";
import { FindTeamOutputDto } from "./FindTeamOutputDto";

export class TeamsOutputMapperDto {
  public static toMap(foundedTeams: Team[] | null) {
    const teams: FindTeamOutputDto[] = [];

    if (foundedTeams) {
      foundedTeams.forEach((team) => {
        teams.push({ id: team.id, complete_name: team.complete_name });
      });
    }

    return teams;
  }
}
