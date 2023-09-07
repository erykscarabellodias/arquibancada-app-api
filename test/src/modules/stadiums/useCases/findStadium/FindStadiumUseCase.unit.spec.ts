import FindStadiumError from "../../../../../../src/modules/stadiums/errors/FindStadiumError";
import StadiumRepository from "../../../../../../src/modules/stadiums/repository/implementations/typeorm/StadiumRepository";
import FindStadiumUseCase from "../../../../../../src/modules/stadiums/useCases/findStadium/FindStadiumUseCase";
import FindStadiumInputDto from "../../../../../../src/modules/stadiums/useCases/findStadium/dto/FindStadiumInputDto";
import ClassValidatorValidationError from "../../../../../../src/shared/errors/classValidator/ClassValidatorValidationError";
import {
  createdStadiumsListMock,
  returnEmptyStadiumList,
} from "../../../../../mocks/stadium/stadiumMocks";

describe("find team use case unit test suit", () => {
  const repository = new StadiumRepository();
  const useCase = new FindStadiumUseCase(repository);

  it("should be able to find a stadium", async () => {
    repository.findByName = createdStadiumsListMock;
    const dto: FindStadiumInputDto = {
      name: "Arena",
    };

    const stadiums = await useCase.execute(dto);

    expect(stadiums).toHaveLength(2);
    expect(stadiums[0]).toHaveProperty("name");
    expect(stadiums[0]).toHaveProperty("public_capacity");
  });

  it("should to return empty array if search doesn't find matches", async () => {
    repository.findByName = returnEmptyStadiumList;
    const dto: FindStadiumInputDto = {
      name: "Arena",
    };

    const stadiums = await useCase.execute(dto);

    expect(stadiums).toHaveLength(0);
  });

  it("should not be able to find a stadium with less than 3 letters", async () => {
    repository.findByName = createdStadiumsListMock;
    const dto: FindStadiumInputDto = {
      name: "Ar",
    };

    expect(async () => {
      await useCase.execute(dto);
    }).rejects.toThrow(ClassValidatorValidationError);
  });

  it("should not be able to find a stadium with empty content", async () => {
    repository.findByName = createdStadiumsListMock;
    const dto: FindStadiumInputDto = {
      name: "",
    };

    expect(async () => {
      await useCase.execute(dto);
    }).rejects.toThrow(ClassValidatorValidationError);
  });
});
