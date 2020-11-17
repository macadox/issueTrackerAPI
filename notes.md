# Notes

## Authentication

1. /login endpoint [x]
1. /signup endpoint for new users (protect with destructuring) [x]
1. /forgotPassword endpoint, that sends a link via email, /resetPassword/:token allows the user to change their password [x]
1. /updateDetails endpoint that allows the user to update their info (not email, not password) [x]
1. /updatePassword endpoint that allows the user to update their password [x]
1. patch, post, delete requests on users exclusive to admin. (especially work on updating password) [x]

## Model

[USERS]* ----- *[PROJECTS]
    *  \           1
        \          |
         \         |
          \        |
           \       *
             * [ISSUES]
                          
## Todos

- Implement helmet, rate limiting, data sanitization, hpp 
- Add authentication and authorization middleware in the router files. router.use(authController.protect, etc.)
- Add functions that calculate Quantity of Issues and updates it on the Project model with pre /^findOneAnd/ and post /^findOneAnd/ hooks

- design the webpage Home, Projects, Users (admin), User Data, Logout || Home, Login, Signup
- prepare view pug templates and build the frontend