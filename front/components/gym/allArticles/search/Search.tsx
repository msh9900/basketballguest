import cls from "./Search.module.scss";
// import orderStatusType from "../order/interface_orderStatus";
import filterProps from "../filter/interface_filterStatus";
import {useState} from 'react'

interface Props {
  orderStatus: any;
  filterStatus: filterProps;
  setFilterStatus: React.Dispatch<React.SetStateAction<filterProps>>;
  searchRes: string;
  setSearchRes: React.Dispatch<React.SetStateAction<string>>;
  setNeedToSearch: React.Dispatch<React.SetStateAction<boolean>>;
  searchVal:string
  setSearchVal: React.Dispatch<React.SetStateAction<string>>;
  showSearchRes:boolean
  setShowSearchRes: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search = (props: Props) => {
  const onChange = (e: any) => {
    props.setSearchVal(e.target.value);
  };

  const magnifierClicked = (e: any) => {
    props.setSearchRes(props.searchVal);
    props.setNeedToSearch(true);
    activateSearch();
  };

  const serachPressed = (e: any) => {
    if (e.key === "Enter") {
      props.setSearchRes(props.searchVal);
      activateSearch();
    }
  };
  const activateSearch = () => {
    props.setNeedToSearch(true);
    props.setShowSearchRes(true)
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
            value={props.searchVal}
            onChange={onChange}
            onKeyDown={serachPressed}
          />
          <button className={cls.serarchBtn} onClick={magnifierClicked} />
        </div>
      </div>

      {props.showSearchRes && (
        <div className={cls.SearchRes}>
          <div>'{props.searchRes}'</div>
          <div>검색결과</div>
        </div>
      )}
    </>
  );
};

export default Search;
