import React, { useState } from 'react';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';


//Drop down selectors to sort and filter comments
//Has not been fully implemented
const CommentSelectors = () => {

    const [sort, setSort] = useState(''); //sort: string = gets the value from the sort dropdown
    const [filter, setFilter] = useState(''); //filter: sting = gets value from filter dropdown

    //handles change in sort dropdown
    const handleSortChange = (event) => {
        setSort(event.target.value);
    };

    //handles change in filter dropdown
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120, marginLeft: '-1px', marginRight: '-1px' }}>
                <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sort}
                    label="Sort"
                    onChange={handleSortChange}
                >
                    <MenuItem value='Likes'>Likes</MenuItem>
                    <MenuItem value='Name'>Name</MenuItem>
                    <MenuItem value='Date'>Date</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filter}
                    label="Filter"
                    onChange={handleFilterChange}
                >
                    <MenuItem value='Name'>Name</MenuItem>
                    <MenuItem value='Completion'>Completion</MenuItem>
                    <MenuItem value='Date'>Date</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

export default CommentSelectors;