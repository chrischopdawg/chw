import { createStore, applyMiddleware, compose } from 'redux';
import { Alert } from 'react-native';
//import thunk for doing asynchronous operations in redux
import thunk from 'redux-thunk';
//import reducer from our reducer file
import reducer, { 
    fetchDataAuth, fetchDataFulfilledAuth, fetchDataRejectedAuth, // Authorization
    fetchRegister, fetchRegisterFulfilled, fetchRegisterRejected, // Authorization
    fetchLogout, fetchLogoutFulfilled, fetchLogoutRejected, // Logout
    fetchDataRejectedReset, fetchDataFulfilledReset, fetchDataReset, // Password Reset
    fetchAccount, fetchAccountFulfilled, fetchAccountRejected, // User Account
    fetchUsers, fetchUsersFulfilled, fetchUsersRejected, // User Account
    fetchUserUpdate, fetchUserUpdateFulfilled, fetchUserUpdateRejected,
    fetchWorkorderDiagnosis, fetchWorkorderDiagnosisFulfilled, fetchWorkorderDiagnosisRejected,
    fetchUserNotifications, fetchUserNotificationsFulfilled, fetchUserNotificationsRejected,
    fetchSchedule, fetchScheduleFulfilled, fetchScheduleRejected,
    fetchWorkOrderSchedule, fetchWorkOrderScheduleFulfilled, fetchWorkOrderScheduleRejected,
    
} from './reducer';
import { Actions } from 'react-native-router-flux';
import { colors } from '../styles/index.style';

import { messages } from '../constants/messages';

//import { showMessage, MessageOptions } from 'react-native-flash-message';

