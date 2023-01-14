import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import classes from "./Header.module.scss";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

interface Props {
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
  anchorElUser: null | HTMLElement;
  UserMenuClickHandler: (event: React.MouseEvent<HTMLElement>) => void;
  loginState: boolean;
}

const UserMenu = (props: Props) => {
  return (
    <>
      <div className={classes.usercircle}>
        <Tooltip title="Open settings">
          <IconButton onClick={props.handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="" />
          </IconButton>
        </Tooltip>

        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={props.anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(props.anchorElUser)}
          onClose={props.UserMenuClickHandler}
        >
          {props.loginState && (
            <MenuItem onClick={props.UserMenuClickHandler}>
              <Typography textAlign="center">프로필</Typography>
            </MenuItem>
          )}

          {!props.loginState && (
            <MenuItem onClick={props.UserMenuClickHandler}>
              <Typography textAlign="center">로그인</Typography>
            </MenuItem>
          )}

          {props.loginState && (
            <MenuItem onClick={props.UserMenuClickHandler}>
              <Typography textAlign="center">로그아웃</Typography>
            </MenuItem>
          )}
        </Menu>
      </div>
    </>
  );
};

export default UserMenu;
