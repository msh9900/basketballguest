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

  return (
    <>
      <div className={cls.Filter_Area_Layout}>
        <div>
          <div>
            <h4 className={cls.center}>특별</h4>
            <ul>
              <li id='서울' className={isOn('서울')} onClick={listClick}>서울</li>
              <li id='세종' className={isOn('세종')} onClick={listClick}>세종</li>
              <li id='제주' className={isOn('제주')} onClick={listClick}>제주</li>
            </ul>
          </div>

          <div>
          <h4 className={cls.center}>광역시</h4>
            <ul>
              <li id='부산' className={isOn('부산')} onClick={listClick}>부산</li>
              <li id='대구' className={isOn('대구')} onClick={listClick}>대구</li>
              <li id='대전' className={isOn('대전')} onClick={listClick}>대전</li>
              <li id='인천' className={isOn('인천')} onClick={listClick}>인천</li>
              <li id='광주' className={isOn('광주')} onClick={listClick}>광주</li>
              <li id='울산' className={isOn('울산')} onClick={listClick}>울산</li>
            </ul>
          </div>

          <div>
            <h4 className={cls.center}>팔도</h4>
            <ul>
              <li id='강원' className={isOn('강원')} onClick={listClick}>강원도</li>
              <li id='경기' className={isOn('경기')} onClick={listClick}>경기도</li>
              <li id='충남' className={isOn('충남')} onClick={listClick}>충청남도</li>
              <li id='충북' className={isOn('충북')} onClick={listClick}>충청북도</li>
              <li id='전북' className={isOn('전북')} onClick={listClick}>전라북도</li>
              <li id='전남' className={isOn('전남')} onClick={listClick}>전라남도</li>
              <li id='경북' className={isOn('경북')} onClick={listClick}>경상북도</li>
              <li id='경남' className={isOn('경남')} onClick={listClick}>경상남도</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
export default FilterArea