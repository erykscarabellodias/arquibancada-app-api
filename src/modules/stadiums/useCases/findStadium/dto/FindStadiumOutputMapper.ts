import Stadium from "../../../entites/Stadium";
import FindStadiumOutputDto from "./FindStadiumOutputDto";

export default class FindStadiumOutputMapper {
  public static toMap(foundedStadiums: Stadium[] | null) {
    const stadiums: FindStadiumOutputDto[] = [];

    if (foundedStadiums) {
      foundedStadiums.forEach((stadium) => {
        stadiums.push({
          id: stadium.id,
          name: stadium.name,
          public_capacity: stadium.public_capacity,
        });
      });
    }

    return stadiums;
  }
}
