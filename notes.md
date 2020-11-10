# Notes

## Authentication

1. /login endpoint [x]
1. /signup endpoint for new users (protect with destructuring) [x]
1. /forgotPassword endpoint, that sends a link via email, /resetPassword/:token allows the user to change their password [x]
1. /updateDetails endpoint that allows the user to update their info (not email, not password) [x]
1. /updatePassword endpoint that allows the user to update their password [x]
1. patch, post, delete requests on users exclusive to admin. (especially work on updating password) [ ]

## Model

[USERS]* ----- *[PROJECTS]
    *  \           1
        \          |
         \         |
          \        |
           \       *
             * [ISSUES]
                          