import { Request, Response, NextFunction } from 'express';
import * as postService from '../services/post.service';
import { AppError } from '../../../back/src/utils/errorHandler';
import {env} from '../config/envconfig';
import { createPostInput, updatePostInput } from '../models/post';

// 메인페이지 게시글 조회
export const getPostMainHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = Number(req.params.category);
    if (category === undefined) throw new AppError(400, 'category를 입력해주세요.');

    const posts = await postService.getPostsMain(category);

    res.status(200).json({ message: '메인페이지 게시글 조회 성공', data: posts });
  } catch (error: any) {
    if (error instanceof AppError) {
      if (error.statusCode === 404 || error.statusCode === 400) console.log(error);
      next(error);
    } else {
      console.log(error);
      next(new AppError(500, '[ HTTP 요청 에러 ] 메인페이지 게시글 조회 실패'));
    }
  }
};

// 카테고리 별 게시글 목록 조회
export const getPostsByCategoryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = Number(req.params.category);
    if (category === undefined) throw new AppError(400, 'category를 입력해주세요.');

    const posts = await postService.getPostsByCategory(category);

    res.status(200).json({ message: '종목 별 게시글 목로 조회 성공', data: posts });
  } catch (error: any) {
    if (error instanceof AppError) {
      if (error.statusCode === 404 || error.statusCode === 400) console.log(error);
      next(error);
    } else {
      console.log(error);
      next(new AppError(500, '[ HTTP 요청 에러 ] 카테고리별 게시글 목록 조회 실패'));
    }
  }
};

// 게시글 상세 조회
export const getPostHandler = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user.user_id;
  try {
    const postId = Number(req.params.post_id);
    if (postId === null) throw new AppError(400, '게시글 ID를 입력해주세요.');

    const post = await postService.getPost(postId,userId);

    res.status(200).json({ message: '게시글 상세 조회 성공', data: post });
  } catch (error: any) {
    if (error instanceof AppError) {
      if (error.statusCode === 404 || error.statusCode === 400) console.log(error);
      next(error);
    } else {
      console.log(error);
      next(new AppError(500, '[ HTTP 요청 에러 ] 게시글 조회 실패'));
    }
  }
};

// 게시글 등록
export const addPostHandler = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user.user_id;
  if (userId === null && userId ===0) throw new AppError(400, '회원 ID가 필요합니다.');
  try {
    const { category, title, content } = req.body;
    const imgFileRoot = `${env.STATIC_PATH}/img/${req.file?.filename}`;


    if (!category || !title || !content)
      throw new AppError(400, '요청 body에 모든 정보를 입력해주세요.');

    const postData: createPostInput = {
      user_id: userId,
      category,
      title,
      content,
      img: imgFileRoot,
    };
    console.log(postData);
    const createPost = await postService.addPost(postData);

    res.status(200).json({ message: '게시글 등록성공', data: createPost });
  } catch (error: any) {
    if (error instanceof AppError) {
      if (error.statusCode === 400) console.log(error);
      next(error);
    } else {
      console.log(error);
      next(new AppError(500, '[ HTTP 요청 에러 ] 게시글 등록 실패'));
    }
  }
};

// 게시글 수정
export const editPostHandler = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user.user_id;
  if (userId === null && userId ===0) throw new AppError(400, '회원 ID가 필요합니다.');
  try {
    const post_id = Number(req.params.post_id);
    const { title, content } = req.body;

    if (!title && !content )
      throw new AppError(400, '수정된 값이 없습니다.');

    const imgFileRoot = `${env.STATIC_PATH}/img/${req.file?.filename}`;

    if (post_id === undefined) throw new AppError(400, 'post_id를 입력해주세요.');

    const postData: updatePostInput = {
      title,
      content,
      img: imgFileRoot,
    };

    const updatedPost = await postService.editPost(post_id, postData, userId);

    res.status(200).json({ message: '게시글 수정 성공', data: updatedPost });
  } catch (error: any) {
    if (error instanceof AppError) {
      if (error.statusCode === 404 || error.statusCode === 400) console.log(error);
      next(error);
    } else {
      console.log(error);
      next(new AppError(500, '[ HTTP 요청 에러 ] 게시글 수정 실패'));
    }
  }
};

// 게시글 삭제
export const removePostHandler = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user.user_id;
  if (userId === null && userId ===0) throw new AppError(400, '회원 ID가 필요합니다.');
  try {
    const { post_id } = req.params;

    if (post_id === undefined) throw new AppError(400, 'post_id를 입력해주세요.');

    const deletedPost = await postService.removePost(Number(post_id), userId);

    res.status(200).json({ message: '게시글 삭제 성공', data: { post_id: deletedPost } });
  } catch (error: any) {
    if (error instanceof AppError) {
      if (error.statusCode === 404 || error.statusCode === 400) console.log(error);
      next(error);
    } else {
      console.log(error);
      next(new AppError(500, '[ HTTP 요청 에러 ] 게시글 삭제 실패'));
    }
  }
};

// 게시글 신고
export const reportPostHandler = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user.user_id;
  if (userId === null && userId ===0) throw new AppError(400, '회원 ID가 필요합니다.');
  try {
    const post_id = Number(req.params.post_id);

    if (post_id === undefined) throw new AppError(400, 'post_id를 입력해주세요.');

    const reportPostId = await postService.reportPost(post_id);

    res.status(200).json({ message: '게시글 신고 성공', data: { post_id: reportPostId } });
  } catch (error: any) {
    if (error instanceof AppError) {
      if (error.statusCode === 404 || error.statusCode === 400) console.log(error);
      next(error);
    } else {
      console.log(error);
      next(new AppError(500, '[ HTTP 요청 에러 ] 게시글 신고 실패'));
    }
  }
};
