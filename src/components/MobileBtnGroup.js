import { List, ListItem, ListItemText, makeStyles, Menu, MenuItem } from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const MobileBtnGroup = (props) => {
  const classes = useStyles();
  const { handleBtnClick, categories } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleItemSelected = (index, category) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    handleBtnClick(category);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const transformCategory = (param) =>
    param.charAt(0).toUpperCase() + param.split("").slice(1).join("");
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="Categories">
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="category-menu"
          aria-label="Choose a category"
          onClick={handleListItemClick}
        >
          <ListItemText
            primary="Choose a category"
            secondary={transformCategory(categories[selectedIndex])}
          />
        </ListItem>
      </List>
      <Menu
        id="category-menu"
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {categories.map((category, index) => (
          <MenuItem
            key={index}
            selected={index === selectedIndex}
            onClick={() => handleItemSelected(index, category)}
            style={{ textTransform: "capitalize" }}
          >
            {category}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default MobileBtnGroup;
