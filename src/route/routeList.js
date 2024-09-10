import Login from "../screens/login"
import Signup from "../screens/signup"
import Home from "../screens/home"

export const AuthRoutes = [
    {name:'home',component:Home},
]

export const UnAuthRoutes = [
    {name:'login',component:Login},
    {name:'signup',component:Signup},
]