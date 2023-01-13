import cls from './Order.module.scss';
import { useState, useEffect } from 'react';
import OrderStatusProps from './interface_orderStatus';
interface Props {
  orderStatus: OrderStatusProps;
  setOrderStatus: React.Dispatch<React.SetStateAction<OrderStatusProps>>;
}

const Order = (props: Props) => {
  const [priceOrderOn, setPriceOrderOn] = useState(false);
  const [distanceOrderOn, setDistanceOrderOn] = useState(false);

  useEffect(() => {
    props.setOrderStatus({
      ispriceOrderOn: priceOrderOn,
      isdistanceOrderOn: distanceOrderOn,
    });
  }, [priceOrderOn, distanceOrderOn]);

  const priceOrderActivate = () => {
    if (priceOrderOn) setPriceOrderOn(false);
    else setPriceOrderOn(true);
    setDistanceOrderOn(false);
  };
  const distanceOrderActivate = () => {
    if (distanceOrderOn) setDistanceOrderOn(false);
    else setDistanceOrderOn(true);
    setPriceOrderOn(false);
  };
  const orderReset = () => {
    setPriceOrderOn(false);
    setDistanceOrderOn(false);
  };

  return (
    <>
      <div className={cls.OrderLayout}>
        <div className={cls.topSection}>
          <h3 className="topTitle">정렬</h3>
          <img
            src="images/rental/order.png"
            width="20"
            height="20"
            alt="order-icon"
          />
        </div>

        <div className={cls.orderBtns}>
          <div>
            <button
              className={priceOrderOn ? cls.on : cls.off}
              onClick={priceOrderActivate}
            >
              가격순
            </button>
            <button
              className={distanceOrderOn ? cls.on : cls.off}
              onClick={distanceOrderActivate}
            >
              거리순
            </button>
          </div>
          {/* // <button className={cls.resetButton} onClick={orderReset}/> */}
          <div>
            {(priceOrderOn || distanceOrderOn) && (
              <button className={cls.resetButton} onClick={orderReset}>
                <img
                  src="images/rental/reset.png"
                  alt="resetButton"
                ></img>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
