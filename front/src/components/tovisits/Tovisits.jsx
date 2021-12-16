import React, { useState } from "react";
import AddTovisit from "./AddTovisit";
import ListTovisits from "./ListTovisits";

import { useSelector } from "react-redux";

const Tovisits = () => {
  const auth = useSelector((state) => state.auth);
  const [tovisit, setTovisit] = useState({
    name: "",
    isComplete: false,
  });

  return (
    <>
      {auth._id ? (
        <>
          <AddTovisit tovisit={tovisit} setTovisit={setTovisit} />
          <ListTovisits tovisit={tovisit} setTovisit={setTovisit} />
        </>
      ) : (
        <>
          <ListTovisits tovisit={tovisit} setTovisit={setTovisit} />
        </>
      )}
    </>
  );
};

export default Tovisits;
