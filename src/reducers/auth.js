let userState
// get auth token from local storage
if(window.localStorage.getItem('auth')){
  userState = JSON.parse(window.localStorage.getItem('auth'))
}else{
  userState = null
}
export const authReducer = (state = userState, action) =>{
  console.log('action.type: ', action.type)
    switch(action.type) {
      case "LOGGED_IN_USER":
        console.log("reducer state", state)
        return {...state, ...action.payload}
      case "LOGOUT":
        return action.payload
      default:

        return state
    }
}

