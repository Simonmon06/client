import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TopNavBar from './components/navbars/TopNavBar'
import PrivateRoute from './components/PrivateRoute'
import SearchResult from './components/search/SearchResult'
import PostHome from './postHome/PostHome'

import Home from "./sale/Home";
import Login from './auth/Login'
import Register from './auth/Register'
import Dashboard from './user/Dashboard';
import DashboardSeller from './user/DashboardSeller'
import DashboardPost from './user/DashboardPost'
import NewItem from './items/NewItem'
import StripeCallback from './stripe/StripeCallback'
import EditItem from './items/EditItem'
import ViewItem from './items/ViewItem'

import StripeSuccess from './stripe/StripeSuccess'
import StripeCancel from './stripe/StripeCancel'
import NewPost from './posts/NewPost'
import ViewPost from './posts/ViewPost'

import SearchUserHome from './searchUserHome/SearchUserHome'
import SearchUserResult from './components/search/SearchUserResult'
function App() {
  return (
    <BrowserRouter>
      <TopNavBar/>
      <ToastContainer position="top-center"/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
        {/* <Route exact path='/profile' component={Profile}/> */}
        <Route exact path='/posts' component={PostHome}/>
        <PrivateRoute exact path='/dashboard' component={Dashboard}/>
        <PrivateRoute exact path='/dashboard/seller' component={DashboardSeller}/>
        <PrivateRoute exact path='/dashboard/post' component={DashboardPost}/>
        <PrivateRoute exact path='/items/new' component={NewItem}/>
        <PrivateRoute exact path='/posts/new' component={NewPost}/>
        <PrivateRoute exact path='/post/:postId' component={ViewPost}/>
        <PrivateRoute exact path='/searchUser' component={SearchUserHome}></PrivateRoute>
        <PrivateRoute exact path='/stripe/callback' component={StripeCallback}/>
        <PrivateRoute exact path='/item/edit/:itemId' component={EditItem}/>
        <Route exact path='/item/:itemId' component={ViewItem}/>
        <PrivateRoute exact path='/stripe/success/:itemId' component={StripeSuccess}/>
        <PrivateRoute exact path='/stripe/cancel' component={StripeCancel}/>
        <Route exact path='/search-result' component={SearchResult}/>
        <PrivateRoute exact path='/search-user-result' component={SearchUserResult}></PrivateRoute>
        
      </Switch>
    </BrowserRouter>

  );
}

export default App;
