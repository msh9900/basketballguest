import cls from './Search.module.scss';
import { useState, useEffect } from 'react';

const Search = () => {

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        alert(searchVal)
        setSearchRes(searchVal);
      }
    });
  }, []);

  const [searchVal, setSearchVal] = useState('');
  const [searchRes, setSearchRes] = useState('');

  const onChange = (e: any) => {
    setSearchVal(e.target.value);
  }; 
  
  const getSearchRes = (e: any) => {
    setSearchRes(searchVal);
  };

  return (
    <>
      <div className={cls.SearchLayout}>
        <input type="text" value={searchVal} onChange={onChange} />
        <button onClick={getSearchRes}>검색</button>
        <div>
          <span>{searchRes}</span> 검색결과 :{' '}
        </div>
      </div>
    </>
  );
};

export default Search;
