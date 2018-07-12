import "regenerator-runtime/runtime";
import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import * as api from '../api/main-api';
const getUsersState = state => state.mainState.users;

function* fetchUsers() {
   try {
      const users = yield call(api.getUsers);
      yield put({type: "USER_FETCH_SUCCEEDED", users: users});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED"});
   }
}

function* addUser(user){
  try {
     const users = yield select(getUsersState)
     const userAdd = yield call(api.addUser, user.user);
     yield put({type: "USER_ADD_SUCCEEDED", users: [...users,userAdd]});
  } catch (e) {
     yield put({type: "USER_ADD_FAILED"});
  }
}

function* sendUser(user){
  try {
     const userSend = yield call(api.sendUser, user.id);
     const users = yield select(getUsersState)
     const updateUser = users.map((u,i)=> {
        if(u.id == userSend.id){
          u.status = true;
        }
       return u;
     })

    yield put({type: "USER_SEND_STATUS", users: updateUser});
  } catch (e) {
     yield put({type: "USER_SEND_FAILED"});
  }
}

function* deleteUsers(user){
  try {
     const newArray = yield user.ids.map((id) => call(api.deleteUsers, id));
     const users = yield select(getUsersState)

     const updateUser = users.filter((u,i)=> {
        return !user.ids.includes(u.id)
     })

     yield put({type: "USERS_DELETE", users: updateUser});
  } catch (e) {
     yield put({type: "USERS_DELETE_FAILED"});
  }
}


function* mySaga() {
  yield  [
    takeEvery("GET_USERS", fetchUsers),
    takeEvery("ADD_USER", addUser),
    takeEvery("SEND_USER", sendUser),
    takeEvery("DELETE_USERS", deleteUsers),
  ];
}

export default mySaga;
