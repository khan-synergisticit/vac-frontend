import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Button, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { AddUserDetailsToStore, SaveUserDetailsToDB, FetchUserDetailsFromDB } from '../../state/user/userDetailsAction';
import { DateConverter } from '../utils/dateConverter';

let UserFormComponent =()=> {
  let user = useSelector((state) => state.UserReducer.User);
  let userDetails = useSelector((state) => state.UserDetailsReducer.UserDetails);
  let dispatch = useDispatch();
  let [firstName, setFirstName] = useState(userDetails.firstName ?? "");
  let [lastName, setLastName] = useState(userDetails.lastName ?? "");
  let [email, setEmail] = useState(userDetails.email ?? "");
  let [gender, setGender] = useState(userDetails.gender ?? "");

  let [address, setAddress1] = useState(userDetails.address1 ?? "");
  let [city, setCity] = useState(userDetails.city ?? "");
  let [state, setStates] = useState(userDetails.state ?? "");
  let [zipcode, setZipCode] = useState(userDetails.zipcode ?? "");
  let [birthDate, setBirthDate] = useState(userDetails.birthDate ?? "")

  console.log("Birthdate: " + birthDate);

  useEffect(()=>{
    dispatch(FetchUserDetailsFromDB(user.userID))

  }, [])

  let selectGender = (genders) =>{
    setGender(genders);   
  }
  console.log("USER DETAILS: " + JSON.stringify(userDetails));
  let onSubmit = () =>{

    let userDetail = {
      userID: user.userID,
      firstName: firstName ?? userDetails.firstName,
      lastName: lastName ?? userDetails.lastName,
      occupation: occupation ?? userDetails.occupation,
      email:email ?? userDetails.email,
      phone:phone ?? userDetails.phone,
      gender: gender ?? userDetails.gender,
      address1: address ?? userDetails.address1,
      city: city ?? userDetails.city,
      state: state ?? userDetails.state,
      zipcode: zipcode ?? userDetails.zipcode
    }
    dispatch(SaveUserDetailsToDB(userDetail));
    dispatch(AddUserDetailsToStore(userDetail));

  }

  return (    
    <div >
    <Card style={{width:600}}>
      <div style={{padding:50}} key={userDetails.firstName}>
      <Grid container spacing={2} >
      <Grid item xs={12} md={12}>
        <TextField            
            
            id="first-name"
            label="First Name"            
            fullWidth
            
            defaultValue={userDetails.firstName}
            onChange={(value)=>setFirstName(value.target.value)}
          />
      </Grid>
      <Grid item xs={12} md={12}>
      <TextField
              id="last-name"
              label="Last Name"
              fullWidth
              defaultValue={userDetails.lastName}
              onChange={(value)=>setLastName(value.target.value)}
            />
      </Grid>
      <Grid item xs={12} md={12}>
        <TextField
            id="birthDate"
            label="Age"
            fullWidth
            defaultValue={userDetails.birthDate}
            onChange={(value)=>setBirthDate(value.target.value)}
        />
     
      <TextField
            id="email"
            label="Email"
            fullWidth
            defaultValue={userDetails.email}
            onChange={(value)=>setEmail(value.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={12}>
          <GenderMenu setGender={selectGender}/>
      </Grid>
      <Grid item xs={12} md={12}>
      <Box sx={{ width: '100%' }}>
       <Grid container rowSpacing={1} >
        <Grid item xs={12} md={12}>
        <TextField              
              variant="standard"
              id="outlined-disabled"
              label="Address"
              fullWidth
              defaultValue={userDetails.address}
              onChange={(value)=>setAddress1(value.target.value)}
            />
        </Grid>
        <Grid item xs={12} md={12} >
        <TextField
              variant="standard"
              id="outlined-disabled"
              label="City"
              defaultValue={userDetails.city}
              onChange={(value)=>setCity(value.target.value)}
              style={{width:250}}
            />
             <TextField
              variant="standard"
              id="outlined-disabled"
              label="State"
              defaultValue={userDetails.state}
              onChange={(value)=>setStates(value.target.value)}
              style={{width:150}}
            />
            <TextField
              variant="standard"
              type='number'
              id="outlined-disabled"
              label="Zip Code"
              defaultValue={userDetails.zipcode}
              onChange={(value)=>setZipCode(value.target.value)}
              style={{width:100}}
            />
        </Grid> 
        <Grid item xs={12} md={12} >
          <Button variant="contained" onClick={onSubmit}>
            Save
          </Button>
          </Grid>
      </Grid> 
    </Box>
      </Grid>
          
        </Grid>
      </div>
      
    </Card>
    </div>
  );
}

let GenderMenu = ({setGender}) =>{
  return (
    <Dropdown>
      <MenuButton size='xl'>Gender</MenuButton>
      <Menu>
        <MenuItem onClick={()=>setGender("Male")}>Male</MenuItem>
        <MenuItem onClick={()=>setGender("Female")}>Female</MenuItem>
        <MenuItem onClick={()=>setGender("Other")}>Other</MenuItem>
      </Menu>
    </Dropdown>
  );
}



export default UserFormComponent;
