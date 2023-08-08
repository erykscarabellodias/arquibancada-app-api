import { Repository } from "typeorm";
import { Team } from "../../../entities/Team";
import { appDataSource } from "../../../../../config/database/typeorm/data-source";
import { ITeamRepository } from "../../ITeamRepository";
import CreateTeamInputDto from "../../../useCases/createTeam/dto/CreateTeamInputDto";

export class TeamRepository implements ITeamRepository {
  private repository: Repository<Team>;

  constructor() {
    this.repository = appDataSource.getRepository(Team);
  }

  async create(createTeamDto: CreateTeamInputDto): Promise<Team> {
    return this.repository.create({
      complete_name: createTeamDto.complete_name,
      nickname: createTeamDto.nickname,
      city: createTeamDto.city,
      state: createTeamDto.state,
    });
  }

  async checkIfExists(
    complete_name: string,
    nickname: string,
    state: string,
    city: string
  ): Promise<boolean> {
    const team = await this.repository.findOne({
      where: {
        complete_name,
        nickname,
        state,
        city,
      },
    });

    if (team) {
      return true;
    }

    return false;
  }
}
