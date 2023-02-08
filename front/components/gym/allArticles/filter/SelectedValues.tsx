import cls from "./SelectedValues.module.scss";

interface Props{
  areas:Array<string>;
  setAreas:React.Dispatch<React.SetStateAction<string[]>>;

  price:Array<string>;
  setPrice:React.Dispatch<React.SetStateAction<string[]>>;
  priceActive:boolean;
  setPriceActive:React.Dispatch<React.SetStateAction<boolean>>;

  period:Array<string>;
  setPeriod:React.Dispatch<React.SetStateAction<string[]>>;
  periodActive:boolean;
  setPeriodActive:React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectedValues = (props:Props) => {

  const deleteAreaFilter = (e:any) => {
    const val = e.target.id
    props.setAreas(prev => prev.filter(v=>v!==val))
  }

  const deletePeriodFilter = () => {
    props.setPeriod([])
    props.setPeriodActive(false)
  }
  const deletePriceFilter  = () => {
    props.setPrice([])
    props.setPriceActive(false)
  }
  
  return (
    <>
      <div className={cls.SelectedValuesLayout}>

        {props.areas.map((v:any, i:any)=> {
          return (
            <div className={`${cls.common} ${cls.areas}`} key={`areas-${i}`} id={v} onClick={deleteAreaFilter}>{v} <span>X</span></div>
          )
        })} 

        {props.priceActive && (
          <div className={cls.common} onClick={deletePriceFilter}>
            {props.price[0]}원  ~ {props.price[1]}원 <span>X</span>
          </div>
        )}

        {props.periodActive && (
          <div className={cls.common} onClick={deletePeriodFilter}>
            {props.period[0]} ~ {props.period[1]} <span>X</span>
          </div>
        )}

      </div>
    </>
  )
}

export default SelectedValues