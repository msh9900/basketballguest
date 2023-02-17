import classes from "./Header.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import triggerSearch from "./_triggerSearch";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

interface Props {
  selectValue: string;
  searchValue: any;
  selectChangeHanlder: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PcSearchbar = (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // ACTIVATE TRIGGER FUNCTION
  const searchBtn_Clicked = (e: any) => {
    triggerSearch(
      props.searchValue.current.value,
      props.selectValue,
      router,
      dispatch
    );
  };
  const searchBar_Entered = (e: any) => {
    e.preventDefault();
    triggerSearch(
      props.searchValue.current.value,
      props.selectValue,
      router,
      dispatch
    );
  };

  return (
    <>
      <div className={classes.searchContainer}>
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
            ref={props.searchValue}
          />
        </form>
        <SearchIcon
          className={classes.searchIcon}
          onClick={searchBtn_Clicked}
        />
      </div>
    </>
  );
};

export default PcSearchbar;
