import cls from "./Filter_Price.module.scss";

interface Props{
  priceRange:Array<string>
  setPriceRange:React.Dispatch<React.SetStateAction<string[]>>;
  priceActive:boolean;
  setPriceActive:React.Dispatch<React.SetStateAction<boolean>>;
}


const FilterPrice = (props:Props) => {

  // <가격 변경>
  const onChangePrice = (e: React.FormEvent<HTMLInputElement>) => {
    const val:string = e.currentTarget.value
    
    // 숫자 아니면 변경금지 후 종료
    const lastValue = val[val.length-1]
    const arrowedValues = ['1','2','3','4','5','6','7','8','9','0', '']
    if(!arrowedValues.includes(lastValue)) return

    // 값 입력
    const id  = e.currentTarget.id
    if(id === 'start') props.setPriceRange([val, props.priceRange[1]])
    else props.setPriceRange([props.priceRange[0], val])
  }

  // <설정 적용>
  const setOn = () => {
    const L:number = Number(props.priceRange[0])
    const R:number = Number(props.priceRange[1])
    if(L > R){
      alert('시작값이 더 큽니다.')
      return
    } 
    if(props.priceRange[0] === '' || props.priceRange[1] === ''){
      alert('값을 모두 채워주세요')
      return
    }
    props.setPriceActive(true)
  }

  // <설정 취소>
  const setOff = () => {
    props.setPriceActive(false)
  }

  return (
    <>
      <div className={cls.priceFilterLayout}>
        <div>
          <div>
            <span>시작값</span>
            <input id='start' className='' autoComplete="off" value={props.priceRange[0]} onChange={onChangePrice}/>원
          </div>

          <div>
            <span>종료값</span>
            <input id='end' className='' autoComplete="off" value={props.priceRange[1]} onChange={onChangePrice}/>원
          </div>
          { props.priceActive && <button onClick={setOff}>가격설정 Off</button>}
          {!props.priceActive && <button onClick={setOn}> 가격설정 ON </button>}
        </div>

      </div>
    </>
  )
}
export default FilterPrice