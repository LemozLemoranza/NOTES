
const Login = (req,res) => {
   res.render('users/login')
}

const Register = (req,res) => {
    res.render('users/register')
}

module.exports = {
    Login,
    Register
}