import Login from "../screens/login"
import Signup from "../screens/signup"
import Home from "../screens/home"
import CoinScreen from "../screens/coinScreen"

export const AuthRoutes = [
    {name:'coinScreen',component:CoinScreen},
    {name:'home',component:Home},
]

export const UnAuthRoutes = [
    {name:'coinScreen',component:CoinScreen},
    {name:'login',component:Login},
    {name:'signup',component:Signup},
]