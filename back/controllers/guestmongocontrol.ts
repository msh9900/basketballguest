const mongoClient = require('../routes/mongoconnet')!;
const _user = mongoClient.connect();

const mongoDB = {
  // 게스트 글 GET
  guestfindArticle: async () => {
    const user = await _user;
    const col = user.db('basket').collection('guestarticle');
    const findArticle = await col.find().toArray();
    return findArticle;
  },
  //게스트 글 POST
  guestInsertArticle: async (data: any) => {
    const user = await _user;
    const col = user.db('basket').collection('guestarticle');
    const insertArticle = await col.insertOne(data);
    if (insertArticle.acknowledged) {
      return { msg: '게시글 작성 완료' };
    }
  },
  //게스트 글 PUT
  guestUpdateArticle: async (data: any) => {
    const user = await _user;
    const col = user.db('basket').collection('guestarticle');
    const findArticleId = await col.findOne({
      contentidx: data.contentidx,
    });
    if (findArticleId) {
      await col.updateOne(
        { contentidx: data.contentidx },
        {
          $set: {
            'data.title': data.title,
            'data.content': data.content,
            'data.imgSrc': data.imgSrc,
          },
        }
      );
      const updateArticleData = await col.findOne({
        contentidx: data.contentidx,
      });
      return updateArticleData;
    }
  },
  //게스트 글 DELETE
  guestDeleteArticle: async (contentidx: string) => {
    const user = await _user;
    const col = user.db('basket').collection('guestarticle');
    const successMsg = await col.deleteOne({ contentidx: contentidx });
    if (successMsg.acknowledged) {
      return { msg: '게시글 삭제 완료' };
    }
  },
  //게스트 댓글 GET
  findComment: async (data: any) => {
    const user = await _user;
    const col = user.db('basket').collection('guestarticle');
    const commentFindOne = await col.findOne({ contentidx: data });
    if (commentFindOne) {
      return commentFindOne;
    }
  },

  //게스트 댓글 POST
  insertComment: async (data: any) => {
    const user = await _user;
    const col = user.db('basket').collection('guestarticle');
    const articleFindOne = await col.findOne({
      contentidx: data.contentidx,
    });
    if (articleFindOne) {
      await col.updateOne(
        { contentidx: data.contentidx },
        {
          $push: {
            comment: {
              commentidx: data.commentidx,
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
    const user = await _user;
    const col = user.db('basket').collection('guestarticle');
    const commentFound = await col.findOne({
      'comment.commentidx': data.commentidx,
    });

    console.log('test', commentFound);

    let idx: any;
    commentFound.comment.map((ele: any, i: any) => {
      if (ele.commentidx === data.commentidx) {
        idx = i;
      }
    });
    const contentsKey = `comment.${idx}.content`;
    console.log('test', contentsKey);

    const commentFindOne = await col.updateOne(
      {
        'comment.commentidx': data.commentidx,
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
  deleteComment: async (commentidx: any) => {
    const user = await _user;
    const col = user.db('basket').collection('guestarticle');
    const commentFindOne = await col.updateOne(
      { 'comment.commentidx': commentidx },
      { $pull: { comment: { commentidx } } }
    );
    if (commentFindOne.acknowledged) {
      return { msg: '댓글 삭제 완료' };
    }
  },
};
module.exports = { mongoDB };
