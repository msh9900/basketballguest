import { useState } from 'react';
import Card from '../../components/Card';
import classes from './GuestRecruitmentPage.module.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
export default function GuestRecruitmentPage() {
  //임시 데이터 카드
  const data = [
    {
      contentidx: 1,
      id: '테스트1',
      title: '[대구] 농구 게스트 구합니다',
      content: '안녕하세요 체육관 대여 할려고 하는데 비용이 얼마정도 나오나요?',
      image: 'src주소 1',
      date: '1시간전',
    },
    {
      contentidx: 2,
      id: '테스트2',
      title: '[이태원] 농구 게스트 구합니다',
      content: '테스트2 입니다',
      date: '1시간전',
    },
  ];
  for (let i = 3; i < 150; i++) {
    data.push({
      contentidx: i,
      id: '테스트3',
      title: `번호${i}`,
      content: '테스트3 입니다',
      image: 'src주소 3',
      date: '1시간전',
    });
  }

  const [contentList, setContentList] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const fetchMoreData = () => {
    if (contentList < 150) {
      setTimeout(() => {
        setContentList(contentList + 10);
      }, 500);
    } else {
      setHasMore(false);
    }
  };
  return (
    <>
      <div className={classes.writeButton}>글쓰기 버튼</div>
      <div id="parentScrollDiv" className={classes.wrap}>
        <InfiniteScroll
          dataLength={contentList}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<p>Loading...</p>}
          scrollableTarget="parentScrollDiv"
        >
          <div className={classes.container}>
            {data.slice(0, contentList).map((val) => (
              <Card key={val.contentidx} data={val} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
}
