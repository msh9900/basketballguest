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

  // ----------- <게시글 목록 찾기 (정렬, 필터)> -----------
  searchArticles: async (filter: any, order: any, keyWord:string) => {
    const user = await _user;
    const articleCollection = user.db('basket').collection('article');

    let temp: any = [];
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
            .sort({ 'data.price': isAsc })
            .toArray();
          for (let j = 0; j < resWithArea.length; j++) {
            temp.push(resWithArea[j]);
          }
          
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
          const result: any = [];
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
        const result: any = [];
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
            'data.userImg': data.gymImg,
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
    const commentcol = user.db('basket').collection('comment');
    const articlecol = user.db('basket').collection('article');
    const successMsg = await commentcol.insertOne({ data });
    if (successMsg) {
      return { msg: '댓글 생성 완료' };
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
    const foundComment = await col.updateOne(
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
  deleteComment: async (pid: any) => {
    const user = await _user;
    const db = user.db('basket').collection('comment');
    const successMsg = await db.deleteOne({ 'data.commentId': pid });
    if (successMsg.acknowledged) {
      return { msg: '댓글 삭제 완료' };
    }
  },
  // 답글 POST
  addInsertReply: async (data: any) => {
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
  updateReply: async (data: any) => {
    console.log('몽고 수정 진입 data', data);
    const user = await _user;
    const col = user.db('basket').collection('comment');

    // REPLY ID

    //db에 있던 replyId와 프론트에서 보내준 replyId 비교

    const replyFound = await col.findOne({
      'data.replys.replyId': data.replyId,
    });

    let idx: any;
    replyFound.data.replys.map((ele: any, i: any) => {
      if (ele.replyId == data.replyId) {
        idx = i;
      }
    });

    const contentsKey = `data.replys.${idx}.contents`;
    const createdAtKey = `data.replys.${idx}.createdAt`;

    const Foundreply = await col.updateOne(
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
  deleteReply: async (data: any) => {
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
