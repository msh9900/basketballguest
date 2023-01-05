import * as React from 'react';
import { Link } from 'react-router-dom';
import classes from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
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
import { useSelector } from 'react-redux';

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
export default function Header() {
  const loginState = useSelector((state: any) => state.login.islogin);
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
    //LOGOUT 구현
  };

  return (
    <AppBar position="fixed" style={{ background: '#f1a707' }}>
      <div className={classes.container}>
        <Toolbar
          disableGutters
          sx={{ height: 100 }}
          className={classes.toolbar}
        >
          <div className={classes.appmenu}>
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

          <Link to="/" className={classes.homename}>
            <div>
              <SportsBasketballIcon />
            </div>
            <div>BPT</div>
          </Link>
          <div className={classes.listcontainer}>
            {Object.entries(RouteMap).map(([key, value]) => (
              <Link key={key} to={value} className={classes.HeaderList}>
                {key}
              </Link>
            ))}
          </div>
          <div className={classes.searchContainer}>
            <select
              className={classes.select}
              onChange={selectChangeHanlder}
              value={selectValue}
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
          <div className={classes.usercircle}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* 로그인을 하면 사용자가 등록한 이미지가 나오게 해야함 만약 등록안하면 기본이미지 */}
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
        <div className={classes.searchMoblieContainer}>
          <select
            className={classes.select}
            onChange={selectChangeHanlder}
            value={selectValue}
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
      </div>
    </AppBar>
  );
}
