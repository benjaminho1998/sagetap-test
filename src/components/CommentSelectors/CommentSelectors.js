import React, { useState } from 'react';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import './CommentSelectors.css';

//Drop down selectors to sort comments
const CommentSelectors = (props) => {

    const [sort, setSort] = useState(''); //sort: string = gets the value from the sort dropdown

    //handles change in sort dropdown
    const handleSortChange = (event) => {
        setSort(event.target.value);
    };

    //handles when user clicks apply
    const handleApply = () => {
        props.handleSort(sort);
    } 

    return (
        <div className='sort'>
            <FormControl sx={{ m: 1, minWidth: 120, marginLeft: '0px' }}>
                <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sort}
                    label="Sort By"
                    onChange={handleSortChange}
                >
                    <MenuItem value='idLow'>Reset</MenuItem>
                    <MenuItem value='numberOfLikes'>Most Likes</MenuItem>
                    <MenuItem value='nameLow'>Name</MenuItem>
                    <MenuItem value='id'>Most Recent</MenuItem>
                    <MenuItem value='roleLow'>Role</MenuItem>
                </Select>
            </FormControl>
            <Button style={{marginLeft: '5px'}} onClick={handleApply}>Apply</Button>
        </div>
    );
}

export default CommentSelectors;