import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createUser, postUser, getUsers } from '../store/actions';
import './userList.css';

import UsersTable from "./UsersTable";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Add from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";



const UsersList = ({ createUser, newUser, postUser, getUsers }) => {

  const [modalAdd, setModalAdd] = useState(false);
  const [modalSucc, setModalSucc] = useState(false);
  const [errorValid, setErrorValid] = useState(false);
  const [disableBut, setDisableBut] = useState(false);


  const validate = () => {

    if (newUser.name.length === 0 || newUser.surname.length === 0 || newUser.desc.length === 0) {
      setErrorValid(true);
      setTimeout(() => setErrorValid(false), 1000);
    } else {

      setErrorValid(false);
      setDisableBut(true);
      postUser();
      setTimeout(() => {
        getUsers();
        setDisableBut(false);
        setModalSucc(true);
        setModalAdd(false);
        createUser('clear');
      }, 500);
      setTimeout(() => {
        setModalSucc(false);
      }, 1500);
    }

  }

  return <div>
    <Paper className="root">
      <Grid item xs={12}>
        <ButtonGroup className='m020'
          variant="contained"
          color="primary"
          size="small"
          aria-label="Split button">
          <Button onClick={() => setModalAdd(true)}>
            <Add /> Добавить нового пользователя
          </Button>
        </ButtonGroup>

        <UsersTable />

      </Grid>

      <Dialog
        open={modalAdd}
        aria-labelledby="form-add-user">
        <DialogTitle id="form-add-user">
          <Typography className="inline">Новый пользователь</Typography>
        </DialogTitle>
        <DialogContent dividers>
          {errorValid ?
            <div className='errorMess'>
              Заполните обязательные поля *</div> :
            null
          }
          <Grid container>
            <Grid item xs={12}>
              <TextField
                label="name"
                name="name"
                variant="outlined"
                required
                fullWidth={true}
                margin="normal"
                error={errorValid}
                onChange={e => createUser(e.target.value, e.target.name)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="surname"
                name="surname"
                variant="outlined"
                required
                fullWidth={true}
                margin="normal"
                error={errorValid}
                onChange={e => createUser(e.target.value, e.target.name)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="desc"
                name="desc"
                variant="outlined"
                required
                placeholder="desc"
                multiline
                fullWidth
                rows="3"
                margin="normal"
                error={errorValid}
                onChange={e => createUser(e.target.value, e.target.name)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => validate()} disabled={disableBut}> Добавить </Button>
          <Button onClick={() => { setModalAdd(false); createUser('clear') }} color="primary">
            Отмена
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={modalSucc}
        aria-labelledby="success-add-user">
        <DialogTitle id="success-add-user" className="successAdd">
          <Typography >Пользователь успешно добавлен</Typography>
        </DialogTitle>
      </Dialog>

    </Paper>
  </div>;
};


const mapStateToProps = state => ({
  newUser: state.createUser
});

const mapDispatchToProps = { createUser, postUser, getUsers };

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);