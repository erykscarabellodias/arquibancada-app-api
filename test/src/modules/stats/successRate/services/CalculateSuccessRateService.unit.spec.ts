import CalculateSuccessRateService from "../../../../../../src/modules/stats/services/CalculateSuccessRateService";
import SuccessRateError from "../../../../../../src/modules/stats/useCases/successRate/errors/SuccessRateError";

describe("calculate success rate service unit tests suit", () => {
  const service = new CalculateSuccessRateService();

  it("should not to be able to calculate a different total numbers match and total results", () => {
    expect(() => {
      service.calculate(10, 0, 0, 11);
    }).toThrow(
      new SuccessRateError(
        "Seu total de jogos difere dos resultados registrados"
      )
    );
  });

  it("should be able to have 0% of success rate", () => {
    const successRate = service.calculate(0, 0, 5, 5);

    expect(successRate).toBe("0.00");
  });

  it("should be able to calculate success rate", () => {
    const successRate = service.calculate(17, 5, 2, 24);

    expect(successRate).toBe("77.78");
  });
});
