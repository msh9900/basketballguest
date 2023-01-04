import cls from './Order.module.scss'

import { useState } from 'react'

const Order = () => {

  const priceOrderActivate = () => {
    if(priceOrderOn) setPriceOrderOn(false)
    else setPriceOrderOn(true)
    setDistanceOrderOn(false)
  }
  const distanceOrderActivate = () => {
    if(distanceOrderOn) setDistanceOrderOn(false)
    else setDistanceOrderOn(true)
    setPriceOrderOn(false)
  }
  const orderReset = () => {
    setPriceOrderOn(false)
    setDistanceOrderOn(false)
  }

  const [ priceOrderOn, setPriceOrderOn] = useState(false)
  const [ distanceOrderOn, setDistanceOrderOn] = useState(false)

  return (
    <>
      <div className={cls.OrderLayout}>
        <div className={cls.topSection}>
          <h3 className='topTitle'> 정렬 : </h3>
          <button 
            className={priceOrderOn ? cls.on : cls.off} 
            onClick={priceOrderActivate}>가격순
          </button>
          <button 
            className={distanceOrderOn ? cls.on : cls.off} 
            onClick={distanceOrderActivate}>거리순
          </button>
          <button 
            className={cls.reset} 
            onClick={orderReset}>
          </button>
        </div>
      </div>
    </>
  )
}

export default Order