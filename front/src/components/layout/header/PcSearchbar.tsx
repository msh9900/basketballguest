import cls from './Header.module.scss';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  selectValue: string
  selectChangeHanlder: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PcSearchbar = (props:Props) => {
  return (
    <>
      <div className={cls.searchContainer}>
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
    </>
  );
};

export default PcSearchbar;
