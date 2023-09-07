import Stadium from "../entites/Stadium";
import CreateStadiumInputDto from "../useCases/createStadium/dto/CreateStadiumInput.dto";

export default interface IStadiumRepository {
  create(createStadiumDto: CreateStadiumInputDto): Promise<Stadium>;
  findByExactName(name: string): Promise<Stadium | null>;
  findByName(name: string): Promise<Stadium[]>;
}
