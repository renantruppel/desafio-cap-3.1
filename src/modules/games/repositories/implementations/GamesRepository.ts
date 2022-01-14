import { count } from 'console';
import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { UsersRepository } from '../../../users/repositories/implementations/UsersRepository';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {

    return this.repository
      .createQueryBuilder("games")
      //.where("games.title like '%' || :title || '%'", {title: param })
      .where("LOWER(games.title) like :title", {title: '%' + param.toLowerCase() + '%' })
      .getMany()

  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query('select count(*) from games'); // raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return this.repository
    .createQueryBuilder('game')
    .where("game.id = :id", { id })
    .relation(Game, 'users')
    .of(id)
    .loadMany();
      // query builder
  }
}
