import { User } from "../../accounts/entities/User";

export default class CheckIfUserTeamHaveAStadiumService {
  checkIfUserTeamHaveAStadium(user: User): boolean {
    if (user.team?.stadium !== null) {
      return true;
    }

    return false;
  }
}
