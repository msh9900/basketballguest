import cls from "./Order.module.scss";
import { useState, useEffect } from "react";
import OrderStatusProps from "./interface_orderStatus";
interface Props {
  orderStatus: OrderStatusProps;
  setOrderStatus: React.Dispatch<React.SetStateAction<OrderStatusProps>>;
}

const Order = (props: Props) => {
  const [priceOrderOn, setPriceOrderOn] = useState(false);
  const [distanceOrderOn, setDistanceOrderOn] = useState(false);
  const [locValue, setLocValue] = useState("");
  const [locInputStatus, setLocInputStatus] = useState("none");

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

  const giveCurrentLoaction = () => {
    
    function onGeoOk(position: any) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      setLocValue(`${lat}, ${lng}`);
    }
    function onGeoError() {
      alert("Can't find you. No weather for you.");
    }
    const value = navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
    setLocInputStatus("byBrowserStatus");
  };
  const giveValueDirectly = () => {
    setLocInputStatus("byUserInput");
    setLocValue("");
    const ele = document.getElementById("locInput") as HTMLInputElement;
    ele.focus();
  };
  const onChangeLocInput = (e: any) => {
    setLocValue(e.target.value);
  };
  const getinputSubject = (locInputStatus: string) => {
    if (locInputStatus == "byUserInput") {return false;}
    if (locInputStatus == "byBrowserStatus") {return true;}
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

          <div>
            {" "}
            {/* RESET */}
            {(priceOrderOn || distanceOrderOn) && (
              <button className={cls.resetButton} onClick={orderReset}>
                <img src="images/rental/reset.png" alt="resetButton"></img>
              </button>
            )}
          </div>
        </div>

        {distanceOrderOn && (
          <>
            <div className={cls.asdf}>
              <div className={cls.flexbox}>
                <button className={cls.curLocBtn} onClick={giveCurrentLoaction}>
                  현위치
                </button>
                <button className={cls.directBtn} onClick={giveValueDirectly}>
                  직접 입력
                </button>
              </div>
              <label htmlFor="locInput"></label>
              <input
                autoComplete="off"
                id="locInput"
                type="text"
                onChange={onChangeLocInput}
                value={locValue}
                disabled={getinputSubject(locInputStatus)}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Order;
