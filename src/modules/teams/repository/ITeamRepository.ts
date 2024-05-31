import Stadium from "../../stadiums/entites/Stadium";
import { Team } from "../entities/Team";
import CreateTeamInputDto from "../useCases/createTeam/dto/CreateTeamInputDto";

export interface ITeamRepository {
  create(createTeamDto: CreateTeamInputDto): Promise<Team>;

  checkIfExists(
    complete_name: string,
    nickname: string,
    city: string
  ): Promise<boolean>;

  findByName(name: string): Promise<Team[] | null>;

  findById(id: string): Promise<Team | null>;

  chooseStadium(team: Team, stadium: Stadium): Promise<Team>;
}
