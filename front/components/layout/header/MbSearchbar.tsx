import classes from "./Header.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import triggerSearch from "./_triggerSearch";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

interface Props {
  selectValue: string;
  searchValue: string;
  selectChangeHanlder: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}
function checkSpecial(str: string) {
  var special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;

  if (special_pattern.test(str) == true) {
    return true;
  } else {
    return false;
  }
}
const MbSearchbar = (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const onChangeSearchValue = (e: any) => {
    const strCheck = checkSpecial(e.target.value);
    if (strCheck) {
      alert("특수문자는 입력할 수 없습니다.");
    } else {
      props.setSearchValue(e.target.value);
    }
  };

  // ACTIVATE TRIGGER FUNCTION
  const searchBtn_Clicked = () => {
    triggerSearch(props.searchValue, props.selectValue, router, dispatch);
  };
  const searchBar_Entered = (e: any) => {
    e.preventDefault();
    triggerSearch(props.searchValue, props.selectValue, router, dispatch);
  };

  return (
    <div className={classes.searchMoblieContainer}>
      <select
        className={classes.select}
        onChange={props.selectChangeHanlder}
        value={props.selectValue}
      >
        <option value="gym">체육관대여</option>
        <option value="guest">게스트모집</option>
      </select>
      <form onSubmit={searchBar_Entered}>
        <input
          type="text"
          className={classes.searchinputbox}
          placeholder="search..."
          value={props.searchValue}
          onChange={onChangeSearchValue}
        />
      </form>
      <SearchIcon className={classes.searchIcon} onClick={searchBtn_Clicked} />
    </div>
  );
};

export default MbSearchbar;
