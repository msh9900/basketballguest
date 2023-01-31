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
  const [locInputStatus, setLocInputStatus] = useState("R");
  const [isAsc, setIsAsc] = useState(false)
  // asc desc
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  useEffect(() => {
    props.setOrderStatus({
      ispriceOrderOn: priceOrderOn,
      isdistanceOrderOn: distanceOrderOn,
      lat: lat,
      lng: lng,
      isAsc : isAsc,
    });
  }, [priceOrderOn, distanceOrderOn, lat, lng, isAsc]);

  const priceOrderActivate = () => {
    if (priceOrderOn) setPriceOrderOn(false);
    else setPriceOrderOn(true);
    setDistanceOrderOn(false);
  };
  const distanceOrderActivate = () => {
    if(locInputStatus == 'L'){
      browserLocSearch()
    }
    if (distanceOrderOn) setDistanceOrderOn(false);
    else setDistanceOrderOn(true);
    setPriceOrderOn(false);
  };
  const orderReset = () => {
    setPriceOrderOn(false);
    setDistanceOrderOn(false);
  };

  // 장치로 현위치 찾기
  const giveDeviceLocation = () => {
    browserLocSearch()
    setLocInputStatus("L");
  };

  const browserLocSearch = () => {
    function onGeoOk(position: any) {
      setLat(position.coords.latitude.toString());
      setLng(position.coords.longitude.toString());
    }
    function onGeoError() {
      alert("Can't find device Location.");
    }
    const value = navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
  }

  // 직접 입력
  const giveValueDirectly = () => {
    setLng('')
    setLat('')
    setLocInputStatus("R");
    function focusElement() {
      const ele = document.getElementById("latitude") as HTMLInputElement;
      ele.focus();
    }
    setTimeout(focusElement, 1);
  };

  // input 처리
  const onDirectChangeLat = (e: any) => {
    setLat(e.target.value); 
  };
  const onDirectChangeLng = (e: any) => {
    setLng(e.target.value); 
  };
  const setAsc = () => {
    setIsAsc(true)
    setLocInputStatus("L");
  }
  const setDesc = () => {
    setIsAsc(false)
    setLocInputStatus("R");
  }

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
            {(priceOrderOn || distanceOrderOn) && (
              <button className={cls.resetButton} onClick={orderReset}>
                <img src="images/rental/reset.png" alt="resetButton"></img>
              </button>
            )}
          </div>
        </div>

        {priceOrderOn && (<>
          <div className={cls.asdf}>
              <div className={cls.flexbox}>
                <button
                  className={locInputStatus == "L" ? cls.on : cls.off}
                  // onClick={()=>{setLocInputStatus("L")}}
                  onClick={setAsc}
                >
                  낮은가격순
                </button>
                <button
                  className={locInputStatus == "R" ? cls.on : cls.off}
                  // onClick={()=>{setLocInputStatus("R")}}
                  onClick={setDesc}
                >
                  높은가격순
                </button>
              </div>
            </div>
        </>) }
        {distanceOrderOn && (
          <>
            <div className={cls.asdf}>
              <div className={cls.flexbox}>
                <button
                  className={locInputStatus == "L" ? cls.on : cls.off}
                  onClick={giveDeviceLocation}
                >
                  현위치
                </button>
                <button
                  className={locInputStatus == "R" ? cls.on : cls.off}
                  onClick={giveValueDirectly}
                >
                  직접 입력
                </button>
              </div>
              <label htmlFor="latitude"></label>
              <input
                autoComplete="off"
                placeholder="위도"
                id="latitude"
                type="text"
                disabled={locInputStatus == "L"}
                onChange={onDirectChangeLat}
                value={lat}
              />
              <label htmlFor="longitude"></label>
              <input
                autoComplete="off"
                id="longitude"
                placeholder="경도"
                type="text"
                disabled={locInputStatus == "L"}
                onChange={onDirectChangeLng}
                value={lng}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Order;
