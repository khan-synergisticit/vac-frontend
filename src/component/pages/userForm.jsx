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
import { AddUserDetailsToStore, SaveUserDetailsToDB, fetchUserDetailsFromDB } from '../../state/user/userDetailsAction';
import { Input } from '@aws-amplify/ui-react';


let UserFormComponent =()=> {
  let user = useSelector((state) => state.UserReducer.User);
  let userDetails = useSelector((state) => state.UserDetailsReducer.UserDetails);
  let dispatch = useDispatch();
  let [firstName, setFirstName] = useState(userDetails.firstName ?? "");
  let [lastName, setLastName] = useState(userDetails.lastName ?? "");
  let [occupation, setOccupation] = useState(userDetails.occupation ?? "");
  let [phone, setPhone] = useState(userDetails.phone ?? "");
  let [email, setEmail] = useState(userDetails.email ?? "");
  let [gender, setGender] = useState(userDetails.gender ?? "");

  let [address1, setAddress1] = useState(userDetails.address1 ?? "");
  let [address2, setAddress2] = useState(userDetails.address2 ?? "");
  let [city, setCity] = useState(userDetails.city ?? "");
  let [state, setStates] = useState(userDetails.state ?? "");
  let [zipcode, setZipCode] = useState(userDetails.zipcode ?? "");

  useEffect(()=>{
    dispatch(fetchUserDetailsFromDB(user.userID))

  }, [])

  let selectGender = (genders) =>{
    setGender(genders);   
  }
  //console.log("USER DETAILS: " + JSON.stringify(userDetails));
  let onSubmit = () =>{

    let userDetail = {
      userID: user.userID,
      firstName: firstName,
      lastName: lastName,
      occupation: occupation,
      email:email,
      phone:phone,
      gender: gender,
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      zipcode: zipcode
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
              id="phone"
              label="Phone Number"
              style={{width:200}}
              defaultValue={userDetails.phone}
              onChange={(value)=>setPhone(value.target.value)}
            />
            <TextField
            id="occupation"
            label="Occupation"
            style={{width:300}}
            defaultValue={userDetails.occupation}
            onChange={(value)=>setOccupation(value.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={12}>
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
              label="Address 1"
              fullWidth
              defaultValue={userDetails.address1}
              onChange={(value)=>setAddress1(value.target.value)}
            />
        </Grid>
        <Grid item xs={12} md={12}>
        <TextField
              variant="standard"
              id="outlined-disabled"
              label="Address 2"
              defaultValue={userDetails.address2}
              onChange={(value)=>setAddress2(value.target.value)}
              fullWidth
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
            Submit
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
