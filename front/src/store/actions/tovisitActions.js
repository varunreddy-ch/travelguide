import axios from "axios";
import { url, setHeaders } from "../../api";
import { toast } from "react-toastify";

export const getTovisits = () => {
  return (dispatch) => {
    axios
      .get(`${url}/tovisits`, setHeaders())
      .then((tovisits) => {
        dispatch({
          type: "GET_TOVISITS",
          tovisits,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addTovisit = (newTovisit) => {
  return (dispatch, getState) => {
    const author = getState().auth.name;
    const uid = getState().auth._id;
    axios
      .post(`${url}/tovisits`, { ...newTovisit, author, uid }, setHeaders())
      .then((tovisit) => {
        dispatch({
          type: "ADD_TOVISIT",
          tovisit,
        });
      })
      .catch((error) => {
        console.log(error.response);

        toast.error(error.response?.data, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
};

export const updateTovisit = (updatedTovisit, id) => {
  return (dispatch) => {
    axios
      .put(`${url}/tovisits/${id}`, updatedTovisit, setHeaders())
      .then((tovisit) => {
        dispatch({
          type: "UPDATE_TOVISIT",
          tovisit,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response?.data, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
};

export const deleteTovisit = (id) => {
  return (dispatch) => {
    axios
      .delete(`${url}/tovisits/${id}`, setHeaders())
      .then(() => {
        dispatch({
          type: "DELETE_TOVISIT",
          id,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response?.data, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
};

export const checkTovisit = (id) => {
  return (dispatch) => {
    axios
      .patch(`${url}/tovisits/${id}`, {}, setHeaders())
      .then((tovisit) => {
        dispatch({
          type: "CHECK_TOVISIT",
          tovisit,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response?.data, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
};
