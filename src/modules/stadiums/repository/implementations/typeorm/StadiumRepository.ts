import { Repository } from "typeorm";
import Stadium from "../../../entites/Stadium";
import CreateStadiumInputDto from "../../../useCases/createStadium/dto/CreateStadiumInput.dto";
import IStadiumInterfaceRepository from "../../IStadiumRepository";
import { appDataSource } from "../../../../../config/database/typeorm/data-source";
import { v4 as uuidV4 } from "uuid";

export default class StadiumRepository implements IStadiumInterfaceRepository {
  private repository: Repository<Stadium>;

  constructor() {
    this.repository = appDataSource.getRepository(Stadium);
  }

  create(createStadiumDto: CreateStadiumInputDto): Promise<Stadium> {
    return this.repository.save({
      id: uuidV4(),
      name: createStadiumDto.name,
      public_capacity: createStadiumDto.public_capacity,
    });
  }

  findByName(name: string): Promise<Stadium | null> {
    return this.repository.findOne({ where: { name } });
  }
}
