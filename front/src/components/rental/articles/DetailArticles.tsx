import cls from './DetailArticles.module.scss';
import SlickSlider from './SlickSlider';
import { useEffect } from 'react';

const DetailArticles = () => {

  const dummyData = {
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


  const getOepningDays = () => {
    const days = dummyData.openingDays
    let temp:string[] = []
    days.forEach(ele => {
      if(ele.open === true){
        temp.push(ele.name)
      }
    });
    return temp
  }
  const openingDaysRes:string[] = getOepningDays()
  console.log('openingDaysRes', openingDaysRes);

  return (
    <>
      <div className={cls.DetailArticlesLayout}>
        <h1>체육관정보</h1>

        <div className={cls.contentBox}>
          <div className={cls.mainContent}>
            <h2>제목</h2>
            <div className={cls.eachContent}>
              {dummyData.title}
            </div>
          </div>

          <div className={cls.imgContent}>
            <SlickSlider/>
          </div>

          <div className={cls.mainContent}>
            <h2>내용</h2>
            <div className={cls.eachContent}>
              {dummyData.content}
            </div>
          </div>

          <div className={cls.mainContent}>
            <h2>연락처</h2>
            <div className={cls.eachContent}>
              {dummyData.contact}
            </div>
          </div>

          <div className={cls.mainContent}>
            <h2>주소</h2>
            <div className={cls.eachContent}>
              우편번호 : {dummyData.address[0].val} <br/>
              도로명주소 : {dummyData.address[1].val} <br/>
              지번주소 : {dummyData.address[2].val} <br/>
              상세주소 : {dummyData.address[3].val} <br/>
              참고정보 : {dummyData.address[4].val} <br/>
            </div>
          </div>

          <div className={cls.mainContent}>
            <h2>가격</h2>
            <div className={cls.eachContent}>
              {dummyData.price} 원/시간
            </div>
          </div>

          <div className={cls.mainContent}>
            <h2>오픈시간</h2>
            <div className={cls.eachContent}>
              {dummyData.openingHours} 
            </div>
          </div>

          <div className={cls.mainContent}>
            <h2>오픈기간</h2>
            <div className={cls.eachContent}>
              {dummyData.openingPeriod} 
            </div>
          </div>

          <div className={cls.mainContent}>
            <h2>영업일</h2>
            <div className={cls.eachContent}>
              {openingDaysRes.map((ele,i)=>(
              <li key={i}>{ele}</li>))} 
            </div>
          </div>
        </div>

        
        
        <h1>리뷰</h1>
        <div className={cls.contentBox}>
          <div className={cls.mainContent}>리뷰</div>
          <div className={cls.mainContent}>리뷰</div>
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