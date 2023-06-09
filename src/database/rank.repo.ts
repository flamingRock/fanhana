import { db } from '../config/dbconfig';

// 종목 별 시즌 조회
export const findSeasonByCategory = async (category: number): Promise<any> => {
  try {
    const [row]: any = await db.query(
      `SELECT DISTINCT r.season
      FROM \`rank\` r
      JOIN team t On t.id = r.team_id
      WHERE t.category = ? `,
      [category]
    );
    
    return row;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 해당 종목의 시즌인가 확인
//Todo: controller에서 findSeasonByCategory함수를 사용해 나온 값중에서 season이 있는지 확인했는데 이를 repo에서 sql문을 사용해서 체크하는게 나은지 모르겠음

// 종목, 시즌 별 팀 순위
export const findRankByCategory = async (category: number, season: string): Promise<any> => {
  try {
    const [row]: any = await db.query(
      `SELECT (SELECT COUNT(*) + 1 FROM sports.rank r2 WHERE r2.season = r.season AND (r2.wins > r.wins OR (r2.wins = r.wins AND r2.points > r.points))) AS rating
      ,t.category, r.season, r.team_id, t.name AS team_name, t.img, r.wins, r.losses, r.drawns, r.scored, r.conceded, r.points     
      FROM \`rank\` r
      JOIN team t On t.id = r.team_id
      WHERE t.category = ? and r.season =?
      ORDER BY r.wins DESC, r.points DESC`,
      [category, season]
    );

    return row;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
