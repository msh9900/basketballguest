import classes from "./Articles.module.scss";

const dummyArr = [
  {name:'Alice', title:'좋은 곳', contents:'아무나', place:'서울', price:1},
  {name:'Brian', title:'괜찮은 곳', contents:'아무나', place:'부산', price:1},
  {name:'Chris', title:'국내최고', contents:'아무나', place:'대구', price:1},
]

const Articles = () => {
  // console.log()
  return (
    <>
      <div>
        <div>게시글</div>
        {dummyArr &&
          dummyArr.map((data, idx) => {
            return (
              <div key={Date.now() + idx}>
                <li className={classes.li} >
                  {data.title},
                  {data.contents},
                  {data.place},
                  {data.price}원
                </li>
              </div>
            )
          })}
      </div>
    </>
  )
}

export default Articles