import { User } from "../entities/User";

export default class CheckIfUserHaveATeamService {
  checkIfUserHaveATeam(user: User): boolean {
    if (user.team === null) {
      return false;
    }

    return true;
  }
}
