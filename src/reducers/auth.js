export const authReducer = (state = {}, action) =>{
    switch(state.type) {
      case "LOGGED_IN_USER":
        return {...state, ...action.payload}
      case "LOGOUT":
        return action.payload
      default:
        return state
    }
}

