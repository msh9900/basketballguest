import * as React from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.scss";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";

const pages = ["소개", "게스트모집", "체육관대여", "서비스"];

export default function Header() {
  let navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const MenuLinkClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    if (event.currentTarget.textContent === "소개") {
      navigate("/intro");
    }
    if (event.currentTarget.textContent === "게스트모집") {
      navigate("/guest");
    }
    if (event.currentTarget.textContent === "체육관대여") {
      navigate("/gym");
    }
    if (event.currentTarget.textContent === "서비스") {
      navigate("/service");
    }

    setAnchorElNav(null);
  };

  const UserMenuClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    if (event.currentTarget.textContent === "프로필") {
      navigate("/profile");
    }
    if (event.currentTarget.textContent === "로그인") {
      navigate("/login");
    }
    if (event.currentTarget.textContent === "로그아웃") {
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{ background: "#f1a707" }}>
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
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={MenuLinkClickHandler}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={MenuLinkClickHandler}>
                  <Typography textAlign="center">{page}</Typography>
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
            <Link to="/intro" className={classes.HeaderList}>
              소개
            </Link>
            <Link to="/guest" className={classes.HeaderList}>
              게스트모집
            </Link>
            <Link to="/gym" className={classes.HeaderList}>
              체육관대여
            </Link>
            <Link to="/service" className={classes.HeaderList}>
              서비스
            </Link>
          </div>

          <div className={classes.usercircle}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* 로그인을 하면 사용자가 등록한 이미지가 나오게 해야함 만약 등록안하면 기본이미지 */}
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={UserMenuClickHandler}
            >
              <MenuItem onClick={UserMenuClickHandler}>
                <Typography textAlign="center">프로필</Typography>
              </MenuItem>
              <MenuItem onClick={UserMenuClickHandler}>
                <Typography textAlign="center">로그인</Typography>
              </MenuItem>
              <MenuItem onClick={UserMenuClickHandler}>
                <Typography textAlign="center">로그아웃</Typography>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </div>
    </AppBar>
  );
}
