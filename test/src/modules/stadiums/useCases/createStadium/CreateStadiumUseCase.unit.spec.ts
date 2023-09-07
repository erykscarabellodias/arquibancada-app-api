import CreateStadiumError from "../../../../../../src/modules/stadiums/errors/CreateStadiumError";
import StadiumRepository from "../../../../../../src/modules/stadiums/repository/implementations/typeorm/StadiumRepository";
import CreateStadiumUseCase from "../../../../../../src/modules/stadiums/useCases/createStadium/CreateStadiumUseCase";
import CreateStadiumInputDto from "../../../../../../src/modules/stadiums/useCases/createStadium/dto/CreateStadiumInput.dto";
import ClassValidatorValidationError from "../../../../../../src/shared/errors/classValidator/ClassValidatorValidationError";
import {
  createdStadiumMock,
  stadiumDoesNotExistsMock,
} from "../../../../../mocks/stadium/stadiumMocks";

describe("create stadium unit tests suit", () => {
  const repository = new StadiumRepository();
  const useCase = new CreateStadiumUseCase(repository);

  it("should be able to create a stadium", async () => {
    repository.create = createdStadiumMock;
    repository.findByExactName = stadiumDoesNotExistsMock;

    const dto: CreateStadiumInputDto = {
      name: "Neo Química Arena",
      public_capacity: 47000,
    };

    const newStadium = await useCase.execute(dto);

    expect(newStadium).toHaveProperty("id");
    expect(newStadium).toHaveProperty("name");
    expect(newStadium).toHaveProperty("public_capacity");
    expect(newStadium).toHaveProperty("created_at");
  });

  it("should not be able to create a stadium already registered", async () => {
    repository.findByExactName = createdStadiumMock;

    const dto: CreateStadiumInputDto = {
      name: "Neo Química Arena",
      public_capacity: 47000,
    };

    expect(async () => {
      await useCase.execute(dto);
    }).rejects.toThrow(
      new CreateStadiumError("Este estádio já está cadastrado")
    );
  });

  test.each([
    [
      { name: "", public_capacity: 47000 },
      { name: "Neo Química Arena", public_capacity: "" },
      { name: "Neo Química Arena", public_capacity: -47000 },
    ],
  ])(
    "should no be able to create a new stadium without mandatory teams",
    async (param) => {
      expect(async () => {
        await useCase.execute(param);
      }).rejects.toThrow(ClassValidatorValidationError);
    }
  );
});
