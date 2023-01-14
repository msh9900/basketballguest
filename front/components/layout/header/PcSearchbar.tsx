import classes from "./Header.module.scss";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  selectValue: string;
  selectChangeHanlder: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PcSearchbar = (props: Props) => {
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
        <input
          type="text"
          className={classes.searchinputbox}
          placeholder="search..."
        />
        <SearchIcon className={classes.searchIcon} />
      </div>
    </>
  );
};

export default PcSearchbar;
