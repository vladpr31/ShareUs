import React from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, Box, Menu, MenuItem } from "@mui/material";
import { deletePost } from "../../../actions/posts";
import { Delete, Edit } from "@mui/icons-material";

const PostOptions = ({
  menuOpen,
  handleMenu,
  anchorEl,
  post,
  handleOpenModal,
  openModal,
  setMenuOpen,
  setCurrentId,
  setOpenModal,
}) => {
  const dispatch = useDispatch();
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={menuOpen}
      onClose={handleMenu}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <MenuItem
        onClick={() => {
          setCurrentId(post._id);
          setMenuOpen(false);
        }}
      >
        <Edit fontSize="small" />
        &nbsp; Edit
      </MenuItem>
      <MenuItem onClick={handleOpenModal}>
        <Delete fontSize="small" />
        &nbsp; Delete
      </MenuItem>
      <Modal className="deleteModal" open={openModal} onClose={handleOpenModal}>
        <Box className="modalBox">
          <h2 id="modalTitle">Are You Sure You Want To Delete The Post?</h2>
          <hr></hr>
          <Button
            id="yes-btn"
            onClick={() => {
              dispatch(deletePost(post._id));
              setOpenModal(false);
            }}
          >
            Yes
          </Button>
          <Button id="no-btn" onClick={handleOpenModal}>
            No
          </Button>
        </Box>
      </Modal>
    </Menu>
  );
};

export default PostOptions;
