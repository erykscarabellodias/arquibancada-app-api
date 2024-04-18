import { Repository } from "typeorm";
import MatchScorer from "../../entities/MatchScorer";
import { appDataSource } from "../../../../config/database/typeorm/data-source";
import IMatchScorerRepository from "../IMatchScorerRepository";
import Match from "../../entities/Match";
import { v4 as uuidV4 } from "uuid";
import SaveScorerDto from "../../registerMatch/dto/SaveScorersDto";

export default class MatchScorerRepository implements IMatchScorerRepository {
  private repository: Repository<MatchScorer>;

  constructor() {
    this.repository = appDataSource.getRepository(MatchScorer);
  }

  async registerMatchScorer(
    match: Match,
    scorer: SaveScorerDto
  ): Promise<void> {
    this.repository.save({
      id: uuidV4(),
      match,
      scorer: scorer.scorer,
      ownGoal: scorer.ownGoal,
    });
  }
}
