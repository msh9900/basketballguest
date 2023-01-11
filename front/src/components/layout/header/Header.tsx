import * as React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

// style
import cls from './Header.module.scss';

// mui
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import { IsLogout } from '../../../redux/modules/login';

type RouteMapType = {
  [index: string]: string;
  소개: string;
  게스트모집: string;
  체육관대여: string;
  서비스: string;
};

const RouteMap: RouteMapType = {
  소개: '/intro',
  게스트모집: '/guest',
  체육관대여: 'gym',
  서비스: '/service',
};
const bin = {
  userId: '',
  email: '',
  userImg: '',
  userName: '',
};
export default function Header() {
  const dispatch = useDispatch();
  const loginState = useSelector((state: any) => state.login.isLogin);

  useEffect(() => {
    console.log('loginState', loginState);
  }, [loginState]);

  let navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const [selectValue, setSelectValue] = React.useState('gym');

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const selectChangeHanlder = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
  };

  const MenuLinkClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    const text = event.currentTarget.textContent as string;
    navigate(RouteMap[text]);

    setAnchorElNav(null);
  };

  const UserMenuClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    if (event.currentTarget.textContent === '프로필') {
      navigate('/profile');
    }
    if (event.currentTarget.textContent === '로그인') {
      navigate('/login');
    }
    if (event.currentTarget.textContent === '로그아웃') {
      logoutHandler();
    }
    setAnchorElUser(null);
  };

  const logoutHandler = () => {
    dispatch(IsLogout(bin));
    //LOGOUT
    // window.localStorage.removeItem('user');
    // state 처리
    // 화면 처리
    // 쿠키 처리
  };

  return (
    <AppBar position="sticky" style={{ background: '#f1a707' }}>
      <div className={cls.container}>
        <Toolbar disableGutters sx={{ height: 100 }} className={cls.toolbar}>
          <div className={cls.appmenu}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={MenuLinkClickHandler}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {Object.entries(RouteMap).map(([idx]) => (
                <MenuItem key={idx} onClick={MenuLinkClickHandler}>
                  <Typography textAlign="center">{idx}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </div>

          {/* 홈 */}
          <Link to="/" className={cls.homename}>
            <div>
              <SportsBasketballIcon />
            </div>
            <div>BPT</div>
          </Link>

          {/* 메뉴 */}
          <div className={cls.listcontainer}>
            {Object.entries(RouteMap).map(([key, value]) => (
              <Link key={key} to={value} className={cls.HeaderList}>
                {key}
              </Link>
            ))}
          </div>

          {/* 검색창 */}
          <div className={cls.searchContainer}>
            <select
              className={cls.select}
              onChange={selectChangeHanlder}
              value={selectValue}
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

          {/* 유저 메뉴 */}
          <div className={cls.usercircle}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={UserMenuClickHandler}
            >
              <MenuItem onClick={UserMenuClickHandler}>
                <Typography textAlign="center">프로필</Typography>
              </MenuItem>
              {!loginState && (
                <MenuItem onClick={UserMenuClickHandler}>
                  <Typography textAlign="center">로그인</Typography>
                </MenuItem>
              )}
              {loginState && (
                <MenuItem onClick={UserMenuClickHandler}>
                  <Typography textAlign="center">로그아웃</Typography>
                </MenuItem>
              )}
            </Menu>
          </div>
        </Toolbar>

        {/* 검색바 */}
        <div className={cls.searchMoblieContainer}>
          <select
            className={cls.select}
            onChange={selectChangeHanlder}
            value={selectValue}
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
      </div>
    </AppBar>
  );
}
