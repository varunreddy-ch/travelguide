import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Tovisit from "./Tovisit";

import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import { getTovisits } from "../../store/actions/tovisitActions";

const useStyles = makeStyles({
  tovisitsStyle: {
    margin: "20px auto",
    padding: "20px",
    borderRadius: "9px",
    boxShadow: "0px 0px 12px -3px #000000",
  },
});

const ListTovisits = ({ tovisit, setTovisit }) => {
  const auth= useSelector((state) => state.auth);
  const tovisits = useSelector((state) => state.tovisits);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTovisits());
  }, [tovisit._id, dispatch]);

  if (!auth._id) return <Redirect to="/signin" />;

  return (
    <>
      <div className={classes.tovisitsStyle}>
        <Typography variant="h5">
          {" "}
          {tovisits.length > 0 ? "theTovisits;" : "noTovisitsYet;"}{" "}
        </Typography>
        {tovisits &&
          tovisits.map((tovisit) => {
            return (
              <Tovisit
                tovisit={tovisit}
                key={tovisit._id}
                setTovisit={setTovisit}
                tovisits={tovisits}
              />
            );
          })}
      </div>
    </>
  );
};

export default ListTovisits;
