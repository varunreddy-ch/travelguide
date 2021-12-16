import React from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from '@material-ui/core';
import { Send } from '@material-ui/icons';

import { addTovisit, updateTovisit } from '../../store/actions/tovisitActions';

const useStyles = makeStyles({
    formStyle: {
      margin: "0px auto",
      padding: "30px",
      borderRadius: "9px",
      boxShadow: "0px 0px 12px -3px #000000",
      display: "flex",
      justifyContent: "space-between",
    },
    submitButton: {
        marginLeft: "20px",
    }
  });

const AddTovisit = ({ tovisit, setTovisit }) => {
    const classes = useStyles();
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();

        if(tovisit._id){
            const id = tovisit._id;
            const updatedTovisit = {
                name: tovisit.name,
                isComplete: tovisit.isComplete,    
                date: tovisit.date,
                author: tovisit.author,
                uid: tovisit.uid
            }
            
            dispatch(updateTovisit(updatedTovisit, id));

        } else{
            const newTovisit = {
                ...tovisit,
                date: new Date()
            }

            dispatch(addTovisit(newTovisit));
        }
        setTovisit({ name: '', isComplete: false});
    }

    return ( 
        <>
            <form noValidate autoComplete="off" className={classes.formStyle} onSubmit = { handleSubmit }>
                <TextField
                    id="enter-tovisit"
                    label="enterToVisit"
                    variant="outlined"
                    autoFocus
                    fullWidth
                    value = {tovisit.name}
                    onChange = {(e) => setTovisit({...tovisit, name: e.target.value})}
                />
                <Button variant="contained" color="primary" className = {classes.submitButton} type="submit">
                    <Send/>
                </Button>
            </form>
        </>
     );
}
 
export default AddTovisit;