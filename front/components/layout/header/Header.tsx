import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

// style
import cls from "./Header.module.scss";
// mui
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { IsLogout } from "../../../redux/modules/login";
// component
import MbMenu from "./MbMenu";
import PcMenu from "./PcMenu";
import PcSearchbar from "./PcSearchbar";
import UserMenu from "./UserMenu";
import MbSearchbar from "./MbSearchbar";
import RouteMap from "./_RouteMap";

export default function Header() {
  const dispatch = useDispatch();
  const loginState = useSelector((state: any) => state.login.isLogin);

  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [selectValue, setSelectValue] = React.useState("gym");

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
    router.push(RouteMap[text]);
    setAnchorElNav(null);
  };

  const UserMenuClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    if (event.currentTarget.textContent === "프로필") {
      router.push("/profile");
    }
    if (event.currentTarget.textContent === "로그인") {
      router.push("/login");
    }
    if (event.currentTarget.textContent === "로그아웃") {
      logoutHandler();
    }
    setAnchorElUser(null);
  };

  const logoutHandler = () => {
    dispatch(IsLogout(""));
  };

  return (
    <AppBar position="sticky" style={{ background: "#f1a707" }}>
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
            <MbMenu
              anchorElNav={anchorElNav}
              MenuLinkClickHandler={MenuLinkClickHandler}
              RouteMap={RouteMap}
            />
          </div>
          <PcMenu />
          <PcSearchbar
            selectValue={selectValue}
            selectChangeHanlder={selectChangeHanlder}
          />
          <UserMenu
            handleOpenUserMenu={handleOpenUserMenu}
            anchorElUser={anchorElUser}
            UserMenuClickHandler={UserMenuClickHandler}
            loginState={loginState}
          />
        </Toolbar>
        <MbSearchbar
          selectChangeHanlder={selectChangeHanlder}
          selectValue={selectValue}
        />
      </div>
    </AppBar>
  );
}
