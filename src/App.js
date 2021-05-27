import {
  Button,
  Container,
  Divider,
  GridList,
  GridListTile,
  Hidden,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import MobileBtnGroup from "./components/MobileBtnGroup";
import merch from "./data";

const useStyles = makeStyles((theme) => ({
  btngrp: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(3),
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    width: 100,
    height: 140,
  },
  gridList: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "space-around",
    overflow: "hidden",
    paddingTop: theme.spacing(2),
  },
  overlay: {
    position: "absolute",
    height: "180",
    width: "180",
    background: "aqua",
    zIndex: 2,
  },
  tile:{ 
    display: "flex", 
    justifyContent: "center", 
    cursor: "pointer",
    backgroundColor: theme.palette.background.paper,
    }
}));

function App() {
  const classes = useStyles();
  const categories = ["All", ...new Set(merch.map((item) => item.category))];
  const [data, setData] = useState(merch);
  const [loading, setLoading] = useState(true);

  const handleBtnClick = (category) => {
    if (category === "All") {
      setData(merch);
      return;
    }
    const categorizedData = merch.filter((item) => item.category === category);
    setData(categorizedData);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      <Header />
      <div className={classes.btngrp}>
        <Hidden smDown>
          {categories.map((category, index) => (
            <Button
              key={index}
              variant="contained"
              color="primary"
              onClick={() => handleBtnClick(category)}
            >
              {category}
            </Button>
          ))}
        </Hidden>
        <Hidden mdUp>
          <MobileBtnGroup handleBtnClick={handleBtnClick} categories={categories} />
        </Hidden>
      </div>
      <Container className={classes.gridList}>
        {loading ? (
          <GridList cellHeight={200} cols={3}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <GridListTile key={i} style={{ display: "flex", justifyContent: "center" }}>
                <Skeleton variant="rect" height={180} width={240} />
              </GridListTile>
            ))}
          </GridList>
        ) : (
          <GridList cellHeight={200} cols={3}>
            {data.map((tile) => (
              <GridListTile
                key={tile.img}
                className={classes.tile}
              >
                <img src={tile.img} alt={tile.title} style={{ height: 180, width: 180 }} />
              </GridListTile>
            ))}
          </GridList>
        )}
        <Divider />
        <footer>
          <Typography variant="h6" component="h6">
            &copy; Merch Store - 2021
          </Typography>
        </footer>
      </Container>
    </>
  );
}

export default App;
