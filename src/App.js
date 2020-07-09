import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import PublishIcon from '@material-ui/icons/Publish';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from "react-hook-form";
import * as Yup from 'yup'
import { app } from './base';
import { Tooltip } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 30
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 16, 2)
  },
  button: {
    marginLeft: 140
  }
}));

export default function FileUpload() {
  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    validationSchema: Yup.object({
      email: Yup.string().email('This field should be a valid email').required('This field is required'),
      password: Yup.string().min(6, 'Password should be at least 6 characters').required('This field is required')
    })
  })

  const upload = (data) => {
    const storageRef = app.storage().ref()
    const fileRef = storageRef.child(data.image[0].name)
    fileRef.put(data.image[0]).then(() => console.log('file uploaded..!'))
    console.log(data)
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Yeah..!
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(upload)} >
          <TextField
            variant="outlined"
            inputRef={register}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          {errors.email && <div style={{ color: 'red' }}>{errors.email.message}</div>}
          <TextField
            variant="outlined"
            inputRef={register}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {errors.password && <div style={{ color: 'red' }}>{errors.password.message}</div>}
          <div className={classes.button}>
            <input accept="image/*" name='image' ref={register} 
            id="icon-button-file" type="file" style={{ display: 'none' }} />
            <Tooltip title='choose a pic' >
            <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PublishIcon/>
                </IconButton>
            </label>
            </Tooltip>
          </div>
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save
          </Button>
        </form>
      </Paper>
    </Container>
  );
}