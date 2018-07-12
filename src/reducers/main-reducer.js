const initialState = {
  users: []
}

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_FETCH_SUCCEEDED':
    case 'USER_SEND_STATUS':
    case 'USER_ADD_SUCCEEDED' :
    case 'USERS_DELETE' :
      return Object.assign({}, state, {users: action.users});
    default:
      return state;
  }
}

export default mainReducer;
