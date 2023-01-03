import Card from '../../components/Card';
import classes from './GuestRecruitmentPage.module.scss';

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
    {
      contentidx: 3,
      id: '테스트3',
      title: '제목',
      content: '테스트3 입니다',
      image: 'src주소 3',
      date: '1시간전',
    },
  ];
  return (
    <div className={classes.container}>
      {data.map((val) => (
        <Card key={val.contentidx} data={val} />
      ))}
    </div>
  );
}
