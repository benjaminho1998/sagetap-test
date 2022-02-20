import React from 'react';
import Avatar from '@mui/material/Avatar';

const AvatarIcon = (props) => {

    //This function is from https://mui.com/components/avatars/
    //It chooses a different color for the avatar depending on the name
    const stringToColor = (string) => {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.substr(-2);
        }
        return color;
    }

    //This function is from https://mui.com/components/avatars/
    //It gives each avatar the css styles to change the background color
    const stringAvatar = (name) => {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    return (
        <Avatar style={{width: '45px', height: '45px'}} {...stringAvatar(props.name)} />
    );
}

export default AvatarIcon;