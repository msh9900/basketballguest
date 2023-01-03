import cls from "./Filter_Price.module.scss";
import { useState } from 'react';

interface Props{
  price:Array<string>
  setPrice:React.Dispatch<React.SetStateAction<string[]>>;
  priceActive:boolean;
  setPriceActive:React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterPrice = (props:Props) => {

  const [stt, setStt] = useState('0')
  const [end, setEnd] = useState('0')
  
  // <<가격 변경>>
  const onChangePrice = (e: React.FormEvent<HTMLInputElement>) => {

    // 사용할 값
    let str:string = e.currentTarget.value
    const lastValue = str[str.length-1]
    const id  = e.currentTarget.id
    console.log('str :', str)
    
    // 문자 => 제거 + 종료
    const num = parseInt(lastValue)
    if(!(num >= 0 && num <= 9)) return;
  
    // 빈칸 => 0 처리 + 종료
    if(lastValue === undefined){
      console.log('진입');
      if(id === 'stt') setStt('0')
      else setEnd('0')
      return
    }

    //  0으로 시작하는 경우 (2자 이상) 앞의 0 제거 + 종료
    if(str.length>1 && str[0]==='0'){
      let temp = str.split('')
      const str2 = temp.slice(1).join('')
      if(id === 'stt') setStt(str2)
      else setEnd(str2)
      return
    }

    // 이외는 그대로 적용
    if(id === 'stt') setStt(str)
    else setEnd(str)
  }

  // <<설정 ON>>
  const setOn = () => {
    const sttNum = parseInt(stt)
    const endNum = parseInt(end)

    if(sttNum > endNum){
      console.log('sttNum', sttNum)
      console.log('endNum', endNum)
      alert('시작값이 더 큽니다.')
      return
    } 
    if(sttNum === 0 || endNum === 0){
      alert('값을 모두 채워주세요')
      return
    }
    props.setPrice([stt, end])
    props.setPriceActive(true)
  }

  // <설정 Off>
  const setOff = () => {
    props.setPriceActive(false)
  }

  return (
    <>
      <div className={cls.priceFilterLayout}>
        <div>
          <div>
            <span>시작값</span>
            <input id='stt' className='' autoComplete="off" value={stt} onChange={onChangePrice}/>원
          </div>

          <div>
            <span>종료값</span>
            <input id='end' className='' autoComplete="off" value={end} onChange={onChangePrice}/>원
          </div>
          { props.priceActive && <button onClick={setOff}>가격설정 Off</button>}
          {!props.priceActive && <button onClick={setOn}> 가격설정 ON </button>}
        </div>
      </div>
    </>
  )
}
export default FilterPrice