// style
import cls from "./Filter.module.scss";

// component
import FilterArea from './Filter_Area'
import FilterPrice from './Filter_Price'
import FilterPeriod from './Filter_Period'
import SelectedValues from './SelectedValues'

// library
import {useState} from 'react'

const Filter = () => { 
  // filter on off
  const [areaFilter, setAreaFilter] = useState(false)
  const [priceFilter, setPriceFilter] = useState(false)
  const [periodFilter, setPeriodFilter] = useState(false)

  // filters
  const [areas, setAreas] =  useState<string[]>([])
  const [price, setPrice] =  useState<string[]>(['0', '0'])
  const [priceActive, setPriceActive] = useState(false)
  
  // const [period, setPeriod] =  useState<string[]>([getDate('today'), getDate('tomorrow')])
  const [period, setPeriod] =  useState<string[]>([])
  const [periodActive, setPeriodActive] = useState(false)
  
  const priceFilterOn = () => {
    setAreaFilter(false)
    setPriceFilter(prev=>!prev)
    setPeriodFilter(false)
  }
  const areaFilterOn = () => {
    setAreaFilter(prev=>!prev)
    setPriceFilter(false)
    setPeriodFilter(false)
  }
  const periodFilterOn = () => {
    setAreaFilter(false)
    setPriceFilter(false)
    setPeriodFilter(prev=>!prev)
  }
  const filterReset = () => {
    setAreas([])
    setPrice(['0', '0'])
    setPriceActive(false)
    setPeriodActive(false)
  }
  const closeFilters = () => {
    setAreaFilter(false)
    setPriceFilter(false)
    setPeriodFilter(false)
  }

  return (
    <div className={cls.FilterLayout}>
      
      <div className={cls.topSection}>
        <h3 className='topTitle'> 필터 : </h3>
        <button 
          className={areaFilter ? cls.on : cls.off} 
          onClick={areaFilterOn}>지역
        </button>

        <button 
          className={priceFilter ? cls.on : cls.off} 
          onClick={priceFilterOn}>가격
        </button>
        <button 
          className={periodFilter ? cls.on : cls.off} 
          onClick={periodFilterOn}>기간
        </button>
        <button 
          className={cls.reset} 
          onClick={filterReset}>
        </button>
        {(areaFilter || priceFilter || periodFilter) &&
          <button 
            className={cls.fold} 
            onClick={closeFilters}>
              {/* 접기 */}
          </button>
        }
      </div>

      



      {/* 현재 필터링 태그 */}
      <SelectedValues 
        areas={areas} 
        setAreas={setAreas} 
        price={price} 
        setPrice={setPrice} 
        priceActive={priceActive}
        setPriceActive={setPriceActive}
        period={period}
        setPeriod={setPeriod}
        periodActive={periodActive}
        setPeriodActive={setPeriodActive}
      />

      {/* 필터 제너레이터 */}
      {areaFilter && <FilterArea 
        areas={areas} 
        setAreas={setAreas}/>}
      {priceFilter && <FilterPrice 
        price={price} 
        setPrice={setPrice} 
        priceActive={priceActive}
        setPriceActive={setPriceActive}/>}
      {periodFilter && <FilterPeriod
        period={period}
        setPeriod={setPeriod}
        periodActive={periodActive}
        setPeriodActive={setPeriodActive}/>}
    </div>
  )
}
export default Filter;