exports.getHome = (req, res) => {
    res.status(200).render('home', {
        title: 'Home'
    })
}

exports.getLoginForm = (req, res) => {
    res.status(200).render('login', {
        title: 'Login'
    })
}

exports.getSignupForm = (req, res) => {
    res.status(200).render('signup', {
        title: 'Signup'
    })
}

exports.getForgotPasswordForm = (req, res) => {
    res.status(200).render('forgotPassword', {
        title: 'Forgot password?'
    })
}

exports.getResetPasswordForm = (req, res) => {
    res.status(200).render('resetPassword', {
        title: 'Reset your password',
        token: req.params.token
    })
}