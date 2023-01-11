import cls from './Search.module.scss';
import { useState } from 'react';

interface Props {
  searchRes: string;
  setSearchRes: React.Dispatch<React.SetStateAction<string>>;
}

const Search = (props: Props) => {
  const [searchVal, setSearchVal] = useState('');

  const onChange = (e: any) => {
    setSearchVal(e.target.value);
  };
  const getSearchRes = (e: any) => {
    props.setSearchRes(searchVal);
  };
  const onKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      props.setSearchRes(searchVal);
    }
  };
  return (
    <>
      <div className={cls.SearchLayout}>
        <div>
          <h3 className={cls.alignLeft}>검색 :</h3>
          <input
            type="text"
            value={searchVal}
            onChange={onChange}
            onKeyPress={onKeyPress}
          />
          <button className={cls.serarchBtn} onClick={getSearchRes}/>
        </div>
      </div>
      {props.searchRes.length > 0 && (
          <div className= {cls.SearchRes}>
            <div>'{props.searchRes}'</div> 
            <div>검색결과</div>
          </div>
        )}
    </>
  );
};

export default Search;
