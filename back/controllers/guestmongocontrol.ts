const guestMongoClient = require('../routes/mongoconnet')!;
const _guest = guestMongoClient.connect();

const mongoDatabase = {
  // 게스트 글 HEADER에서 찾기
  guestSerachArticle: async (keyWord: string, item: string) => {
    const user = await _guest;
    const col = user.db('basket').collection('guestarticle');
    const findGuestArticle = await col
      .find({
        $or: [{ title: { $regex: keyWord } }, { content: { $regex: keyWord } }],
      })
      .toArray();
    return findGuestArticle;
  },
  // 게스트 글 GET
  guestfindArticle: async () => {
    const user = await _guest;
    const col = user.db('basket').collection('guestarticle');
    const findArticle = await col.find().sort({ date: -1 }).toArray();
    return findArticle;
  },
  //게스트 글 POST
  guestInsertArticle: async (data: any) => {
    const user = await _guest;
    const col = user.db('basket').collection('guestarticle');
    const insertArticle = await col.insertOne(data);
    if (insertArticle.acknowledged) {
      return { msg: '게시글 작성 완료' };
    }
  },
  //게스트 글 PUT
  guestUpdateArticle: async (data: any) => {
    console.log('db 진입 데이터', data);
    const user = await _guest;
    const col = user.db('basket').collection('guestarticle');
    const findArticleId = await col.findOne({
      contentIdx: data.contentIdx,
    });
    console.log('찾은 데이터', findArticleId);
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
      return { msg: '게시글 수정 완료' };
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
  findComment: async (data: any) => {
    const user = await _guest;
    const col = user.db('basket').collection('guestarticle');
    const commentFindOne = await col.findOne({ contentIdx: data });
    if (commentFindOne) {
      return commentFindOne;
    }
  },

  //게스트 댓글 POST
  insertComment: async (data: any) => {
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
              //시간 타입 확인하기
              date: data.date,
            },
          },
        }
      );
    }
    return { msg: '댓글 작성완료' };
  },
  // 게스트 댓글 PUT
  updateComment: async (data: any) => {
    console.log('게시글 수정 진입', data);
    const user = await _guest;
    const col = user.db('basket').collection('guestarticle');
    const commentFound = await col.findOne({
      'comment.commentIdx': data.commentIdx,
    });

    let idx: any;
    commentFound.comment.map((ele: any, i: any) => {
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
  deleteComment: async (commentIdx: any) => {
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
  insertReply: async (data: any, commentIdx: any) => {
    const user = await _guest;
    const col = user.db('basket').collection('guestarticle');
    const commentFind = await col.findOne({
      'comment.commentIdx': commentIdx,
    });
    let idx: any;
    commentFind.comment.map((ele: any, i: any) => {
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
  updateReply: async (data: any) => {
    const user = await _guest;
    const col = user.db('basket').collection('guestarticle');
    const commentFound = await col.findOne({
      'comment.commentIdx': data.commentIdx,
    });
    let commentIndex: any;
    let replyIndex: any;
    commentFound.comment.map((ele: any, i: any) => {
      if (ele.commentIdx === data.commentIdx) {
        commentIndex = i;
      }
    });
    commentFound.comment[commentIndex].replys.map((ele: any, i: any) => {
      if (ele.replyIdx === data.replyIdx) {
        replyIndex = i;
      }
    });
    const replyidx = `comment.${commentIndex}.replys.${replyIndex}.replyIdx`;
    const replyUpdateOne = await col.updateOne(
      { [replyidx]: data.replyIdx },
      { $set: { [replyidx]: { content: data.content } } }
    );
    if (replyUpdateOne) {
      return { msg: '답글 수정 완료' };
    }
  },

  //게스트 답글 DELETE

  deleteReply: async (commentIdx: any, replyIdx: any) => {
    const user = await _guest;
    const col = user.db('basket').collection('guestarticle');

    const commentFound = await col.findOne({
      'comment.commentIdx': commentIdx,
    });
    let commentIndex: any;
    let replyIndex: any;
    commentFound.comment.map((ele: any, i: any) => {
      if (ele.commentIdx === commentIdx) {
        commentIndex = i;
      }
    });

    commentFound.comment[commentIndex].replys.map((ele: any, i: any) => {
      if (ele.replyIdx === replyIdx) {
        replyIndex = i;
      }
    });

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
