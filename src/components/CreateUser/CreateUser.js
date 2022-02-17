import React, { useState } from 'react';
import './CreateUser.css';
import TextField from '@mui/material/TextField';
import { v4 as uuidv4 } from 'uuid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/actions/userAction';

const CreateUser = () => {

    const roles = ['None', 'Sagetapper', 'Software Engeinner', 'Product Manager', 'CEO', 'Sales', 'HR', 'Marketing', 'Business Analyst', 'Manager', 'Intern', 'Product Design'];

    const [role, setRole] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const dispatch = useDispatch();

    const handleUserSubmit = () => {
        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: role
        };
        
        dispatch(updateUser(user));
    }

    const handleTextChange = (e) => {
        const input = e.target.value;
        const field = e.target.name;
        if(field === 'firstName') {
            setFirstName(input);
        }
        if(field === 'lastName') {
            setLastName(input);
        }
        if(field === 'email') {
            setEmail(input);
        }
    }

    return (
        <div className='text-field-container'>
            <h5>Create a User</h5>
            <TextField name='firstName' onChange={handleTextChange} value={firstName} style={{marginTop: '15px'}} label='First Name' variant="standard" />
            <TextField name='lastName' onChange={handleTextChange} value={lastName} style={{marginTop: '15px'}} label='Last Name' variant="standard" />
            <TextField name='email' onChange={handleTextChange} value={email} style={{marginTop: '15px'}} label='Email' variant="standard" />
            <FormControl style={{marginTop: '15px'}} variant="standard" sx={{ m: 1, width: 186 }}>
                <InputLabel>Role</InputLabel>
                <Select
                    value={role}
                    onChange={handleRoleChange}
                    label="Role"
                >
                    {roles.sort().map((role) => 
                        <MenuItem key={uuidv4()} value={role}>{role}</MenuItem>
                    )}
                </Select>
            </FormControl>
            <Button onClick={handleUserSubmit} style={{marginTop: '15px'}} variant="contained">Submit</Button>
        </div>
    );
}

export default CreateUser;