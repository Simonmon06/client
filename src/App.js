import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TopNav from './components/TopNav'
import PrivateRoute from './components/PrivateRoute'

import Home from "./sale/Home";
import Login from './auth/Login'
import Register from './auth/Register'
import Dashboard from './user/Dashboard';
import DashboardSeller from './user/DashboardSeller'
import NewItem from './items/NewItem'
import StripeCallback from './stripe/StripeCallback'
import EditItem from './items/EditItem'
function App() {
  return (
    <BrowserRouter>
      <TopNav/>
      <ToastContainer position="top-center"/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
        <PrivateRoute exact path='/dashboard' component={Dashboard}/>
        <PrivateRoute exact path='/dashboard/seller' component={DashboardSeller}/>
        <PrivateRoute exact path='/items/new' component={NewItem}/>
        <PrivateRoute exact path='/stripe/callback' component={StripeCallback}/>
        <PrivateRoute exact path='/item/edit/:itemId' component={EditItem}/>
      </Switch>
    </BrowserRouter>

  );
}

export default App;
