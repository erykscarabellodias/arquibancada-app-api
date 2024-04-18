import Match from "../entities/Match";
import SaveScorersDto from "../registerMatch/dto/SaveScorersDto";

export default interface IMatchScorerRepository {
  registerMatchScorer(match: Match, scorers: SaveScorersDto): Promise<void>;
}
