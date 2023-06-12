import express from 'express';
import * as shortController from '../controller/shorts.controller';
import { isAccessTokenValid } from '../middleware/jwt';
import { uploadShorts } from '../middleware/multer';

export const shortsRoute = express();

// 최신순 목록 조회
shortsRoute.get('/', shortController.getShortsListHandler);

// 쇼츠 상세 조회
shortsRoute.get('/detail', isAccessTokenValid, shortController.getShortsHandler);

// 쇼츠 등록 (로그인 필요)
shortsRoute.post('/', isAccessTokenValid, uploadShorts, shortController.addShortsHandler);

// 쇼츠 삭제 (로그인 필요)
shortsRoute.delete('/:shorts_id', isAccessTokenValid, shortController.removeShortsHandler);
