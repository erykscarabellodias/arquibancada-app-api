import { ILike, Repository } from "typeorm";
import { Team } from "../../../entities/Team";
import { appDataSource } from "../../../../../config/database/typeorm/data-source";
import { ITeamRepository } from "../../ITeamRepository";
import CreateTeamInputDto from "../../../useCases/createTeam/dto/CreateTeamInputDto";
import { v4 as uuidV4 } from "uuid";

export class TeamRepository implements ITeamRepository {
  private repository: Repository<Team>;

  constructor() {
    this.repository = appDataSource.getRepository(Team);
  }

  async create(createTeamDto: CreateTeamInputDto): Promise<Team> {
    return this.repository.save({
      id: uuidV4(),
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

  async findByName(name: string): Promise<Team[] | null> {
    const teams = await this.repository.find({
      where: [
        {
          complete_name: ILike(`%${name}%`),
        },
        { nickname: ILike(`%${name}%`) },
      ],
    });

    return teams;
  }

  async findById(id: string): Promise<Team | null> {
    const team = await this.repository.findOne({
      where: {
        id,
      },
    });

    return team;
  }
}
