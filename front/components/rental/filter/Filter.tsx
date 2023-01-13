// style
import cls from './Filter.module.scss';
// library
import { useState, useEffect } from 'react';
// component
import FilterArea from './Filter_Area';
import FilterPrice from './Filter_Price';
import FilterPeriod from './Filter_Period';
import SelectedValues from './SelectedValues';
// interface
import filterProps from './interface_filterStatus';

interface Props {
  filterStatus: filterProps;
  setFilterStatus: React.Dispatch<React.SetStateAction<filterProps>>;
}

const Filter = (props: Props): React.ReactElement => {
  // filter fold/unfold
  const [areaFilter, setAreaFilter] = useState(false);
  const [priceFilter, setPriceFilter] = useState(false);
  const [periodFilter, setPeriodFilter] = useState(false);

  // filters
  const [areas, setAreas] = useState<string[]>([]);
  const [price, setPrice] = useState<string[]>(['0', '0']);
  const [period, setPeriod] = useState<string[]>([]);
  const [priceActive, setPriceActive] = useState(false);
  const [periodActive, setPeriodActive] = useState(false);

  // send status for higher component
  useEffect(() => {
    props.setFilterStatus({
      activeAreas: [...areas] as string[],
      priceRange: [...price] as string[],
      periodRange: [...period] as string[],
      ispriceActive: priceActive as boolean,
      isperiodActive: periodActive as boolean,
    });
  }, [areas, price, period, priceActive, periodActive]);

  const priceFilterOn = () => {
    setAreaFilter(false);
    setPriceFilter((prev) => !prev);
    setPeriodFilter(false);
  };
  const areaFilterOn = () => {
    setAreaFilter((prev) => !prev);
    setPriceFilter(false);
    setPeriodFilter(false);
  };
  const periodFilterOn = () => {
    setAreaFilter(false);
    setPriceFilter(false);
    setPeriodFilter((prev) => !prev);
  };
  const filterReset = () => {
    setAreas([]);
    setPrice(['0', '0']);
    setPriceActive(false);
    setPeriodActive(false);
  };
  const closeFilters = () => {
    setAreaFilter(false);
    setPriceFilter(false);
    setPeriodFilter(false);
  };

  return (
    <div className={cls.FilterLayout}>
      <div className={cls.topSection}>
        <div>
          <h3>필터</h3>
          <img
            src="images/rental/filter.png"
            width="20"
            height="20"
            alt="filter img"
          />
        </div>
      </div>

      <div className={cls.filterSection}>
        <div className={cls.filterBtns}>
          <button
            className={areaFilter ? cls.on : cls.off}
            onClick={areaFilterOn}
          >
            지역
          </button>
          <button
            className={priceFilter ? cls.on : cls.off}
            onClick={priceFilterOn}
          >
            가격
          </button>
          <button
            className={periodFilter ? cls.on : cls.off}
            onClick={periodFilterOn}
          >
            기간
          </button>
        </div>

        <div className={cls.utilBtns}>
          {(areas.length >= 1 || priceActive || periodActive) && (
            <button className={cls.reset} onClick={filterReset}></button>
          )}
          {(areaFilter || priceFilter || periodFilter) && (
            <button className={cls.fold} onClick={closeFilters}></button>
          )}
        </div>
      </div>

      {/* 필터 생성기 */}
      {(areaFilter || priceFilter || periodFilter) &&
        <div className={cls.filterGenerators}>
        {areaFilter && 
          <FilterArea areas={areas} setAreas={setAreas} />
        }
        {priceFilter && (
          <FilterPrice
            price={price}
            setPrice={setPrice}
            priceActive={priceActive}
            setPriceActive={setPriceActive}
          />
        )}
        {periodFilter && (
          <FilterPeriod
            period={period}
            setPeriod={setPeriod}
            periodActive={periodActive}
            setPeriodActive={setPeriodActive}
          />
        )}
      </div>}


      {/* active filters */}
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
    </div>
  );
};
export default Filter;
