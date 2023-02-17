const mongoClient = require('../routes/mongoConnet');
const _user = mongoClient.connect();

import { rentalFilterDataType } from '../type/rentalDataType';
import { rentalOrderDataType } from '../type/rentalDataType';
import { rentalArticeDataType } from '../type/rentalDataType';
import { rentalReviewDataType } from '../type/rentalDataType';
import { rentalCommentDataType } from '../type/rentalDataType';
import { rentalReplyDataType } from '../type/rentalDataType';
import { rentalReplyUpdateDataType } from '../type/rentalDataType';
import { rentalReplyDeleteDataType } from '../type/rentalDataType';

const mongoDB = {
  // ----------- <게시글 목록 찾기 (정렬, 필터)> -----------
  searchArticles: async (
    filter: rentalFilterDataType,
    order: rentalOrderDataType,
    keyWord: string
  ) => {
    const user = await _user;
    const articleCollection = user.db('basket').collection('article');

    let temp: string | number[] = [];
    const isAsc = order.isAsc ? 1 : -1;

    // <1. 가격 정렬 O >
    if (order.isPriceOrderOn) {
      // 가격 정렬 O + 지역 필터 O

      if (filter.activeAreas.length > 0) {
        for (let i = 0; i < filter.activeAreas.length; i++) {
          const resWithArea = await articleCollection
            .find({
              $and: [
                { 'data.areaTag': filter.activeAreas[i] },
                {
                  'data.price': {
                    $gte: filter.MinPrice,
                    $lte: filter.MaxPrice,
                  },
                },
                { 'data.openingPeriod.0': { $gte: filter.MinPeriod } },
                { 'data.openingPeriod.1': { $lte: filter.MaxPeriod } },
              ],
              $or: [
                { 'data.title': { $regex: keyWord } },
                { 'data.contents': { $regex: keyWord } },
              ],
            })
            .toArray();
          for (let j = 0; j < resWithArea.length; j++) {
            temp.push(resWithArea[j]);
          }
        }

        if (isAsc) {
          const result: string | number[] = [];
          const priceAscSort = temp.sort(function (a: number, b: number) {
            return a - b;
          });
          priceAscSort.map((val: any) => {
            result.push(val.data);
          });
          return result;
        } else {
          const result: string | number[] = [];
          const priceDescSort = temp.sort(function (a: number, b: number) {
            return b - a;
          });
          priceDescSort.map((val: any) => {
            result.push(val.data);
          });
          return result;
        }
      }

      // 가격 정렬 O + 지역 필터 X
      else {
        const resWithoutArea = await articleCollection
          .find({
            $and: [
              {
                'data.price': {
                  $gte: filter.MinPrice,
                  $lte: filter.MaxPrice,
                },
              },
              { 'data.openingPeriod.0': { $gte: filter.MinPeriod } },
              { 'data.openingPeriod.1': { $lte: filter.MaxPeriod } },
            ],
            $or: [
              { 'data.title': { $regex: keyWord } },
              { 'data.contents': { $regex: keyWord } },
            ],
          })
          .sort({ 'data.price': isAsc })
          .toArray();
        temp.push(resWithoutArea);
      }
    }

    // <2. 가격 정렬 X>
    else {
      // 가격 정렬 X + 지역 필터 O
      if (filter.activeAreas.length > 0) {
        for (let i = 0; i < filter.activeAreas.length; i++) {
          const resWithArea = await articleCollection
            .find({
              $and: [
                { 'data.areaTag': filter.activeAreas[i] },
                {
                  'data.price': {
                    $gte: filter.MinPrice,
                    $lte: filter.MaxPrice,
                  },
                },
                { 'data.openingPeriod.0': { $gte: filter.MinPeriod } },
                { 'data.openingPeriod.1': { $lte: filter.MaxPeriod } },
              ],
              $or: [
                { 'data.title': { $regex: keyWord } },
                { 'data.contents': { $regex: keyWord } },
              ],
            })
            .toArray();
          for (let j = 0; j < resWithArea.length; j++) {
            temp.push(resWithArea[j]);
          }
        }

        // 추가적인 거리순 정렬 바닐라 JS처리
        if (order.isDistanceOrderOn) {
          const flated = temp.flat();
          const standardX = parseFloat(order.lng);
          const standardY = parseFloat(order.lat);
          const getDistanceSort = flated.sort(function (a: any, b: any) {
            const ax = Math.pow(standardX - parseFloat(a.data.offsetX), 2);
            const ay = Math.pow(standardY - parseFloat(a.data.offsetY), 2);
            const bx = Math.pow(standardX - parseFloat(b.data.offsetX), 2);
            const by = Math.pow(standardY - parseFloat(b.data.offsetY), 2);
            const aVal = Math.pow(ax + ay, 0.5);
            const bVal = Math.pow(bx + by, 0.5);
            return aVal - bVal;
          });
          const result: string | number[] = [];
          getDistanceSort.map((val: any) => {
            result.push(val.data);
          });
          return result;
        }
      }

      // 가격 정렬 X + 지역 필터 X
      else {
        const resWithoutArea = await articleCollection
          .find({
            $and: [
              {
                'data.price': {
                  $gte: filter.MinPrice,
                  $lte: filter.MaxPrice,
                },
              },
              { 'data.openingPeriod.0': { $gte: filter.MinPeriod } },
              { 'data.openingPeriod.1': { $lte: filter.MaxPeriod } },
            ],
            $or: [
              { 'data.title': { $regex: keyWord } },
              { 'data.contents': { $regex: keyWord } },
            ],
          })
          .toArray();
        temp.push(resWithoutArea);
      }

      // 거리순 정렬 있을 때 바닐라 JS처리
      if (order.isDistanceOrderOn) {
        const flated = temp.flat();
        const standardX = parseFloat(order.lng);
        const standardY = parseFloat(order.lat);
        const getDistanceSort = flated.sort(function (a: any, b: any) {
          const ax = Math.pow(standardX - parseFloat(a.data.offsetX), 2);
          const ay = Math.pow(standardY - parseFloat(a.data.offsetY), 2);
          const bx = Math.pow(standardX - parseFloat(b.data.offsetX), 2);
          const by = Math.pow(standardY - parseFloat(b.data.offsetY), 2);
          const aVal = Math.pow(ax + ay, 0.5);
          const bVal = Math.pow(bx + by, 0.5);
          return aVal - bVal;
        });
        const result: string | number[] = [];
        getDistanceSort.map((val: any) => {
          result.push(val.data);
        });
        return result;
      }
    }

    const tempFlated = temp.flat();
    let result: any = [];
    tempFlated.map((val: any) => {
      result.push(val.data);
    });

    return result;
  },

  // 게시글 목록 전체
  findArticles: async () => {
    const user = await _user;
    const db = user.db('basket').collection('article');
    const foundArticles = await db.find({}).toArray();
    let result: any = [];
    foundArticles.map((val: any) => {
      result.push(val.data);
    });

    return result;
  },
  // 게시글 상세 페이지
  findArticle: async (pid: string) => {
    const user = await _user;
    const db = user.db('basket').collection('article');
    const foundArticle = await db.findOne({ 'data.articleId': pid });
    const result = foundArticle.data;
    return result;
  },
  // 게시글 작성
  insertArticle: async (data: rentalArticeDataType) => {
    const user = await _user;
    const col = user.db('basket').collection('article');
    const insertArticle = await col.insertOne({ data });
    if (insertArticle.acknowledged) {
      return { msg: '게시글 작성 완료' };
    }
  },
  // 게시글 수정
  updateArticle: async (data: rentalArticeDataType) => {
    const user = await _user;
    const col = user.db('basket').collection('article');
    const foundArticle = await col.findOne({
      'data.articleId': data.articleId,
    });
    if (foundArticle) {
      await col.updateOne(
        { 'data.articleId': data.articleId },
        {
          $set: {
            'data.title': data.title,
            'data.content': data.content,
            'data.contact': data.contact,
            'data.price': data.price,
            'data.openingHours': data.openingHours,
            'data.openingPeriod': data.openingPeriod,
            'data.openingDays': data.openingDays,
            'data.gymImg': data.gymImg,
          },
        }
      );
      return [
        { foundmsg: '게시글 수정 완료' },
        { img: foundArticle.data.gymImg },
      ];
    }
  },
  // 게시글 삭제
  deleteArticle: async (pid: string) => {
    const user = await _user;
    const db = user.db('basket').collection('article');
    const db2 = user.db('basket').collection('review');
    const DeletedArticle = await db.deleteOne({ 'data.articleId': pid });
    const DeleteReview = await db2.deleteMany({ 'data.articleId': pid });
    if (DeletedArticle && DeleteReview) {
      return { msg: '삭제 완료' };
    }
  },
  // 게시글 별 리뷰 GET
  findReview: async (pid: string) => {
    const user = await _user;
    const db = user.db('basket').collection('review');
    const foundReview = await db.find({ 'data.articleId': pid }).toArray();
    let result: string[] = [];
    foundReview.map((val: any) => {
      result.push(val.data);
    });
    return result;
  },

  // 게시글 별 리뷰 POST
  insertReview: async (data: rentalReviewDataType) => {
    const user = await _user;
    const db = user.db('basket').collection('review');
    const insertReview = await db.insertOne({ data });
    if (insertReview.acknowledged) {
      return { msg: '리뷰 작성 완료' };
    }
  },
  // 게시글 별 리뷰 UPDATE
  updateReview: async (data: rentalReviewDataType) => {
    const user = await _user;
    const db = user.db('basket').collection('review');
    const findMsg = await db.findOne({ 'data.reviewId': data.reviewId });
    if (findMsg) {
      await db.updateOne(
        { 'data.reviewId': data.reviewId },
        {
          $set: {
            'data.title': data.title,
            'data.content': data.content,
            'data.rating': data.rating,
          },
        }
      );
      const updateData = await db.findOne({
        'data.reviewId': data.reviewId,
      });
      return updateData;
    }
  },

  // 게시글 별 리뷰 Delete
  deleteReview: async (reviewId: string) => {
    const user = await _user;
    const db = user.db('basket').collection('review');
    const successMsg = await db.deleteOne({ 'data.reviewId': reviewId });
    if (successMsg.acknowledged) {
      return { msg: '리뷰 삭제 완료' };
    }
  },
  // 댓글 GET
  findComment: async (pid: string) => {
    const user = await _user;
    const db = user.db('basket').collection('comment');
    const foundComment = await db.find({ 'data.articleId': pid }).toArray();
    let result: string[] = [];
    foundComment.map((val: any) => {
      result.push(val.data);
    });
    return result;
  },

  // 댓글 POST
  insertComment: async (data: rentalCommentDataType) => {
    const user = await _user;
    const commentcol = user.db('basket').collection('comment');
    const successMsg = await commentcol.insertOne({ data });
    if (successMsg) {
      return { msg: '댓글 생성 완료' };
    }
  },

  // 댓글 수정
  updateComment: async (data: rentalCommentDataType) => {
    const user = await _user;
    const col = user.db('basket').collection('comment');
    await col.updateOne(
      { 'data.commentId': data.commentId },
      {
        $set: {
          'data.date': data.createdAt,
          'data.contents': data.contents,
        },
      }
    );
    return { msg: '수정 완료' };
  },

  //댓글 DELETE
  deleteComment: async (pid: string) => {
    const user = await _user;
    const db = user.db('basket').collection('comment');
    const successMsg = await db.deleteOne({ 'data.commentId': pid });
    if (successMsg.acknowledged) {
      return { msg: '댓글 삭제 완료' };
    }
  },
  // 답글 POST
  addInsertReply: async (data: rentalReplyDataType) => {
    const user = await _user;
    const commentCol = user.db('basket').collection('comment');
    await commentCol.updateOne(
      { 'data.commentId': data.commentId },
      {
        $push: {
          'data.replys': data,
        },
      }
    );
    return { msg: '댓글 작성 완료' };
  },
  //수정 Delete
  updateReply: async (data: rentalReplyUpdateDataType) => {
    const user = await _user;
    const col = user.db('basket').collection('comment');

    // REPLY ID

    //db에 있던 replyId와 프론트에서 보내준 replyId 비교

    const replyFound = await col.findOne({
      'data.replys.replyId': data.replyId,
    });

    let idx: number = -1;
    replyFound.data.replys.map((ele: rentalReplyUpdateDataType, i: number) => {
      if (ele.replyId == data.replyId) {
        idx = i;
      }
    });

    const contentsKey = `data.replys.${idx}.contents`;
    const createdAtKey = `data.replys.${idx}.createdAt`;

    await col.updateOne(
      {
        'data.replys.replyId': data.replyId,
      },
      {
        $set: {
          [contentsKey]: data.contents,
          [createdAtKey]: data.createdAt,
        },
      }
    );
  },

  // 답글 Delete
  deleteReply: async (data: rentalReplyDeleteDataType) => {
    const user = await _user;
    const col = user.db('basket').collection('comment');
    const Foundreply = await col.updateOne(
      { 'data.replys.commentId': data.commentId },
      {
        $pull: { 'data.replys': { replyId: data.replyId } },
      }
    );
    if (Foundreply) {
      return { msg: '답글 삭제 완료' };
    }
  },
};

module.exports = { mongoDB };
