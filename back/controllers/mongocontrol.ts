const mongoClient = require('../routes/mongoconnet')!;
const _user = mongoClient.connect();
import crypto from 'crypto';

// 해시 암호화
const createHashPassword = (password: string) => {
  const salt: any = crypto.randomBytes(64).toString('base64')!;
  const hashedPasssword = crypto
    .pbkdf2Sync(password, salt, 10, 64, 'sha512')
    .toString('base64');
  return { hashedPasssword, salt };
};

// 해시 복호화
const verfiyPassword = (password: string, salt: any, userPassword: any) => {
  const hashed = crypto
    .pbkdf2Sync(password, salt, 10, 64, 'sha512')
    .toString('base64');
  if (hashed === userPassword) return true;
  return false;
};

const mongoDB = {
  // 로그인
  setId: async (id: string, pw: string) => {
    const user = await _user;
    const db = user.db('basket').collection('login');
    const result = await db.findOne({ id });
    const decodePw = verfiyPassword(pw, result.salt, result.pw);
    if (decodePw && result) {
      return {
        id: result.id,
        email: result.email,
        userName: result.userName,
        userImg: result.userImg,
      };
    } else {
      return { msg: '로그인 실패' };
    }
  },
  // 회원가입
  incId: async (id: string, pw: string, email: string, userName: string) => {
    const user = await _user;
    const db = user.db('basket').collection('login');
    const duplicated = await db.findOne({ id, email });
    const hashPw = createHashPassword(pw);
    if (duplicated === null) {
      const result = await db.insertOne({
        id,
        pw: hashPw.hashedPasssword,
        email,
        userName,
        userImg: '',
        salt: hashPw.salt,
      });
      if (result) {
        return { msg: '회원가입 완료' };
      }
    }
    if (duplicated) {
      return {
        msg: '중복 회원 존재',
      };
    } else {
      throw new Error('통신 이상');
    }
  },
  // 프로필 페이지
  userData: async (logindata: any) => {
    const user = await _user;
    const db = user.db('basket').collection('login');
    const data = await db.findOne({ id: logindata.id });
    const hashPw = createHashPassword(logindata.pw);
    if (data) {
      const result = await db.updateOne(
        { id: logindata.id },
        {
          $set: {
            pw: hashPw.hashedPasssword,
            email: logindata.email,
            userName: logindata.userName,
            userImg: logindata.userImg,
            salt: hashPw.salt,
          },
        }
      );
      const updateData = await db.findOne({
        id: logindata.id,
        email: logindata.email,
        userName: logindata.userName,
        userImg: logindata.userImg,
      });

      return updateData;
    }
  },
  //특정 게시글 목록 찾기
  searchArticles: async (data: any) => {
    const user = await _user;
    const col = user.db('basket').collection('article');

    let temp: any = [];

    if (data.activeAreas.length > 0) {
      for (let i = 0; i < data.activeAreas.length; i++) {
        const resWithArea = await col
          .find({
            $and: [
              { 'data.areaTag': data.activeAreas[i] },
              {
                'data.price': {
                  $gte: data.MinPrice,
                  $lte: data.MaxPrice,
                },
              },
              { 'data.openingPeriod.0': { $gte: data.MinPeriod } },
              { 'data.openingPeriod.1': { $lte: data.MaxPeriod } },
            ],
          })
          .toArray();
        temp.push(resWithArea[i]);
      }
    } else {
      const resWithoutArea = await col
        .find({
          $and: [
            {
              'data.price': {
                $gte: data.MinPrice,
                $lte: data.MaxPrice,
              },
            },
            { 'data.openingPeriod.0': { $gte: data.MinPeriod } },
            { 'data.openingPeriod.1': { $lte: data.MaxPeriod } },
          ],
        })
        .toArray();
      temp.push(resWithoutArea);
    }
    console.log('temp', temp);
    return temp;
  },
  // 게시글 목록
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
  findArticle: async (pid: any) => {
    const user = await _user;
    const db = user.db('basket').collection('article');
    const foundArticle = await db.findOne({ 'data.articleId': pid });
    const result = foundArticle.data;
    return result;
  },
  // 게시글 작성
  insertArticle: async (data: any) => {
    const user = await _user;
    const col = user.db('basket').collection('article');
    const insertArticle = await col.insertOne({ data });
    if (insertArticle.acknowledged) {
      return { msg: '게시글 작성 완료' };
    }
  },
  // 게시글 수정
  updateArticle: async (data: any) => {
    const user = await _user;
    const db = user.db('basket').collection('article');
    const foundArticle = await db.findOne({ 'data.articleId': data.articleId });

    data.PeriodStart = new Date(new Date(data.openingDays[0]).toISOString());
    data.PeriodEnd = new Date(new Date(data.openingDays[1]).toISOString());

    if (foundArticle) {
      await db.updateOne(
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
            'data.periodStart': data.PeriodStart,
            'data.PeriodEnd': data.PeriodEnd,
            'data.userImg': data.userImg,
          },
        }
      );
      return { msg: '게시글 수정 완료' };
    }
  },
  // 게시글 삭제
  deleteArticle: async (pid: any) => {
    const user = await _user;
    const db = user.db('basket').collection('article');
    const db2 = user.db('basket').collection('review');
    const DeletedArticle = await db.deleteOne({ 'data.articleId': pid });
    const DeleteReview = await db2.deleteMany({ 'data.articleId': pid });
    if (DeletedArticle && DeleteReview) {
      return { msg: '삭제 완료' };
    }
  },

  // 게시글 별 리뷰 POST
  insertReview: async (data: any) => {
    const user = await _user;
    const db = user.db('basket').collection('review');
    const insertReview = await db.insertOne({ data });
    if (insertReview.acknowledged) {
      return { msg: '리뷰 작성 완료' };
    }
  },
  // 게시글 별 리뷰 UPDATE
  updateReview: async (data: any) => {
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
        'data.reviewId': data.ReviewId,
      });
      return updateData;
    }
  },
  // 게시글 별 리뷰 GET
  findReview: async (pid: any) => {
    const user = await _user;
    const db = user.db('basket').collection('review');
    const foundReview = await db.find({ 'data.articleId': pid }).toArray();
    let result: any = [];
    foundReview.map((val: any) => {
      result.push(val.data);
    });
    return result;
  },

  // 게시글 별 리뷰 Delete
  deleteReview: async (reviewId: any) => {
    const user = await _user;
    const db = user.db('basket').collection('review');
    const successMsg = await db.deleteOne({ 'data.reviewId': reviewId });
    if (successMsg.acknowledged) {
      return { msg: '리뷰 삭제 완료' };
    }
  },

  // 댓글 POST
  insertComment: async (data: any) => {
    const user = await _user;
    const commentdb = user.db('basket').collection('comment');
    const articledb = user.db('basket').collection('article');
    const successMsg = await commentdb.insertOne({ data });
    const findCommentId = await commentdb.findOne({
      'data.userId': data.userId,
    });
    const findarticleId = await articledb.findOne({
      'data.userId': data.userId,
    });
    if (findarticleId?.data.userId === findCommentId?.data.userId) {
      await commentdb.update(
        { 'data.userId': data.userId },
        {
          $set: {
            'data.isCreater': true,
          },
        }
      );
      return { msg: '작성자 일치' };
    } else {
      return { msg: '댓글 작성 완료' };
    }
  },

  // 댓글 GET
  findComment: async (pid: any) => {
    const user = await _user;
    const db = user.db('basket').collection('comment');
    const foundComment = await db.find({ 'data.articleId': pid }).toArray();
    let result: any = [];
    foundComment.map((val: any) => {
      result.push(val.data);
    });
    return result;
  },
  // 댓글 수정
  updateComment: async (data: any) => {
    const user = await _user;
    const col = user.db('basket').collection('comment');
    const updatedComment = await col.findOne({
      'data.commentId': data.commentId,
    });
    if (updatedComment) {
      await col.updateOne(
        { 'data.commentId': data.commentId },
        {
          $set: {
            'data.date': data.date,
            'data.contents': data.contents,
          },
        }
      );
      const updateCommentData = await col.findOne({
        'data.commentId': data.commentId,
      });
      return updateCommentData;
    }
  },

  //댓글 POST
  deleteComment: async (pid: any) => {
    const user = await _user;
    const db = user.db('basket').collection('comment');
    const successMsg = await db.deleteOne({ 'data.commentId': pid });
    if (successMsg.acknowledged) {
      return { msg: '댓글 삭제 완료' };
    }
  },
  //답글 추가 POST
  addInsertComment: async (data: any) => {
    const user = await _user;
    const commentCol = user.db('basket').collection('comment');
    const articleCol = user.db('basket').collection('article');
    const foundCommentuserId = await commentCol.findOne({
      'data.userId': data.userId,
    });
    const foundArticleuserId = await articleCol.findOne({
      'data.userId': data.userId,
    });
    const foundCommentcommentId = await commentCol.findOne({
      'data.commentId': data.commentId,
    });

    if (
      foundArticleuserId?.data.userId === foundCommentuserId?.data.userId &&
      foundCommentcommentId
    ) {
      data.isCreater = true;

      await commentCol.updateOne(
        { 'data.commentId': data.commentId },
        {
          $push: {
            'data.replys': data,
          },
        }
      );
      return { msg: '작성자 일치' };
    } else {
      await commentCol.updateOne(
        { 'data.commentId': data.commentId },
        {
          $push: {
            'data.replys': data,
          },
        }
      );
      return { msg: '댓글 작성 완료' };
    }
  },
};

module.exports = { mongoDB };
