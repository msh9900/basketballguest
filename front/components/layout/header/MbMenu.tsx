import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';

export type RouteMapType = {
  [index: string]: string;
  소개: string;
  게스트모집: string;
  체육관대여: string;
  서비스: string;
};

interface Props {
  anchorElNav: HTMLElement | null;
  MenuLinkClickHandler: (event: React.MouseEvent<HTMLElement>) => void;
  RouteMap: RouteMapType;
}

const MbMenu = (props: Props) => {
  return (
    <>
      <Menu
        id="menu-appbar"
        anchorEl={props.anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(props.anchorElNav)}
        onClose={props.MenuLinkClickHandler}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        {Object.entries(props.RouteMap).map(([idx]) => (
          <MenuItem key={idx} onClick={props.MenuLinkClickHandler}>
            <Typography textAlign="center">{idx}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MbMenu;
