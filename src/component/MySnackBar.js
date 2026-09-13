import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';

export default function MySnakBar({open,message}) {

  const action = (
    <React.Fragment>
     
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        message="Note archived"
        action={action}
      >
      <Alert
       severity="success"
       sx={{width:"100%"}}
        >
       {message}
      </Alert>
      </Snackbar>
    </div>
  );
}