// Authorization 1.0.0
// TRY_AUTH
export const postAuthToken = (user) => {
    return async dispatch => {
        try {
            dispatch(fetchDataAuth(true));

            const authorizePromise = await fetch(
                'http://chopdawg.choicehomewarranty.com:8888/vendors/v1/authorize', {
                    body: JSON.stringify(user),
                    headers: new Headers({
                        //'Authorization': `Bearer ${user.api_token}`,
                        'Content-Type': 'application/json'
                      }),
                    method: 'POST'
                }
            );
            
            const authToken = await authorizePromise.json();
            if(authToken.status == "error"){
                console.log('auth login err');    
                Alert.alert(
                    authToken.status,
                    messages.TRY_AUTH_REJECTED,
                    [
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                  );
                dispatch(fetchDataRejectedAuth(authToken))
            } else {
                // User Type Vendor/Admin goes to screens 2.0.0 V Job Requests
                // User Type Tech goes to screen 7.0.0 T My Work Orders
                Promise.resolve(dispatch(fetchDataFulfilledAuth(authToken))).then((response) => {
                    dispatch(getAccount(response.payload.message));
                });
            }
        } catch(error) {        
            dispatch(fetchDataRejectedAuth(error))
        }
    }
}


// Register User 4.1.0
// TRY_REGISTER
export const postRegister = (user) => {
    console.log('post register ', user);
    return async dispatch => {
        try {
            dispatch(fetchRegister(true));

            const registerPromise = await fetch(
                'http://chopdawg.choicehomewarranty.com:8888/vendors/v1/register', {
                    body: JSON.stringify(user),
                    headers: new Headers({
                        //'Authorization': `Bearer ${user.api_token}`,
                        'Content-Type': 'application/json'
                      }),
                    method: 'POST'
                }
            );
            
            const registerResult = await registerPromise.json();
            if(registerResult.status == "error"){
                Alert.alert(
                    resetResults.status,
                    messages.TR,
                    [
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                  );
                dispatch(fetchRegisterRejected(registerResult))
            } else {
                dispatch(fetchRegisterFulfilled(registerResult));
            }
        } catch(error) {        
            dispatch(fetchRegisterRejected(error))
        }
    }
}


// Get Users for Vendors Profiles Screen 4.0.0
// TRY_USERS
export const getUsers = (token, vendor_id) => {
    return async dispatch => {
        try {
            dispatch(fetchUsers(true));

            const usersPromise = await fetch(
                `http://chopdawg.choicehomewarranty.com:8888/vendors/v1/vendor/${vendor_id}/users`, {
                    //body: JSON.stringify(user),
                    headers: new Headers({
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                      }),
                    method: 'GET'
                }
            );
            
            const usersResult = await usersPromise.json();
            console.log('got users', usersResult);
            if(usersResult.status == "error"){
                dispatch(fetchUsersRejected(usersResult))
            } else {
                dispatch(fetchUsersFulfilled(usersResult.message));
            }
        } catch(error) {        
            dispatch(fetchUsersRejected(error))
        }
    }
}


// Logout 6.6.0
// TRY_LOGOUT
export const getLogout = (token) => {
    return async dispatch => {
        try {
            dispatch(fetchLogout(true));

            const logoutPromise = await fetch(
                'http://chopdawg.choicehomewarranty.com:8888/vendors/v1/logout', {
                    //body: JSON.stringify(email),
                    headers: new Headers({
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                      }),
                    method: 'GET'
                }
            );
            
            const logoutResults = await logoutPromise.json();
            if(logoutResults.status == "error"){
                dispatch(fetchLogoutRejected(logoutResults))
                // display the results
            } else {
                Actions.replace('onboarding');
                dispatch(fetchLogoutFulfilled(logoutResults));
            }
        } catch(error) {
            dispatch(fetchLogoutRejected(error))
        }
    }
}

// Password Reset Email 9.2.0
// TRY_RESET_PASSWORD
export const postPassword = (email) => {
    return async dispatch => {
        try {
            dispatch(fetchDataReset(true));

            const resetPromise = await fetch(
                'http://chopdawg.choicehomewarranty.com:8888/vendors/v1/password', {
                    body: JSON.stringify(email),
                    headers: new Headers({
                        //'Authorization': `Bearer ${user.api_token}`,
                        'Content-Type': 'application/json'
                      }),
                    method: 'POST'
                }
            );
            
            const resetResults = await resetPromise.json();
            
            if(resetResults.status == "error"){
                console.log(resetResults);
                Alert.alert(
                    resetResults.status,
                    messages.TRY_RESET_PASSWORD_REJECTED,
                    [
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                  );
                dispatch(fetchDataRejectedReset(resetResults))
                // display the results
            } else {
                Alert.alert(
                    resetResults.status,
                    messages.TRY_RESET_PASSWORD_FULFILLED,
                    [
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                  );
                dispatch(fetchDataFulfilledReset(resetResults));
                // display the results
            }
        } catch(error) {
            dispatch(fetchDataRejectedReset(error))
        }
    }
}

// Reset Password 9.2.0
// TRY_RESET_PASSWORD
export const putPassword = (user) => {
    return async dispatch => {
        try {
            dispatch(fetchDataReset(true));

            const resetPromise = await fetch(
                'http://chopdawg.choicehomewarranty.com:8888/vendors/v1/password', {
                    body: JSON.stringify(user),
                    headers: new Headers({
                        'Authorization': `Bearer ${user.reset_token}`,
                        'Content-Type': 'application/json'
                      }),
                    method: 'PUT'
                }
            );
            
            const resetResults = await resetPromise.json();
            
            if(resetResults.status == "error"){
                console.log(resetResults);
                Alert.alert(
                    resetResults.status,
                    messages.TRY_RESET_PASSWORD_REJECTED,
                    [
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                  );
                dispatch(fetchDataRejectedReset(resetResults))
                // display the results
            } else {
                Alert.alert(
                    resetResults.status,
                    messages.TRY_RESET_PASSWORD_FULFILLED,
                    [
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                  );
                dispatch(fetchDataFulfilledReset(resetResults));
                // display the results
            }
        } catch(error) {
            dispatch(fetchDataRejectedReset(error))
        }
    }
}


// Get Account Details 9.1.0
// TRY_USER_ACCOUNT
export const getAccount = (token) => {
    return async dispatch => {
        try {
            dispatch(fetchAccount(true));
            console.log('get get account ', token);
             
            const userAccountPromise = await fetch(
                'http://chopdawg.choicehomewarranty.com:8888/vendors/v1/account', {
                    //body: JSON.stringify(email),
                    headers: new Headers({
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                      }),
                    method: 'GET'
                }
            );
            
            const userAccountResults = await userAccountPromise.json();
            console.log('User Account Results ', userAccountResults);
            if(userAccountResults.status == "error"){
                dispatch(fetchAccountRejected(userAccountResults))
                // display the results
            } else {
                dispatch(fetchAccountFulfilled(userAccountResults.message));
                if(userAccountResults.message.user_type == "vendor") {
                    Actions.replace('VMyWorkOrders',{user:userAccountResults.message});
                }
                else {
                    Actions.replace('TMyWorkOrders',{user:userAccountResults.message});
                }
            }
            
        } catch(error) {
            dispatch(fetchAccountRejected(error))
        }
    }
}


// patch User Details 9.1.2
// TRY_USER_UPDATE
export const patchUser = (user, auth) => {
    return async dispatch => {
        try {
            dispatch(fetchUserUpdate(true));
             
            const _promise = await fetch(
                'http://chopdawg.choicehomewarranty.com:8888/vendors/v1/user/' + user.id, {
                    //body: JSON.stringify(email),
                    headers: new Headers({
                        'Authorization': `Bearer ${auth.token}`,
                        'Content-Type': 'application/json'
                      }),
                    method: 'patch',
                    body: JSON.stringify(user)
                }
            );
            
            const _results = await _promise.json();
            if(_results.status == "error"){
                dispatch(fetchUserUpdateRejected(_results))
                // display the results
            } else {
                dispatch(fetchUserUpdateFulfilled(_results.message));
                
            }
            
        } catch(error) {
            dispatch(fetchUserUpdateRejected(error))
        }
    }
}

// Diagnosis 3.1.2, 7.1.2, 7.2.2
// TRY_WORKORDER_DIAGNOSIS
export const postDiagnosis = (workorder, auth, diagnosis) => {
    return async dispatch => {
        try {
            dispatch(fetchDiagnosis(true));
             
            const _promise = await fetch(
                `http://chopdawg.choicehomewarranty.com:8888/vendors/v1/workorder/${workorder.workOrderNum}/diagnosis`, {
                    //body: JSON.stringify(email),
                    headers: new Headers({
                        'Authorization': `Bearer ${auth.token}`,
                        'Content-Type': 'application/json'
                      }),
                    method: 'POST',
                    body: JSON.stringify(diagnosis)
                }
            );
            
            const _results = await _promise.json();
           
            if(_results.status == "error"){
                dispatch(fetchWorkorderDiagnosisRejected(_results))
                // display the results
            } else {
                dispatch(fetchWorkorderDiagnosisulfilled(_results.message));
                
            }
            
        } catch(error) {
            dispatch(fetchWorkorderDiagnosisRejected(error))
        }
    }
}


// Notification 5.0.0, 8.0.0
// TRY_USER_NOTIFICATIONS
export const getNotifications = (user, auth) => {
    console.log('get notifications ', user, auth);
    return async dispatch => {
        try {
            dispatch(fetchUserNotifications(true));
             
            const _promise = await fetch(
                `http://chopdawg.choicehomewarranty.com:8888/vendors/v1/${user.user_type}/${user.vendor_id}/notification`, {
                    //body: JSON.stringify(email),
                    headers: new Headers({
                        'Authorization': `Bearer ${auth.token.message}`,
                        'Content-Type': 'application/json'
                      }),
                    method: 'GET',
                    //body: JSON.stringify(diagnosis)
                }
            );
            
            const _results = await _promise.json();
            if(_results.status == "error"){
                dispatch(fetchUserNotificationsRejected(_results))
                // display the results
            } else {
                dispatch(fetchUserNotificationsFulfilled(_results.message));
                
            }
            
        } catch(error) {
            dispatch(fetchUserNotificationsRejected(error))
        }
    }
}

// Scheduling

// Gets available appointment times for a Vendor based on request parameters. 2.0.1-3
// TRY_SCHEDULE
export const postSchedule = (user, auth) => {
    return async dispatch => {
        try {
            dispatch(fetchSchedule(true));
             
            const _promise = await fetch(
                `http://chopdawg.choicehomewarranty.com:8888/vendors/v1/vendor/${user.id}/schedule`, {
                    //body: JSON.stringify(email),
                    headers: new Headers({
                        'Authorization': `Bearer ${auth.token}`,
                        'Content-Type': 'application/json'
                      }),
                    method: 'GET',
                    //body: JSON.stringify(diagnosis)
                }
            );
            
            const _results = await _promise.json();
           
            if(_results.status == "error"){
                dispatch(fetchScheduleRejected(_results))
                // display the results
            } else {
                dispatch(fetchScheduleFulfilled(_results.message));
                
            }
            
        } catch(error) {
            dispatch(fetchScheduleRejected(error))
        }
    }
}

// Gets available technicians 2.2.1, 2.3.0
// TRY_WORKORDER_SCHEDULE
export const postWorkOrderAssignTechSchedule = (workorder, auth) => {
    return async dispatch => {
        try {
            dispatch(fetchWorkOrderAssignTechSchedule(true));
             
            const _promise = await fetch(
                `http://chopdawg.choicehomewarranty.com:8888/vendors/v1/workorder/${workorder.workOrderNum}/assign-technicians`, {
                    //body: JSON.stringify(email),
                    headers: new Headers({
                        'Authorization': `Bearer ${auth.token}`,
                        'Content-Type': 'application/json'
                      }),
                    method: 'POST',
                    //body: JSON.stringify(diagnosis)
                }
            );
            
            const _results = await _promise.json();
           
            if(_results.status == "error"){
                dispatch(fetchWorkOrderAssignTechScheduleRejected(_results))
                // display the results
            } else {
                dispatch(fetchWorkOrderAssignTechScheduleFulfilled(_results.message));
                
            }
            
        } catch(error) {
            dispatch(fetchWorkOrderAssignTechScheduleRejected(error))
        }
    }
}

// Schedules an appointment time for a tech 2.2.3, 2.3.2
// TRY_ASSIGN_TECHNICIAN
export const postWorkOrderAssignSchedule = (workorder, auth) => {
    return async dispatch => {
        try {
            dispatch(fetchWorkOrderAssignSchedule(true));
             
            const _promise = await fetch(
                `http://chopdawg.choicehomewarranty.com:8888/vendors/v1/workorder/${workorder.workOrderNum}/assign`, {
                    //body: JSON.stringify(email),
                    headers: new Headers({
                        'Authorization': `Bearer ${auth.token}`,
                        'Content-Type': 'application/json'
                      }),
                    method: 'POST',
                    //body: JSON.stringify(diagnosis)
                }
            );
            
            const _results = await _promise.json();
           
            if(_results.status == "error"){
                dispatch(fetchWorkOrderAssignScheduleRejected(_results))
                // display the results
            } else {
                dispatch(fetchWorkOrderAssignScheduleFulfilled(_results.message));
                
            }
            
        } catch(error) {
            dispatch(fetchWorkOrderAssignScheduleRejected(error))
        }
    }
}

// Vendor (Company information)
// get their information for the screen
// TRY_VENDOR_COMPANY_INFORMATION
export const getVendor = (vendor, auth) => {
    return async dispatch => {
        try {
            dispatch(fetchVendor(true));
             
            const _promise = await fetch(
                `http://chopdawg.choicehomewarranty.com:8888/vendors/v1/vendor/${vendor.vendorId}`, {
                    //body: JSON.stringify(email),
                    headers: new Headers({
                        'Authorization': `Bearer ${auth.token}`,
                        'Content-Type': 'application/json'
                      }),
                    method: 'POST',
                    //body: JSON.stringify(diagnosis)
                }
            );
            
            const _results = await _promise.json();
           
            if(_results.status == "error"){
                dispatch(fetchVendorRejected(_results))
                // display the results
            } else {
                dispatch(fetchVendorFulfilled(_results.message));
                
            }
            
        } catch(error) {
            dispatch(fetchVendorRejected(error))
        }
    }
}

// update their information
// TRY_VENDOR_COMPANY_UPDATE
export const postVendor = (vendor, auth) => {
    return async dispatch => {
        try {
            dispatch(fetchVendorUpdate(true));
             
            const _promise = await fetch(
                `http://chopdawg.choicehomewarranty.com:8888/vendors/v1/vendor/${vendor.vendorId}`, {
                    headers: new Headers({
                        'Authorization': `Bearer ${auth.token}`,
                        'Content-Type': 'application/json'
                      }),
                    method: 'PATCH',
                    body: JSON.stringify(vendor)
                }
            );
            
            const _results = await _promise.json();
           
            if(_results.status == "error"){
                dispatch(fetchVendorUpdateRejected(_results))
                // display the results
            } else {
                dispatch(fetchVendorUpdateFulfilled(_results.message));
                
            }
            
        } catch(error) {
            dispatch(fetchVendorUpdateRejected(error))
        }
    }
}

// Disables a user account. Only vendors/admins can use. Cannot disable your own account, the only admin account associated with the company.
// TRY_VENDOR_USER_DISABLE
export const getVendorUserDisable = (vendor, user, auth) => {
    return async dispatch => {
        try {
            dispatch(fetchVendorUserDisable(true));
             
            const _promise = await fetch(
                `http://chopdawg.choicehomewarranty.com:8888/vendors/v1/vendor/${vendor.vendorId}/user/${user.id}/disable`, {
                    headers: new Headers({
                        'Authorization': `Bearer ${auth.token}`,
                        'Content-Type': 'application/json'
                      }),
                    method: 'POST',
                    //body: JSON.stringify(vendor)
                }
            );
            
            const _results = await _promise.json();
           
            if(_results.status == "error"){
                dispatch(fetchVendorUserDisableRejected(_results))
                // display the results
            } else {
                dispatch(fetchVendorUserDisableFulfilled(_results.message));
                
            }
            
        } catch(error) {
            dispatch(fetchVendorUserDisableRejected(error))
        }
    }
}

// Workorders
// 3.2.1
// Get work order details by id
// TRY_WORKORDER_DETAILS
export const getWorkOrderDetails = (workorder, auth) => {
    return async dispatch => {
        try {
            dispatch(fetchWorkOrderDetails(true));
             
            const _promise = await fetch(
                `http://chopdawg.choicehomewarranty.com:8888/vendors/v1/workorder/${workorder.workOrderNum}`, {
                    headers: new Headers({
                        'Authorization': `Bearer ${auth.token}`,
                        'Content-Type': 'application/json'
                      }),
                    method: 'GET',
                    //body: JSON.stringify(vendor)
                }
            );
            
            const _results = await _promise.json();
           
            if(_results.status == "error"){
                dispatch(fetchWorkOrderDetailsRejected(_results))
                // display the results
            } else {
                dispatch(fetchWorkOrderDetailsFulfilled(_results.message));
                
            }
            
        } catch(error) {
            dispatch(fetchWorkOrderDetailsRejected(error))
        }
    }
}

// Get work order details for a vendor
// TRY_WORKORDER_DETAILS_VENDOR
export const getWorkOrderDetailsVendor = (user, workorder, auth) => {
    return async dispatch => {
        try {
            dispatch(fetchWorkOrderDetailsVendor(true));
             
            const _promise = await fetch(
                `http://chopdawg.choicehomewarranty.com:8888/vendors/v1/vendor/${user.vendorId}/workorder/${workorder.workOrderNum}`, {
                    headers: new Headers({
                        'Authorization': `Bearer ${auth.token}`,
                        'Content-Type': 'application/json'
                      }),
                    method: 'GET',
                    //body: JSON.stringify(vendor)
                }
            );
            
            const _results = await _promise.json();
           
            if(_results.status == "error"){
                dispatch(fetchWorkOrderDetailsVendorRejected(_results))
                // display the results
            } else {
                dispatch(fetchWorkOrderDetailsVendorFulfilled(_results.message));
                
            }
            
        } catch(error) {
            dispatch(fetchWorkOrderDetailsVendorRejected(error))
        }
    }
}

// accept/reject a work order
// TRY_WORKORDER_ACCEPT
export const getWorkOrderAcceptance = (workorder, answer, auth) => {
    return async dispatch => {
        try {
            dispatch(fetchWorkOrderAcceptance(true));
             
            const _promise = await fetch(
                `http://chopdawg.choicehomewarranty.com:8888/vendors/v1/workorder/${workorder.workOrderNum}/acceptance`, {
                    headers: new Headers({
                        'Authorization': `Bearer ${auth.token}`,
                        'Content-Type': 'application/json'
                      }),
                    method: 'POST',
                    body: JSON.stringify(answer)
                }
            );
            
            const _results = await _promise.json();
           
            if(_results.status == "error"){
                dispatch(fetchWorkOrderAcceptanceRejected(_results))
                // display the results
            } else {
                dispatch(fetchWorkOrderAcceptanceFulfilled(_results.message));
                
            }
            
        } catch(error) {
            dispatch(fetchWorkOrderAcceptanceRejected(error))
        }
    }
}

// Work order schedule
// TRY_WORKORDER_SCHEDULE
export const getWorkOrderSchedule = (workorder, schedule, auth) => {
    return async dispatch => {
        try {
            dispatch(fetchWorkOrderSchedule(true));
             
            const _promise = await fetch(
                `http://chopdawg.choicehomewarranty.com:8888/vendors/v1/workorder/${workorder.workOrderNum}/schedule`, {
                    headers: new Headers({
                        'Authorization': `Bearer ${auth.token}`,
                        'Content-Type': 'application/json'
                      }),
                    method: 'POST',
                    body: JSON.stringify(schedule)
                }
            );
            
            const _results = await _promise.json();
           
            if(_results.status == "error"){
                dispatch(fetchWorkOrderScheduleRejected(_results))
                // display the results
            } else {
                dispatch(fetchWorkOrderScheduleFulfilled(_results.message));
                
            }
            
        } catch(error) {
            dispatch(fetchWorkOrderScheduleRejected(error))
        }
    }
}

// Work order note
// TRY_WORKORDER_NOTE
export const getWorkOrderNote = (workorder, note, auth) => {
    return async dispatch => {
        try {
            dispatch(fetchWorkOrderNote(true));
             
            const _promise = await fetch(
                `http://chopdawg.choicehomewarranty.com:8888/vendors/v1/workorder/${workorder.workOrderNum}/note`, {
                    headers: new Headers({
                        'Authorization': `Bearer ${auth.token}`,
                        'Content-Type': 'application/json'
                      }),
                    method: 'POST',
                    body: JSON.stringify(note)
                }
            );
            
            const _results = await _promise.json();
           
            if(_results.status == "error"){
                dispatch(fetchWorkOrderNoteRejected(_results))
                // display the results
            } else {
                dispatch(fetchWorkOrderNoteFulfilled(_results.message));
                
            }
            
        } catch(error) {
            dispatch(fetchWorkOrderNoteRejected(error))
        }
    }
}

//Export our store as a default epxport 
export default createStore(
    reducer, 
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);