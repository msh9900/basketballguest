import cls from "./Filter_Price.module.scss";

interface Props{
  priceRange:Array<string>
  setPriceRange:React.Dispatch<React.SetStateAction<string[]>>;
  setPriceActive:React.Dispatch<React.SetStateAction<boolean>>
}

const FilterPrice = (props:Props) => {

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    
    const val:string = e.currentTarget.value
    const id  = e.currentTarget.id

    // if(isNaN(val)){
    //   return
    // }

    if(id === 'start'){
      props.setPriceRange([val, props.priceRange[1]])
    }
    else {
      props.setPriceRange([props.priceRange[0], val])
    }
  }

  const onClick = () => {
    props.setPriceActive(true)
  }

  return (
    <>
      <div className={cls.priceFilterLayout}>

        <div>
          <span>시작값</span>
          <input id='start' className='' autoComplete="off" value={props.priceRange[0]} onChange={onChange}/>원
        </div>

        <div>
          <span>종료값</span>
          <input id='end' className='' autoComplete="off" value={props.priceRange[1]} onChange={onChange}/>원
        </div>
        
        <button onClick={onClick}>가격설정 ON</button>
      </div>
    </>
  )
}
export default FilterPrice