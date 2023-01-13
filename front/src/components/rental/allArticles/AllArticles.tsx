import cls from "./MainArticles.module.scss";
import { useNavigate } from 'react-router-dom';

const dummyArr = [
  {name:'Alice', title:'제목', contents:'내용', place:'서울', price:1},
  {name:'Brian', title:'제목', contents:'내용', place:'부산', price:1},
  {name:'Chris', title:'제목', contents:'내용', place:'대구', price:1},
  {name:'Chris', title:'제목', contents:'내용', place:'광주', price:1},
  {name:'Chris', title:'제목', contents:'내용', place:'대구', price:1},
  {name:'Chris', title:'제목', contents:'내용', place:'대구', price:1},
]

const AllArticles = () => {

  const navigate = useNavigate();
  const moveToDetailPage = () => {
    navigate('/gym/detailArticles');
  }
  
  return (
    <>
      <div className={cls.boxContainer}>
        {dummyArr &&
          dummyArr.map((data, idx) => {
            return (
              <div key={Date.now() + idx} className={cls.boxItem} onClick={moveToDetailPage}>
                <li className={cls.li} >
                  <div className={cls.imgBox}></div>
                  <div className={cls.title}>{data.title}</div>
                  <div className={cls.place}>{data.place}</div>
                  <div className={cls.price}>{data.price}원/시간</div>
                </li>
              </div>
            )
          })}
      </div>
    </>
  )
}

export default AllArticles