import Stadium from "../../../src/modules/stadiums/entites/Stadium";
import StadiumRepository from "../../../src/modules/stadiums/repository/implementations/typeorm/StadiumRepository";
import CreateStadiumInputDto from "../../../src/modules/stadiums/useCases/createStadium/dto/CreateStadiumInput.dto";

const createStadiums = async (): Promise<Stadium> => {
  const stadiumRepository = new StadiumRepository();

  const neoQuimicaArena: CreateStadiumInputDto = {
    name: "Neo Química Arena",
    public_capacity: 47000,
  };

  const arenaMrv: CreateStadiumInputDto = {
    name: "Arena MRV",
    public_capacity: 46000,
  };

  const createdNeoQuimicaArena = await stadiumRepository.create(
    neoQuimicaArena
  );

  await stadiumRepository.create(arenaMrv);

  return createdNeoQuimicaArena;
};

export default createStadiums;
