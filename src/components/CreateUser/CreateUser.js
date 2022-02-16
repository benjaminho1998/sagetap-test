import React, { useState } from 'react';
import './CreateUser.css';
import TextField from '@mui/material/TextField';
import { v4 as uuidv4 } from 'uuid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

const CreateUser = () => {

    const textFieldLabels = ['First Name', 'Last Name', 'Email'];
    const roles = ['None', 'Sagetapper', 'Software Engeinner', 'Product Manager', 'CEO', 'Sales', 'HR', 'Marketing', 'Business Analyst', 'Manager', 'Intern', 'Product Design'];

    const [role, setRole] = useState('');
    const [user, setUser] = useState({
        firstName: 'Example',
        lastName: 'User',
        email: 'example@email.com',
        role: 'Software Engineer'
    })

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleUserSubmit = () => {
        setUser()
    }

    return (
        <div className='text-field-container'>
            <h5>Create a User</h5>
            {textFieldLabels.map((label) =>
                <TextField key={uuidv4()} style={{marginTop: '15px'}} label={label} variant="standard" />
            )}
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