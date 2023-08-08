import { Team } from "../../../entities/Team";

export default class CreateTeamOutputDto {
  constructor(team: Team) {
    this.id = team.id;
    this.complete_name = team.complete_name;
    this.nickname = team.nickname;
    this.state = team.state;
    this.city = team.city;
  }

  id: string;
  complete_name: string;
  nickname: string;
  state: string;
  city: string;
}
