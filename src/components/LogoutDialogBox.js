import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class LogoutDialogBox extends React.Component {
    state = {
        open: false,
      };
    
      handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };
    
      render() {
        return (
          <div>
            <Button onClick={this.handleClickOpen}>Open alert dialog</Button>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">Are you sure you want to logout?</DialogTitle>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Yes
                </Button>
                <Button onClick={this.handleClose} color="primary" autoFocus>
                  No
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
      }
    }