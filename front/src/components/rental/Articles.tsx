import classes from "./Articles.module.scss";

const dummyArr = [
  {name:'Alice', title:'제목', contents:'내용', place:'서울', price:1},
  {name:'Brian', title:'제목', contents:'내용', place:'부산', price:1},
  {name:'Chris', title:'제목', contents:'내용', place:'대구', price:1},
  {name:'Chris', title:'제목', contents:'내용', place:'광주', price:1},
  {name:'Chris', title:'제목', contents:'내용', place:'대구', price:1},
  {name:'Chris', title:'제목', contents:'내용', place:'대구', price:1},
]

const Articles = () => {
  return (
    <>
      <div className={classes.boxContainer}>
        {dummyArr &&
          dummyArr.map((data, idx) => {
            return (
              <div key={Date.now() + idx} className={classes.boxItem}>
                <li className={classes.li} >
                  <div className={classes.imgBox}></div>
                  <div className={classes.title}>{data.title}</div>
                  <div className={classes.place}>{data.place}</div>
                  <div className={classes.price}>{data.price} 원/시간</div>
                </li>
              </div>
            )
          })}
      </div>
    </>
  )
}

export default Articles