import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function BasicMenu(props: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const updateHandler = () => {
    //props.idx 해당되는 값 수정 post
    console.log(props.idx);
    setAnchorEl(null);
  };
  const deleteHandler = () => {
    //props.idx 해당되는 값 삭제 post
    console.log(props.idx);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button id="basic-button" aria-haspopup="true" onClick={handleClick}>
        <MoreVertIcon style={{ color: 'black' }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={updateHandler}>수정</MenuItem>
        <MenuItem onClick={deleteHandler}>삭제</MenuItem>
      </Menu>
    </div>
  );
}
