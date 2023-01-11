import SearchIcon from '@mui/icons-material/Search';
import cls from './Header.module.scss';
interface Props {
  selectChangeHanlder: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectValue:string;
}

const MbSearchbar = (props:Props) => {
  return (
    <div className={cls.searchMoblieContainer}>
      <select
        className={cls.select}
        onChange={props.selectChangeHanlder}
        value={props.selectValue}
      >
        <option value="gym">체육관대여</option>
        <option value="guest">게스트모집</option>
      </select>
      <input
        type="text"
        className={cls.searchinputbox}
        placeholder="search..."
      />
      <SearchIcon className={cls.searchIcon} />
    </div>
  );
};

export default MbSearchbar;
