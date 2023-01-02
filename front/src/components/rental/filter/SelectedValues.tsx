import cls from "./SelectedValues.module.scss";

interface Props{
  areas:Array<string>;
  setAreas:React.Dispatch<React.SetStateAction<string[]>>;
  priceRange:Array<string>;
  setPriceRange:React.Dispatch<React.SetStateAction<string[]>>;
  priceActive:boolean;
  setPriceActive:React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectedValues = (props:Props) => {

  const deleteAreaFilter = (e:any) => {
    const val = e.target.id
    props.setAreas(prev => prev.filter(v=>v!==val))
  }
  
  return (
    <>
      <div className={cls.SelectedValuesLayout}>

        {props.areas.map((v:any, i:any)=> {
          return (
            <div className={cls.areas} key={`areas-${i}`} id={v} onClick={deleteAreaFilter}>{v} X</div>
          )
        })} 

        {props.priceActive && (
          <div className={cls.price} onClick={()=>{props.setPriceActive(false)}}>
            {props.priceRange[0]} ~ {props.priceRange[1]} X
          </div>
        )}
      </div>
    </>
  )
}

export default SelectedValues