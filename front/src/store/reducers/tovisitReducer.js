import { toast } from "react-toastify";

const tovisitReducer = (tovisits = [], action) => {
  switch (action.type) {
    case "GET_TOVISITS":
      return action.tovisits.data;
    case "ADD_TOVISIT":
      toast.success("A tovisit was added...", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return [action.tovisit.data, ...tovisits];
    case "UPDATE_TOVISIT":
      toast.success("A tovisit was updated...", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return tovisits.map((tovisit) =>
        tovisit._id === action.tovisit.data._id ? action.tovisit.data : tovisit
      );
    case "CHECK_TOVISIT":
      toast.success("A tovisit status was changed...", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return tovisits.map((tovisit) =>
        tovisit._id === action.tovisit.data._id ? action.tovisit.data : tovisit
      );
    case "DELETE_TOVISIT":
      toast.success("A tovisit was deleted...", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return tovisits.filter((tovisit) => tovisit._id !== action.id);
    case "CLEAR_TOVISITS":
      return [];
    default:
      return tovisits;
  }
};

export default tovisitReducer;
