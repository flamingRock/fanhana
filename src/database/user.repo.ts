import { db } from '../config/dbconfig';
import { createUserInput, UserProfile, User } from './schemas/user.entity';

// 닉네임 중복 체크
export const checkDuplicateNickname = async (nickName: string): Promise<User> => {
  try {
    const [row]: any = await db.query(
      `
      SELECT *
      FROM user
      WHERE nickname = ?`,
      [nickName]
    );

    return row[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// email 입력시 user 정보 추출
export const getUserInfoById = async (id: number): Promise<User> => {
  try {
    const [row]: any = await db.query(
      `
      SELECT *
      FROM user
      WHERE id = ?`,
      [id]
    );
    return row[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 유저 추가
export const createUser = async (inputData: createUserInput): Promise<User> => {
  try {
    const newColumns = 'id, email, password, nickname, interest, phone, role, img';
    const newValues = Object.values(inputData)
      .map((value) => (typeof value === 'string' ? `'${value}'` : value))
      .join(', ');
    const [newUser]: any = await db.query(
      `
      INSERT INTO user (${newColumns})
      VALUES (${newValues})
      `
    );

    const createUserId = Number(inputData.id);

    const createUser = await getUserInfoById(createUserId);

    return createUser!;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

// 유저 정보 수정
export const updateUser = async (userId: number, updates: Partial<User>): Promise<User> => {
  try {
    const updateValues = Object.entries(updates)
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return `${key} = '${value}'`;
        }
        return `${key} = ${value}`;
      })
      .join(', ');

    await db.query(
      `
      UPDATE user
      SET ${updateValues}
      WHERE id = ?
      `,
      [userId]
    );

    const updatedUser = await getUserInfoById(userId);

    return updatedUser!;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 유저 정보 hard delete
export const hardDeleteUser = async (userId: number): Promise<number> => {
  try {
    await db.query(
      `DELETE FROM user
       WHERE id = ?`,
      [userId]
    );
    return userId;
  } catch (error) {
    console.log(error);
    throw new Error('[ DB 에러 ] 유저 hard 삭제 실패');
  }
};