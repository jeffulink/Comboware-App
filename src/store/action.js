import ActionTypes from "./constant";
// import firebase from 'firebase';
import dbConfig from "../config";

export function AssetTrackerFunc(obj) {
  return dispatch => {
    console.log(obj);
    let arrList = [];
    obj.forEach(element => {
      arrList.push(element.returnValues);
    });

    console.log(arrList);
    dispatch({
      type: ActionTypes.TRACKER_LOGS,
      payload: arrList
    });

    // let valuesOnly = Object.values(obj);

    // console.log(valuesOnly);
  };
}
///        login //////////////////////////////////////////
export function loginAction(obj) {
  return dispatch => {
    // console.log(obj)
    dbConfig
      .auth()
      .signInWithEmailAndPassword(obj.email, obj.password)
      .then(userDetail => {
        obj.history.push("/createAsset");
        let userObj = {
          name: userDetail.name,
          uid: userDetail.uid,
          email: userDetail.email
        };

        dispatch(signSucceed(userObj));
      }).catch((err)=>{
console.log(err)
      })
  };
}

function signSucceed(user) {
  return {
    type: ActionTypes.SIGNIN_SUCCED,
    payload: user
  };
}
function signInError(error){
    return{
        type:ActionTypes.SIGNIN_ERROR,
        payload:error
    }
}
// signUp ////////////////////////////////////////////////////////////////
let user = null;
export function signupAction(obj) {
  return dispatch => {
    console.log(obj);

    dbConfig
      .auth()
      .createUserWithEmailAndPassword(obj.email, obj.password)
      .then(() => {
        obj.history.push("/");
        user = dbConfig.auth().currentUser;

        user
          .updateProfile({
            displayName: obj.name
          })
          .then(() => {
            // console.log(user)
            let userObj = {
              name: user.displayName,
              uid: user.uid,
              email: user.email,
              dataObj: {}
            };
            console.log(userObj);
            dispatch(signUpSucced(userObj));
          }).catch((err)=>{
            console.log(err)
                  })
      });
  };
}

function signUpSucced(user) {
  return {
    type: ActionTypes.SIGNUP_SUCCED,
    payload: user
  };
}
function signUpError(error){
    return{
        type:ActionTypes.SIGNUP_ERROR,
        payload:error
    }
}