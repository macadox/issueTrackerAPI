# Notes

## Model

[USERS]* ----- *[PROJECTS]
    *  \           1
        \          |
         \         |
          \        |
           \       *
             * [ISSUES]
                          
## Todos

### Authentication & Security

#### Done
- /login endpoint [x]
- /signup endpoint for new users (protect with destructuring) [x]
- /forgotPassword endpoint, that sends a link via email, /resetPassword/:token allows the user to change their password [x]
- /updateDetails endpoint that allows the user to update their info (not email, not password) [x]
- /updatePassword endpoint that allows the user to update their password [x]
- patch, post, delete requests on users exclusive to admin. (especially work on updating password) [x]
- Add authentication and authorization middleware in the router files. router.use(authController.protect, etc.) [x]
- Implement helmet, rate limiting, data sanitization, hpp [ ] | Everything but HPP

#### Todo
- 

### Data & API

#### Done
- 
#### Todo
- prepare json files, from which I can import sample projects + users [ ]
- Add functions that calculate Quantity of Issues and updates it on the Project model with pre /^findOneAnd/ and post /^findOneAnd/ hooks [ ]

### Templates

#### Done
- Setup pug as templating engine [x]
- prepare my own email templates in pug [x]
- prepare grid and table views for both projects and issues [x]
- prepare edit, create and preview for forms [x]
- CRUD operations on the forms [x]
- prepare 404 pages if resource is unavailable [x]
- Prepare Component for Setting date and Single Select ('MUST', 'SHOULD', 'COULD', 'WONT') [x]
- Prepare editable table component for acceptance Criteria [x]
- Prepare Datepicker [x]
- Add alerts when changing page if form is opened [x]

#### Todo
- save grid/table view preference in local storage [ ]
- Prepare validator on the forms [ ]
- Implement Breadcrumbs [ ]
- Add sorting and filtering options on lists, tabular data [ ]
- Find another way to collect NESTED data in Array than stringifying into an input [ ]
### Modules

#### Done
- design the webpage Home, Projects, Users (admin), User Data, Logout || Home, Login, Signup [x]
- Implement Admin tab to manage users [x]
- Implement User tab, updating preferences, password, user name, email, photo [x]

#### Todo
- Design Dashboard [ ]
- Implement Dashboard [ ]







