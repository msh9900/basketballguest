import cls from './DetailArticles.module.scss';
import SlickSlider from './SlickSlider';
import ReviewSection from 'src/components/rental/detailArticles/ReviewSection';

import { useEffect } from 'react';

const DetailArticles = () => {

  const dummyArticleData = {
    title:'title',
    content:'content',
    contact:'contact',
    address:[
      {category:'postcode', val:'a'},
      {category:'roadAddress', val:'b'},
      {category:'jibunAddress', val:'c'},
      {category:'detailAddress', val:'d'},
      {category:'extraAddress', val:'e'}
    ],
    price:'price',
    openingHours:'openingHours',
    openingPeriod:'openingPeriod',
    openingDays:[
      {name:'일', open:true},
      {name:'월', open:false},
      {name:'화', open:false},
      {name:'수', open:false},
      {name:'목', open:false},
      {name:'금', open:false},
      {name:'토', open:true},
    ],
  }
  
  useEffect(() => {
    // article
    // review
    // comments
  }, []);

  const getOepningDaysFromData = () => {
    const days = dummyArticleData.openingDays
    let temp:string[] = []
    days.forEach(ele => {
      if(ele.open === true){
        temp.push(ele.name)
      }
    });
    return temp
  }
  const openingDaysRes:string[] = getOepningDaysFromData()

  return (
    <>
      <div className={cls.DetailArticlesLayout}>
        <h1>체육관정보</h1>

        <div className={cls.contentBox}>
          <div className={cls.mainContent}>
            <h2>제목</h2>
            <div className={cls.eachContent}>
              {dummyArticleData.title}
            </div>
          </div>

          <div className={cls.imgContent}>
            <SlickSlider/>
          </div>

          <div className={cls.mainContent}>
            <h2>내용</h2>
            <div className={cls.eachContent}>
              {dummyArticleData.content}
            </div>
          </div>

          <div className={cls.mainContent}>
            <h2>연락처</h2>
            <div className={cls.eachContent}>
              {dummyArticleData.contact}
            </div>
          </div>

          <div className={cls.mainContent}>
            <h2>주소</h2>
            <div className={cls.eachContent}>
              우편번호 : {dummyArticleData.address[0].val} <br/>
              도로명주소 : {dummyArticleData.address[1].val} <br/>
              지번주소 : {dummyArticleData.address[2].val} <br/>
              상세주소 : {dummyArticleData.address[3].val} <br/>
              참고정보 : {dummyArticleData.address[4].val} <br/>
            </div>
          </div>

          <div className={cls.mainContent}>
            <h2>가격</h2>
            <div className={cls.eachContent}>
              {dummyArticleData.price} 원/시간
            </div>
          </div>

          <div className={cls.mainContent}>
            <h2>오픈시간</h2>
            <div className={cls.eachContent}>
              {dummyArticleData.openingHours} 
            </div>
          </div>

          <div className={cls.mainContent}>
            <h2>오픈기간</h2>
            <div className={cls.eachContent}>
              {dummyArticleData.openingPeriod} 
            </div>
          </div>

          <div className={cls.mainContent}>
            <h2>영업일</h2>
            <div className={cls.eachContent}>
              {openingDaysRes.map((ele, i)=>(
              <li key={'openingDays'+i}>{ele}</li>))} 
            </div>
          </div>
        </div>
        
        <h1>리뷰</h1>
        <div className={cls.contentBox}>
          <ReviewSection/>
        </div>

        <h1>댓글</h1>
        <div className={cls.contentBox}>
          <div className={cls.mainContent}>댓글</div>
          <div className={cls.mainContent}>댓글</div>
        </div>

      </div>
    </>
  );
};

export default DetailArticles;