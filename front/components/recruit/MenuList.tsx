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
  const updateHandler = async () => {
    //props.idx 해당되는 값 수정 post
    const data = {
      contentidx: props.idx,

    };
    const response = await fetch("http://localhost:4000/board/삭제될 라우터 주소", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const res = await response.json();
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
