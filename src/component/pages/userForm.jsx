import React from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';

let UserFormComponent =()=> {
  return (
    
    <Card>
      <div style={{padding:50}}>
      <Grid container spacing={2}>
      <Grid item xs={6} md={8}>
        <TextField
            required
            id="outlined-required"
            label="Required"
            defaultValue="Hello World"
            fullWidth
          />
      </Grid>
      <Grid item xs={6} md={8}>
      <TextField
              disabled
              id="outlined-disabled"
              label="Disabled"
              defaultValue="Hello World"
            />
      </Grid>
        
      <Grid item xs={6} md={8}>
          <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
      </Grid>
        
      <Grid item xs={6} md={8}>
          <TextField
          id="outlined-read-only-input"
          label="Read Only"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
        
      <Grid item xs={6} md={8}>
          <TextField
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
        
      <Grid item xs={6} md={8}>
          <TextField id="outlined-search" label="Search field" type="search" />
      </Grid>
        
      <Grid item xs={6} md={8}>
        <TextField
          id="outlined-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
        />
      </Grid>  

        </Grid>
      </div>
      
    </Card>
  );
}

export default UserFormComponent;

{/* <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    > */}