# Sagetap Take Home Project

This is my submission for the Sagetap take home project.

### Objective
The objective of this project is to create a sidebar for builders to leave comments on.

### How to Run
- clone repo
- run `npm i`
- run `npm start`
- navigate to localhost:3000

### Features
- Base Features
    - Collapsable side bar
    - Commenting
    - Replying
- Additional Features
    - Fully responsive
    - Creating/updating a user
    - Liking
    - Unliking
    - View likes
    - Like counter
    - Completing comments
    - Pinning comments
    - Active user only comment deleting
    - Role within builder organization
    - Sagetapper identifier
    - Add comment floating icon
    - Scroll to top
    - Button disables
    - Active user name in comment box
    - Clear comment box
    - Feedback after updating user
    - Number of comments in subheader and sidebar header
    - Loading messaging before data loads
    - Change User

### Tech
- React
- Redux
- JavaScript
- CSS
- React Bootstrap
- Material UI
- Axios

### Challenges and Solutions
- Comment component kept rerendering for no reason even with React.memo. Realized it was the uuid key in Sidebar that kept changing, and removed it
- Tried checking for state values right after setting them to know if a button was supposed to be disabled or not, but the state wouldn't update in time and required at least two keystrokes in the last field to enable the button. As a result, I used the useEffect hook and fixed it, and it had the bonus of enabling the button when the fields are autofilled too.

### Potential Future Additions
- Functionality of sort and filter dropdowns
- Editing comments
- Un-completing
- Unit tests
- Persistence of icon states through sidebar unmount
