import SearchIcon from "@mui/icons-material/Search";
import classes from "./Header.module.scss";
interface Props {
  selectChangeHanlder: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectValue: string;
}

const MbSearchbar = (props: Props) => {
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
      <input
        type="text"
        className={classes.searchinputbox}
        placeholder="search..."
      />
      <SearchIcon className={classes.searchIcon} />
    </div>
  );
};

export default MbSearchbar;
