import { Repository } from "typeorm";
import Tournament from "../../../entities/Tournament";
import CreateTournamentInputDto from "../../../useCases/createTournament/dto/CreateTournamentInputDto";
import ITournamentRepository from "../../ITournamentRepository";
import { appDataSource } from "../../../../../config/database/typeorm/data-source";
import { v4 as uuidV4 } from "uuid";

export default class TournamentRepository implements ITournamentRepository {
  private repository: Repository<Tournament>;

  constructor() {
    this.repository = appDataSource.getRepository(Tournament);
  }

  async create(
    createTournamentInputDto: CreateTournamentInputDto
  ): Promise<Tournament> {
    const { name } = createTournamentInputDto;

    return await this.repository.save({
      id: uuidV4(),
      name,
      created_at: new Date(),
    });
  }

  async findByName(name: string): Promise<Tournament | null> {
    return this.repository.findOne({ where: { name } });
  }

  list(): Promise<Tournament[]> {
    return this.repository.find({ order: { name: "ASC" } });
  }
}
