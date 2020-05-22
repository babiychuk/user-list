import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { getUsers, editUser, saveChange, postUser, selectUser, deleteUser } from '../store/actions';

import './userList.css';

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const UsersTable = ({ getUsers, users, editUser, editUs, saveChange, selectUser, deleteUser, selectUs }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [errorValid, setErrorValid] = useState(false);
  const [disableBut, setDisableBut] = useState(false);

  const [editModal, setEditModal] = useState(false);
  const [modalSucc, setModalSucc] = useState(false);
  const [delModal, setDelModal] = useState(false);

  const [textModal, setTextModal] = useState('отредактирован');

  const headRows = [
    { id: 'id', numeric: false, label: 'id' },
    { id: 'name', numeric: true, label: 'name' },
    { id: 'surname', numeric: true, label: 'surname' },
    { id: 'desc', numeric: true, label: 'desc' },
    { id: 'edit', numeric: true, label: 'Редактировать' },
    { id: 'delete', numeric: true, label: 'Удалить' },
  ];

  const validate = () => {

    if (editUs.name.length === 0 || editUs.surname.length === 0 || editUs.desc.length === 0) {
      setErrorValid(true);
      setTimeout(() => setErrorValid(false), 1000);
    } else {
      saveChange(editUs.id);
      setErrorValid(false);
      setTextModal('отредактирован');
      setDisableBut(true);
      setTimeout(() => {
        getUsers();
        setDisableBut(false);
        setModalSucc(true);
        setEditModal(false);
      }, 500);
      setTimeout(() => {
        setModalSucc(false);
      }, 1500);
    }
  }

  const deleteU = () => {
    deleteUser(selectUs.id);
    setDelModal(false); 
    setTextModal('удален');
    setTimeout(() => {
      setModalSucc(true);
      getUsers();
    }, 400);
    setTimeout(() => {
      setModalSucc(false);
    }, 1500);
  }

  return <div>
    <Paper className='m020'>
      <Table>
        <TableHead >
          <TableRow className='tableHead'>
            {headRows.map(row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
              >
                {row.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, num) => (
            <TableRow key={user.id}>
              <TableCell align="left">{user.id}</TableCell>
              <TableCell align="right">{user.name}</TableCell>
              <TableCell align="right">{user.surname}</TableCell>
              <TableCell align="right">{user.desc}</TableCell>
              <TableCell align="right"><IconButton onClick={() => { editUser(user.id); setEditModal(true); }}><EditIcon /></IconButton></TableCell>
              <TableCell align="right"><IconButton onClick={() => { selectUser(user.id); setDelModal(true) }}><DeleteIcon /></IconButton></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
        onChangePage={(event, pageNum) => setPage(pageNum)}
        onChangeRowsPerPage={(event) => { setRowsPerPage(+event.target.value); setPage(0) }}
      />
    </Paper>

    <Dialog
      open={editModal}
      aria-labelledby="form-add-user">
      <DialogTitle id="form-add-user">
        <Typography className="inline">Редактировать пользователя</Typography>
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
              value={editUs.name}
              error={errorValid}
              label="name"
              name="name"
              variant="outlined"
              required
              fullWidth={true}
              margin="normal"
              onChange={e => editUser('none', e.target.value, e.target.name)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={editUs.surname}
              error={errorValid}
              label="surname"
              name="surname"
              variant="outlined"
              required
              fullWidth={true}
              margin="normal"
              onChange={e => editUser('none', e.target.value, e.target.name)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={editUs.desc}
              error={errorValid}
              label="desc"
              name="desc"
              variant="outlined"
              required
              placeholder="desc"
              multiline
              fullWidth
              rows="3"
              margin="normal"
              onChange={e => editUser('none', e.target.value, e.target.name)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => validate()} disabled={disableBut}> Сохранить </Button>
        <Button color="primary" onClick={() => { setEditModal(false); }}>
          Отмена
          </Button>
      </DialogActions>
    </Dialog>

    <Dialog
      open={modalSucc}
      aria-labelledby="success-add-user">
      <DialogTitle id="success-add-user" className="successAdd">
      <Typography >Пользователь {textModal}!</Typography>
      </DialogTitle>
    </Dialog>

    <Dialog
      open={delModal}
      aria-labelledby="success-add-user">
      <DialogTitle id="success-add-user" className="errorMess">
        <Typography >Вы действительно хотите удалить пользователя?</Typography>
      </DialogTitle>
      <DialogActions>
        <Button className="errorMess" onClick={() => deleteU()} disabled={disableBut}> Удалить </Button>
        <Button color="primary" onClick={() => { setDelModal(false); }}>
          Отмена
          </Button>
      </DialogActions>
    </Dialog>

  </div>;
};


const mapStateToProps = state => ({
  users: state.getUsers,
  editUs: state.editUser,
  selectUs: state.selectUser
});

const mapDispatchToProps = { getUsers, editUser, saveChange, postUser, selectUser, deleteUser };

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);