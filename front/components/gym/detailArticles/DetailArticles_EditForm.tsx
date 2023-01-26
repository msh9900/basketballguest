import cls from "./DetailArticles_EditForm.module.scss";
import { useState, useEffect } from 'react';
import Image from 'next/image'
// types
import gymArticleDataType from "util/types/gymArticleDataType";
import gymArticleDataBase from "util/types/gymArticleDataBase";
import setInitialValue from './setInitialValue';

interface Props {
  gymInfo:gymArticleDataType
  setIsArticleEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFetchingArticles: React.Dispatch<React.SetStateAction<boolean>>;
}

const DetailArticles_EditForm = (props: Props) => {

  const [openingDays, setOpeningDays] = useState([
    { name: "일", open: false },
    { name: "월", open: false },
    { name: "화", open: false },
    { name: "수", open: false },
    { name: "목", open: false },
    { name: "금", open: false },
    { name: "토", open: false },
  ]);

  useEffect(()=>{
    setInitialValue(props.gymInfo)
  }, [])
  
  useEffect(()=>{
    // console.log('openingDays', openingDays);
  }, [openingDays])

  const checkClicked = (day:string) => {
    for(const x of openingDays){
      if(x.name === day){
        return x.open
      }
    }
  }
  
  const setClicked = (day:string) => {
    let temp = [...openingDays]
    for(const x of temp){
      if(x.name === day) {
        x.open = !x.open
      }
    }
    setOpeningDays(temp)
  }

  const updateArticle = async () => {
    getArticleEditData()
    await props.setIsFetchingArticles(true);
    // const pId = router.query.articles as string;
    // try {
    //   const response = await fetch("http://localhost:4000/" + `${pId}`, {
    //     method: "PUT",
    //     headers: { "Content-Type": "application/json" },
    //   });
    //   const data = await response.json();
    //   alert("성공");
    // } catch (err: any) {
    //   alert("실패");
    // }
  };

  const getArticleEditData = () => {
    const field1 = document.querySelector('#article_title') as HTMLInputElement 
    const field2 = document.querySelector('#article_content')as HTMLTextAreaElement 
    const field3 = document.querySelector('#article_contact')as HTMLInputElement 

    const field_addr_1 = document.querySelector('#article_address_1') as HTMLInputElement 
    const field_addr_2 = document.querySelector('#article_address_2') as HTMLInputElement 
    const field_addr_3 = document.querySelector('#article_address_3') as HTMLInputElement 
    const field_addr_4 = document.querySelector('#article_address_4') as HTMLInputElement 
    const field_addr_5 = document.querySelector('#article_address_5') as HTMLInputElement 

    const field4 = document.querySelector('#article_price')as HTMLInputElement 
    const field5 = document.querySelector('#article_openingHours')as HTMLInputElement 
    const field6 = document.querySelector('#article_openingPeriod_1')as HTMLInputElement 
    const [title, content, contact] = [field1.value, field2.value, field3.value]

    // console.log(title, content, contact);
  }
  const checkOpeningDays = (e:any) => {
    e.target.id
  };
  const days = ['일','월','화','수','목','금','토']
  // const checkClicked = (day:string) => {
  //   return true
  // }

  

  return (
    <>
      <h1>체육관 정보 수정</h1>
      <div className={cls.contentBox}>
        <div className={cls.mainContent}>
          <div className={cls.eachContent}>

            <div className={cls.center}>
              <div className={cls.eachField}>
                <div className={cls.fieldName}>제목</div>
                <div className={cls.dataField}>
                  <input id='article_title'/>
                </div>
              </div>

              <div className={cls.eachField}>
                <div className={cls.fieldName}>내용</div>
                <div className={cls.dataField}>
                  <textarea id='article_content'/>
                </div>
              </div>

              <div className={cls.eachField}>
                <div className={cls.fieldName}>연락처</div>
                <div className={cls.dataField}>
                  <input id='article_contact'/>
                </div>
              </div>

              <div className={cls.eachField}>
                <div className={cls.fieldName}>주소</div>
                <div className={cls.dataField}>
                  <div><input id='article_address_1' disabled/></div>
                  <div><input id='article_address_2' disabled/></div>
                  <div><input id='article_address_3' disabled/></div>
                  <div><input id='article_address_4' disabled/></div>
                  <div><input id='article_address_5' disabled/></div>
                </div>
              </div>

              <div className={cls.eachField}>
                <div className={cls.fieldName}>가격</div>
                <div className={cls.dataField}>
                  <input id='article_price'/>
                </div>
              </div>

              <div className={cls.eachField}>
                <div className={cls.fieldName}>오픈시간</div>
                <div className={cls.dataField}>
                  <input id='article_openingHours'/>
                </div>
              </div>

              <div className={cls.eachField}>
                <div className={cls.fieldName}>기간시작</div>
                <div className={cls.dataField}>
                  <input id='article_openingPeriod_1'/>
                </div>
              </div>

              <div className={cls.eachField}>
                <div className={cls.fieldName}>기간종료</div>
                <div className={cls.dataField}>
                  <input id='article_openingPeriod_2'/>
                </div>
              </div>

              <div className={cls.eachField}>
                <div className={cls.fieldName}>영업일</div>
                <div className={cls.dataField}>
                  {days.map((v,i)=>(
                    <button 
                      key={Math.random()}
                      id={v} 
                      className={checkClicked(v) ? cls.on : cls.off} 
                      onClick={()=>{setClicked(v)}}>{v}
                    </button>
                  ))}
                </div>  
              </div>
            </div>

            <div className={cls.btnField}>
              <button onClick={updateArticle}>
              <Image
                src="/images/rental/checked.png"
                alt="수정완료"
                width="20"
                height="20"
              />
          </button>
              <button onClick={() => {props.setIsArticleEditing(false);}}>
              <Image
                src="/images/rental/cancel.png"
                alt="cancel"
                width="20"
                height="20"
              />
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailArticles_EditForm;
