import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, ButtonGroup, Button } from "@material-ui/core";
import { Create, Delete, CheckCircle } from "@material-ui/icons";
import moment from "moment";

import { deleteTovisit, checkTovisit } from "../../store/actions/tovisitActions";

const useStyles = makeStyles({
  tovisitStyle: {
    margin: "20px auto",
    padding: "20px",
    border: "2px solid #bdbdbd",
    borderRadius: "9px",
    display: "flex",
    justifyContent: "space-between",
  },
  moreStyle: {
    color: "#8f8f8f",
  },
  isComplete: {
    color: "green",
  },
  checked: {
    textDecoration: "line-through",
  },
});

const Tovisit = ({ tovisit, setTovisit, tovisits }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleOnUpdateClick = (id) => {
    const foundTovisit = tovisits.find((tovisit) => tovisit._id === id);
    setTovisit({ ...foundTovisit });
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
  };

  const handleDelete = (id) => {
    dispatch(deleteTovisit(id));
  };

  const handleCheck = (id) => {
    dispatch(checkTovisit(id));
  };

  return (
    <>
      <div className={classes.tovisitStyle}>
        <div>
          {tovisit.isComplete ? (
            <Typography variant="subtitle1" className={classes.checked}>
              {tovisit.name}
            </Typography>
          ) : (
            <Typography variant="subtitle1">{tovisit.name}</Typography>
          )}
          <Typography variant="body2" className={classes.moreStyle}>
            Author: {tovisit.author}
          </Typography>
          <Typography variant="body2" className={classes.moreStyle}>
            Added: {moment(tovisit.date).fromNow()}
          </Typography>
        </div>
        <div>
          {auth._id && (auth._id === tovisit.uid) ? (
            <ButtonGroup
              size="small"
              aria-label="outlined primary button group"
            >
              <Button onClick={() => handleCheck(tovisit._id)}>
                {tovisit.isComplete ? (
                  <CheckCircle className={classes.isComplete} />
                ) : (
                  <CheckCircle color="action" />
                )}
              </Button>
              <Button onClick={() => handleOnUpdateClick(tovisit._id)}>
                <Create color="primary" />
              </Button>
              <Button onClick={() => handleDelete(tovisit._id)}>
                <Delete color="secondary" />
              </Button>
            </ButtonGroup>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Tovisit;
