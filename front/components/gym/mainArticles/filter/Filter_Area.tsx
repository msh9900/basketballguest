import cls from "./Filter_Area.module.scss";

interface Props{
  areas:Array<string>
  setAreas:React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterArea = (props:Props) => {
  const listClick = (e:any) => {
    const curValue:string = e.target.id
    if(props.areas.includes(curValue)){
      props.setAreas(prev => prev.filter(v=>v!==curValue))
    }
    else{
      props.setAreas(prev => prev.concat(curValue))
    }
  }

  const isOn = (v:string) => {
    if(props.areas.includes(v)) return cls.on
    else return cls.off
  }

  const areas = {
    special:['서울', '세종','제주'],
    Metropolitan:['부산', '대구','대전','인천','광주','울산'],
    provinces:['강원','경기','충북','충남','전북','전남','경북','경남'],
  }

  return (
    <>
      <div className={cls.Filter_Area_Layout}>
        <div>

          <div>
            <h4 className={cls.center}>특별</h4>
            <ul>
              {areas.special.map((ele, idx) => {
                return (
                  <li 
                    id={ele}
                    key={idx + ele} 
                    className={isOn(ele)} 
                    onClick={listClick}>{ele}
                  </li>
                )
              })}
            </ul>
          </div>

          <div>
            <h4 className={cls.center}>광역시</h4>
            <ul>
              {areas.Metropolitan.map((ele, idx) => {
                return (
                  <li 
                    id={ele}
                    key={idx + ele} 
                    className={isOn(ele)} 
                    onClick={listClick}>{ele}
                  </li>
                )
              })}
            </ul>
          </div>

          <div>
            <h4 className={cls.center}>팔도</h4>
            <ul>
              {areas.provinces.map((ele, idx) => {
                return (
                  <li 
                    id={ele} 
                    key={idx + ele} 
                    className={isOn(ele)} 
                    onClick={listClick}>{ele}
                  </li>
                )
              })}
            </ul>
          </div>


        </div>
      </div>
    </>
  )
}
export default FilterArea