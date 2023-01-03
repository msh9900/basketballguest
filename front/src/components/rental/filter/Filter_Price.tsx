import cls from "./Filter_Price.module.scss";

interface Props{
  price:Array<number>
  setPrice:React.Dispatch<React.SetStateAction<number[]>>;
  priceActive:boolean;
  setPriceActive:React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterPrice = (props:Props) => {

  // <<가격 변경>>
  const onChangePrice = (e: React.FormEvent<HTMLInputElement>) => {
    
    // 사용할 값
    const str:string = e.currentTarget.value
    const val:number = parseInt(str)
    const lastValue = str[str.length-1]
    const id  = e.currentTarget.id
    
    // 값이 0이 되는 경우 처리
    if(lastValue === undefined){
      if(id === 'start'){
        props.setPrice([0, props.price[1]])
      }
      else {
        props.setPrice([props.price[0], 0])
      }
    }

    // 숫자 아니면 변경중단 + 종료
    const arrowedValues = ['1','2','3','4','5','6','7','8','9','0', '']
    if(!arrowedValues.includes(lastValue)) return
    
    // 그 이외의 경우 입력값 입력
    if(id === 'start') props.setPrice([val, props.price[1]])
    else props.setPrice([props.price[0], val])
  }

  // <<설정 적용>>
  const setOn = () => {
    const L:number = props.price[0]
    const R:number = props.price[1]
    
    if(L > R){
      alert('시작값이 더 큽니다.')
      return
    } 
    if(L === 0 || R === 0){
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
            <input type="number" id='start' className='' autoComplete="off" value={props.price[0]} onChange={onChangePrice}/>원
          </div>

          <div>
            <span>종료값</span>
            <input type="number" id='end' className='' autoComplete="off" value={props.price[1]} onChange={onChangePrice}/>원
          </div>
          { props.priceActive && <button onClick={setOff}>가격설정 Off</button>}
          {!props.priceActive && <button onClick={setOn}> 가격설정 ON </button>}
        </div>

      </div>
    </>
  )
}
export default FilterPrice