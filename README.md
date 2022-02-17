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

### Tech
- React
- Redux (pretend backend)
- JavaScript
- CSS
- React Bootstrap
- Material UI
- Axios

### Challenges and Solutions
- When
- Comment component kept rerendering for no reason. Realized it was the uuid key in Sidebar that kept changing
- Tried checking for state values right after setting them to know if a button was supposed to be disabled or not, but the state wouldn't update in time and required at least two keystrokes in the last field to enable the button. As a result, I used the useEffect hook and fixed it, and it had the bonus of enabling the button when the fields are autofilled too.
- TODO: change this. Something about replyMode and defaultvalue not working with newComment
- useCallback to memoize callback functions going to Comment child component to reduce renders of Comment

### Potential Future Additions

### TODO
- uninstall lodash
