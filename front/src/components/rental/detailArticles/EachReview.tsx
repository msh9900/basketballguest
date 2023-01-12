import cls from './EachReview.module.scss';

const dummyReviews = [
  {
    userName: 'Andrew',
    profileImg: 'A',
    createdDate: '2023-10-10',
    contents: '비싼 값 합니다.',
    ratings: '3',
  },
  {
    userName: 'Brian',
    profileImg: 'B',
    createdDate: '2023-10-10',
    contents: '가기도 나쁘고 별로였습니다.',
    ratings: '2',
  },
  {
    userName: 'Chris',
    profileImg: 'C',
    createdDate: '2023-10-10',
    contents: '좋은 곳입니다',
    ratings: '5',
  },
];

const EachReview = () => {
  return (
    <div className={cls.EachReviewLayout}>
      {dummyReviews.map((e, i) => (
        <div key={i} className={cls.reviewContents}>
          <div className={cls.profileSection}>
            <div>Img</div>
            <div>{e.userName}</div>
          </div>
          <div className={cls.detailInfos}>
            <div>{e.createdDate}</div>
            <div>{e.contents}</div>
            <div>{e.ratings}점</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EachReview;
