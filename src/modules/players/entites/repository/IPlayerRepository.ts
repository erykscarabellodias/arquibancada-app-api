import Player from "../Player";

export default interface IPlayerRepository {
  create(nickname: string, complete_name: string): Promise<Player>;
  findByNicknameAndCompleteName(
    nickname: string,
    complenteName: string
  ): Promise<Player | null>;
  findById(id: string): Promise<Player | null>;
}
