import React, { useState, useEffect } from 'react';
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

//Creates/updates active user based on user input
const CreateUser = (props) => {

    //Constants init
    const dispatch = useDispatch();
    const roles = ['None', 'Sagetapper', 'Software Engineer', 'CTO', 'Operations', 'Product Manager', 'CFO', 'CIO', 'COO', 'CEO', 'Sales', 'HR', 'Marketing', 'Business Analyst', 'Manager', 'Intern', 'Product Design', 'Finance', 'Accounting', 'Content Manager'];

    //State init
    const [role, setRole] = useState(''); //role: string = the selected role
    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [disabled, setDisabled] = useState(true); //disabled: boolean = disabled state of button

    //Handles when the role is selected from the dropdown
    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    //Handles when user submits new active user
    const handleUserSubmit = () => {
        //Calls prop function to show snackbar in content component
        props.handleClick();

        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: role
        };
        dispatch(updateUser(user));
    };

    //handles changes in text fields
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
    };

    //handles disabled button value
    useEffect(() => {
        if(firstName.length > 0 && lastName.length > 0 && email.length > 0 && role.length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [firstName, lastName, email, role]);

    return (
        <div className='text-field-container'>
            <h5>Update Active User</h5>
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
            <Button disabled={disabled} onClick={handleUserSubmit} style={{marginTop: '15px'}} variant="contained">Submit</Button>
        </div>
    );
}

export default CreateUser;