import { Repository } from "typeorm";
import { CreatePlayerInputDto } from "../../../useCases/createPlayer/dto/CreatePlayerInputDto";
import Player from "../../Player";
import IPlayerRepository from "../IPlayerRepository";
import { appDataSource } from "../../../../../config/database/typeorm/data-source";
import { v4 as uuidV4 } from "uuid";

export default class PlayerRepository implements IPlayerRepository {
  private repository: Repository<Player>;

  constructor() {
    this.repository = appDataSource.getRepository(Player);
  }

  async create(nickname: string, complete_name: string): Promise<Player> {
    return this.repository.save({
      id: uuidV4(),
      nickname,
      complete_name,
    });
  }

  async findByNicknameAndCompleteName(
    nickname: string,
    complete_name: string
  ): Promise<Player | null> {
    return this.repository.findOne({
      where: {
        nickname,
        complete_name,
      },
    });
  }
}
