import cls from './EachReview.module.scss';

const dummyReviews = [
  {
    userName: 'Andrew',
    profileImg: 'A',
    createdDate: '2023-10-10',
    contents: '비싼 값 합니다.',
    ratings: '3.5',
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
  const renderStars = (str: string) => {
    const num = Number(str);
    const Blacks = Math.floor(num);
    const half = num === Math.floor(num) ? 0 : 1;
    const Whites = 5 - Blacks - half;
    const ele = [];
    for (let index = 0; index < Blacks; index++) {
      ele.push(<span key={Math.random()}>★</span>);
    }
    if (half !== 0) {
      ele.push(<span key={Math.random()}>✭</span>);
    }
    for (let index = 0; index < Whites; index++) {
      ele.push(<span key={Math.random()}>✩</span>);
    }
    return ele;
  };

  return (
    <div className={cls.EachReviewLayout}>
      {dummyReviews.map((e, i) => (
        <div key={JSON.stringify(e)} className={cls.reviewContents}>
          <div className={cls.profileSection}>
            <div>Img</div>
            <div>{e.userName}</div>
          </div>
          <div className={cls.detailInfos}>
            <div>{e.createdDate}</div>
            <div>{e.contents}</div>
            <div>{renderStars(e.ratings)}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EachReview;
