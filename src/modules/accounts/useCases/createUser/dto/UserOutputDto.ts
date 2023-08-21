import { Team } from "../../../../teams/entities/Team";

export interface UserOutputDto {
  id: string;
  name: string;
  email: string;
  team: Team | null;
}
