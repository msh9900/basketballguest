const MongoClient = require('../routes/mongoConnet');
const _guest = MongoClient.connect();

import { guestDataType } from '../type/guestDataType';
import { guestCommentType } from '../type/guestDataType';
import { guestReplyType } from '../type/guestDataType';
import { guestUpdateReplyType } from '../type/guestDataType';
import { guestDBCommentType } from '../type/guestDataType';
import { guestDBReplyType } from '../type/guestDataType';

const mongoDatabase = {
  // 게스트 글 HEADER에서 찾기
  guestSerachArticle: async (pid: number, keyWord: string) => {
    const user = await _guest;
    const col = user.db('basket').collection('guestarticle');
    const findArticleCount = await col.countDocuments({
      $or: [{ title: { $regex: keyWord } }, { content: { $regex: keyWord } }],
    });

    const findGuestArticle = await col
      .find({
        $or: [{ title: { $regex: keyWord } }, { content: { $regex: keyWord } }],
      })
      .sort({ date: -1 })
      .limit(10)
      .skip(pid - 10)
      .toArray();
    console.log('data', findGuestArticle);
    return [findGuestArticle, findArticleCount];
  },

  // 게스트 글 GET
  guestfindArticle: async (number: number) => {
    const user = await _guest;
    const col = user.db('basket').collection('guestarticle');

    const findArticleCount = await col.countDocuments();
    const findArticle = await col
      .find()
      .sort({ date: -1 })
      .limit(10)
      .skip(number - 10)
      .toArray();
    return [findArticle, findArticleCount];
  },

  //게스트 글 POST
  guestInsertArticle: async (data: guestDataType) => {
    const user = await _guest;
    const col = user.db('basket').collection('guestarticle');
    const insertArticle = await col.insertOne(data);
    if (insertArticle.acknowledged) {
      return { msg: '게시글 작성 완료' };
    }
  },
  //게스트 글 PUT
  guestUpdateArticle: async (data: guestDataType) => {
    const user = await _guest;
    const col = user.db('basket').collection('guestarticle');
    const findArticleId = await col.findOne({
      contentIdx: data.contentIdx,
    });

    if (findArticleId) {
      await col.updateOne(
        { contentIdx: data.contentIdx },
        {
          $set: {
            date: data.date,
            title: data.title,
            content: data.content,
            imgSrc: data.imgSrc,
          },
        }
      );
      return [{ msg: '게시글 수정 완료' }, { img: findArticleId.imgSrc }];
    }
  },
  //게스트 글 DELETE
  guestDeleteArticle: async (contentIdx: string) => {
    const user = await _guest;
    const col = user.db('basket').collection('guestarticle');
    const successMsg = await col.deleteOne({ contentIdx: contentIdx });
    if (successMsg.acknowledged) {
      return { msg: '게시글 삭제 완료' };
    }
  },
  //게스트 댓글 GET
  findComment: async (pid: string) => {
    const user = await _guest;
    const col = user.db('basket').collection('guestarticle');
    const commentFindOne = await col.findOne({ contentIdx: pid });
    if (commentFindOne) {
      return commentFindOne;
    }
  },

  //게스트 댓글 POST
  insertComment: async (data: guestCommentType) => {
    const user = await _guest;
    const col = user.db('basket').collection('guestarticle');
    const articleFindOne = await col.findOne({
      contentIdx: data.contentIdx,
    });
    if (articleFindOne) {
      await col.updateOne(
        { contentIdx: data.contentIdx },
        {
          $push: {
            comment: {
              commentIdx: data.commentIdx,
              id: data.id,
              content: data.content,
              userImg: data.userImg,
              replys: data.replys,
              date: data.date,
            },
          },
        }
      );
    }
    return { msg: '댓글 작성완료' };
  },
  // 게스트 댓글 PUT
  updateComment: async (data: guestCommentType) => {
    const user = await _guest;
    const col = user.db('basket').collection('guestarticle');
    const commentFound = await col.findOne({
      'comment.commentIdx': data.commentIdx,
    });

    let idx: number = -1;
    commentFound.comment.map((ele: guestCommentType, i: number) => {
      if (ele.commentIdx === data.commentIdx) {
        idx = i;
      }
    });
    const contentsKey = `comment.${idx}.content`;

    const commentFindOne = await col.updateOne(
      {
        'comment.commentIdx': data.commentIdx,
      },
      {
        $set: {
          [contentsKey]: data.content,
        },
      }
    );
    if (commentFindOne.acknowledged) {
      return { msg: '댓글 수정 완료' };
    }
  },
  //게스트 댓글 DELETE
  deleteComment: async (commentIdx: string) => {
    const user = await _guest;
    const col = user.db('basket').collection('guestarticle');
    const commentFindOne = await col.updateOne(
      { 'comment.commentIdx': commentIdx },
      { $pull: { comment: { commentIdx } } }
    );
    if (commentFindOne.acknowledged) {
      return { msg: '댓글 삭제 완료' };
    }
  },

  //게스트 답글 POST
  insertReply: async (data: guestReplyType, commentIdx: string) => {
    const user = await _guest;
    const col = user.db('basket').collection('guestarticle');
    const commentFind = await col.findOne({
      'comment.commentIdx': commentIdx,
    });

    let idx: number = -1;
    commentFind.comment.map((ele: guestDBCommentType, i: number) => {
      if (ele.commentIdx === commentIdx) {
        idx = i;
      }
    });
    const commentidx = `comment.${idx}.replys`;

    const commentFindOne = await col.updateOne(
      {
        'comment.commentIdx': commentIdx,
      },
      {
        $push: {
          [commentidx]: {
            replyIdx: data.replyIdx,
            content: data.content,
            date: data.date,
            userId: data.userId,
            userImg: data.userImg,
          },
        },
      }
    );
    if (commentFindOne) {
      return { msg: '답글 작성 완료' };
    }
  },
  //게스트 답글 UPDATE
  updateReply: async (data: guestUpdateReplyType) => {
    const user = await _guest;
    const col = user.db('basket').collection('guestarticle');
    const commentFound = await col.findOne({
      'comment.commentIdx': data.commentIdx,
    });

    let commentIndex: number = -1;
    let replyIndex: number = -1;

    commentFound.comment.map((ele: guestDBCommentType, i: number) => {
      if (ele.commentIdx === data.commentIdx) {
        commentIndex = i;
      }
    });

    commentFound.comment[commentIndex].replys.map(
      (ele: guestDBReplyType, i: number) => {
        if (ele.replyIdx === data.replyIdx) {
          replyIndex = i;
        }
      }
    );

    const replyIdx = `comment.${commentIndex}.replys.${replyIndex}.replyIdx`;
    const replyContent = `comment.${commentIndex}.replys.${replyIndex}.content`;

    const replyUpdateOne = await col.updateOne(
      { [replyIdx]: data.replyIdx },
      { $set: { [replyContent]: data.content } }
    );
    if (replyUpdateOne) {
      return { msg: '답글 수정 완료' };
    }
  },

  //게스트 답글 DELETE

  deleteReply: async (commentIdx: string, replyIdx: string) => {
    const user = await _guest;
    const col = user.db('basket').collection('guestarticle');

    const commentFound = await col.findOne({
      'comment.commentIdx': commentIdx,
    });

    let commentIndex: number = -1;
    let replyIndex: number = -1;
    commentFound.comment.map((ele: guestDBCommentType, i: number) => {
      if (ele.commentIdx === commentIdx) {
        commentIndex = i;
      }
    });

    commentFound.comment[commentIndex].replys.map(
      (ele: guestDBReplyType, i: number) => {
        if (ele.replyIdx === replyIdx) {
          replyIndex = i;
        }
      }
    );

    const replyidx = `comment.${commentIndex}.replys.${replyIndex}.replyIdx`;
    const arrayresult = `comment.${commentIndex}.replys`;
    const commentUpdateOne = await col.updateOne(
      { [replyidx]: replyIdx },
      { $pull: { [arrayresult]: { replyIdx } } }
    );
    if (commentUpdateOne) {
      return { msg: '답글 삭제 완료' };
    }
  },
};
module.exports = { mongoDatabase };
