import cls from "./Search.module.scss";
import { useState } from "react";
import OrderStatusProps from "../order/interface_orderStatus";
import filterProps from "../filter/interface_filterStatus";

interface Props {
  orderStatus: OrderStatusProps;
  setOrderStatus: React.Dispatch<React.SetStateAction<OrderStatusProps>>;
  filterStatus: filterProps;
  setFilterStatus: React.Dispatch<React.SetStateAction<filterProps>>;
  searchRes: string;
  setSearchRes: React.Dispatch<React.SetStateAction<string>>;
  setNeedToSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search = (props: Props) => {
  const [searchVal, setSearchVal] = useState("");

  const onChange = (e: any) => {
    setSearchVal(e.target.value);
  };

  const serachClicked = (e: any) => {
    props.setSearchRes(searchVal);
    props.setNeedToSearch(true);
  };

  const serachPressed = (e: any) => {
    if (e.key === "Enter") {
      props.setSearchRes(searchVal);
      getSearch();
    }
  };
  const getSearch = () => {
    props.setNeedToSearch(true);
  };

  return (
    <>
      <div className={cls.SearchLayout}>
        <div className={cls.searchTitle}>
          <h3>적용하여 검색 :</h3>
        </div>
        <div>
          <input
            type="text"
            value={searchVal}
            onChange={onChange}
            onKeyDown={serachPressed}
          />
          <button className={cls.serarchBtn} onClick={serachClicked} />
        </div>
      </div>

      {props.searchRes.length > 0 && (
        <div className={cls.SearchRes}>
          <div>'{props.searchRes}'</div>
          <div>검색결과</div>
        </div>
      )}
    </>
  );
};

export default Search;
