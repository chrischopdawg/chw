import { colors } from '../styles/index.style';
import { messages } from '../constants/messages';

const initialState = {
    loading: true, // Have the loading state indicate if it's done getting data.
    //message: null, // Have state for displaying messages form the api
    auth: null, // Authorization,
    messageAuth: null,
    messageResetPassword: null,
    notifications: []
}

const _showMessageOptions = (message, type) => {
    var messageOptions = {
        message: message,
        type: "danger",
        backgroundColor: colors.chwErrorBackground
    };
    switch (type) {
        case "success":
            messageOptions.type = 'success';
            messageOptions.backgroundColor = colors.chwSuccessBackground;
            break;
        case "error":
        default:
            messageOptions.type = 'danger';
            messageOptions.backgroundColor = colors.chwErrorBackground;
            break;
    }
    return messageOptions;
}


//Define your reducer that will return the initialState by default
const reducer = (state = initialState, action) => {
    console.log('reducer action ', action);
    switch(action.type) {
        case TRY_AUTH:
            return {...state, loading: action.payload};
        case TRY_AUTH_FULFILLED:
            return {...state, auth: {token: action.payload}, loading: action.loading};
        case TRY_AUTH_REJECTED:
            //return {...state, messageLogin: _showMessageOptions(messages.TRY_AUTH_REJECTED, action.payload.status), auth: action.payload, loading: action.loading};
            return {...state, auth: action.payload, loading: action.loading};
        case TRY_REGISTER:
            return {...state, loading: action.payload};
        case TRY_REGISTER_FULFILLED:
            return {...state, loading: action.loading};
        case TRY_REGISTER_REJECTED:
            //return {...state, message: _showMessageOptions(action.payload.message, action.payload.status), auth: action.payload, loading: action.loading};
            return {...state, auth: action.payload, loading: action.loading};
        case TRY_USERS:
            return {...state, loading: action.payload};
        case TRY_USERS_FULFILLED:
            return {...state, users: action.payload, loading: action.loading};
        case TRY_USERS_REJECTED:

            return {...state, message: action.payload, loading: action.loading};
        case TRY_RESET_PASSWORD:
            return {...state, loading: action.payload};
        case TRY_RESET_PASSWORD_FULFILLED:
            //return {...state,  messageResetPassword: _showMessageOptions(messages.TRY_RESET_PASSWORD_FULFILLED, action.payload.status), loading: action.loading};
            return {...state, loading: action.loading};
        case TRY_RESET_PASSWORD_REJECTED:
            //return {...state, messageResetPassword: _showMessageOptions(messages.TRY_RESET_PASSWORD_REJECTED, action.payload.status), loading: action.loading};
            return {...state, loading: action.loading};
        case TRY_USER_ACCOUNT:
            return {...state, loading: action.payload};
        case TRY_USER_ACCOUNT_FULFILLED:
            return {...state, user: action.payload, loading: action.loading};
        case TRY_USER_ACCOUNT_REJECTED:
            return {...state, auth: action.payload, loading: action.loading};
        case TRY_LOGOUT:
            return {...state, loading: action.payload};
        case TRY_LOGOUT_FULFILLED:
            return {...state, loading: action.loading};
        case TRY_LOGOUT_REJECTED:
            return {...state, message: action.payload.message, loading: action.loading};
        case TRY_USER_NOTIFICATIONS: 
            return {...state, loading: action.payload};
        case TRY_USER_NOTIFICATIONS_FULFILLED:
            return {...state, notifications: action.payload.message, loading: action.loading};

        case TRY_USER_NOTIFICATIONS_REJECTED:
            return {...state, message: action.payload.message, loading: action.loading};

        default: 
            return state;
    }
}
export default reducer;

// Authorization - Authentication
const TRY_AUTH = 'TRY_AUTH';
const TRY_AUTH_FULFILLED = 'TRY_AUTH_FULFILED';
const TRY_AUTH_REJECTED = 'TRY_AUTH_REJECTED';

//Define your action create that set your loading state.
export const fetchDataAuth = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: TRY_AUTH,
        payload: bool,
    };
}
//Define a action creator to set your loading state to false, and return the data when the promise is resolved
export const fetchDataFulfilledAuth = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: TRY_AUTH_FULFILLED,
        payload: data,
        loading: false,
    };
}
//Define a action creator that catches a error and sets an errorMessage
export const fetchDataRejectedAuth = (error) => {
    //Return a action type and a payload with a error
    return {
        type: TRY_AUTH_REJECTED,
        payload: error,
        loading: false,
    };
}

// Register User
const TRY_REGISTER = 'TRY_REGISTER';
const TRY_REGISTER_FULFILLED = 'TRY_REGISTER_FULFILED';
const TRY_REGISTER_REJECTED = 'TRY_REGISTER_REJECTED';

//Define your action create that set your loading state.
export const fetchRegister = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: TRY_REGISTER,
        payload: bool,
    };
}
//Define a action creator to set your loading state to false, and return the data when the promise is resolved
export const fetchRegisterFulfilled = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: TRY_REGISTER_FULFILLED,
        payload: data,
        loading: false,
    };
}
//Define a action creator that catches a error and sets an errorMessage
export const fetchRegisterRejected = (error) => {
    //Return a action type and a payload with a error
    return {
        type: TRY_REGISTER_REJECTED,
        payload: error,
        loading: false,
    };
}

// Users for Vendor Profiles
const TRY_USERS = 'TRY_USERS';
const TRY_USERS_FULFILLED = 'TRY_USERS_FULFILLED';
const TRY_USERS_REJECTED = 'TRY_USERS_REJECTED';

//Define your action create that set your loading state.
export const fetchUsers = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: TRY_USERS,
        payload: bool,
    };
}
//Define a action creator to set your loading state to false, and return the data when the promise is resolved
export const fetchUsersFulfilled = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: TRY_USERS_FULFILLED,
        payload: data,
        loading: false,
    };
}
//Define a action creator that catches a error and sets an errorMessage
export const fetchUsersRejected = (error) => {
    //Return a action type and a payload with a error
    return {
        type: TRY_USERS_REJECTED,
        payload: error,
        loading: false,
    };
}

// Logout
const TRY_LOGOUT = 'TRY_LOGOUT';
const TRY_LOGOUT_FULFILLED = 'TRY_LOGOUT_FULFILLED';
const TRY_LOGOUT_REJECTED = 'TRY_LOGOUT_REJECTED';

//Define your action create that set your loading state.
export const fetchLogout = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: TRY_LOGOUT,
        payload: bool,
    };
}
//Define a action creator to set your loading state to false, and return the data when the promise is resolved
export const fetchLogoutFulfilled = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: TRY_LOGOUT_FULFILLED,
        payload: data,
        loading: false,
    };
}
//Define a action creator that catches a error and sets an errorMessage
export const fetchLogoutRejected = (error) => {
    //Return a action type and a payload with a error
    return {
        type: TRY_LOGOUT_REJECTED,
        payload: error,
        loading: false,
    };
}

// Reset Password
const TRY_RESET_PASSWORD = 'TRY_RESET_PASSWORD';
const TRY_RESET_PASSWORD_FULFILLED = 'TRY_RESET_PASSWORD_FULFILLED';
const TRY_RESET_PASSWORD_REJECTED = 'TRY_RESET_PASSWORD_REJECTED';

//Define your action create that set your loading state.
export const fetchDataReset = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: TRY_RESET_PASSWORD,
        payload: bool,
    };
}
//Define a action creator to set your loading state to false, and return the data when the promise is resolved
export const fetchDataFulfilledReset = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: TRY_RESET_PASSWORD_FULFILLED,
        payload: data,
        loading: false,
    };
}
//Define a action creator that catches a error and sets an errorMessage
export const fetchDataRejectedReset = (error) => {
    //Return a action type and a payload with a error
    return {
        type: TRY_RESET_PASSWORD_REJECTED,
        payload: error,
        loading: false,
    };
}

// Get User Account
const TRY_USER_ACCOUNT = 'TRY_USER_ACCOUNT';
const TRY_USER_ACCOUNT_FULFILLED = 'TRY_USER_ACCOUNT_FULFILLED';
const TRY_USER_ACCOUNT_REJECTED = 'TRY_USER_ACCOUNT_REJECTED';

// Get User Details
//Define your action create that set your loading state.
export const fetchAccount = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: TRY_USER_ACCOUNT,
        payload: bool,
    };
}
//Define a action creator to set your loading state to false, and return the data when the promise is resolved
export const fetchAccountFulfilled = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: TRY_USER_ACCOUNT_FULFILLED,
        payload: data,
        loading: false,
    };
}
//Define a action creator that catches a error and sets an errorMessage
export const fetchAccountRejected = (error) => {
    //Return a action type and a payload with a error
    return {
        type: TRY_USER_ACCOUNT_REJECTED,
        payload: error,
        loading: false,
    };
}

// Change User Details
const TRY_USER_UPDATE = 'TRY_USER_UPDATE';
const TRY_USER_UPDATE_FULFILLED = 'TRY_USER_UPDATE_FULFILLED';
const TRY_USER_UPDATE_REJECTED = 'TRY_USER_UPDATE_REJECTED';

// Get User Details
//Define your action create that set your loading state.
export const fetchUserUpdate = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: TRY_USER_UPDATE,
        payload: bool,
    };
}
//Define a action creator to set your loading state to false, and return the data when the promise is resolved
export const fetchUserUpdateFulfilled = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: TRY_USER_UPDATE_FULFILLED,
        payload: data,
        loading: false,
    };
}
//Define a action creator that catches a error and sets an errorMessage
export const fetchUserUpdateRejected = (error) => {
    //Return a action type and a payload with a error
    return {
        type: TRY_USER_UPDATE_REJECTED,
        payload: error,
        loading: false,
    };
}


// Post Diagnosis
const TRY_WORKORDER_DIAGNOSIS = 'TRY_WORKORDER_DIAGNOSIS';
const TRY_WORKORDER_DIAGNOSIS_FULFILLED = 'TRY_WORKORDER_DIAGNOSIS_FULFILLED';
const TRY_WORKORDER_DIAGNOSIS_REJECTED = 'TRY_WORKORDER_DIAGNOSIS_REJECTED';

// Get User Details
//Define your action create that set your loading state.
export const fetchWorkorderDiagnosis = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: TRY_WORKORDER_DIAGNOSIS,
        payload: bool,
    };
}
//Define a action creator to set your loading state to false, and return the data when the promise is resolved
export const fetchWorkorderDiagnosisFulfilled = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: TRY_WORKORDER_DIAGNOSIS_FULFILLED,
        payload: data,
        loading: false,
    };
}
//Define a action creator that catches a error and sets an errorMessage
export const fetchWorkorderDiagnosisRejected = (error) => {
    //Return a action type and a payload with a error
    return {
        type: TRY_WORKORDER_DIAGNOSIS_REJECTED,
        payload: error,
        loading: false,
    };
}

// Get Notifications
const TRY_USER_NOTIFICATIONS = 'TRY_USER_NOTIFICATIONS';
const TRY_USER_NOTIFICATIONS_FULFILLED = 'TRY_USER_NOTIFICATIONS_FULFILLED';
const TRY_USER_NOTIFICATIONS_REJECTED = 'TRY_USER_NOTIFICATIONS_REJECTED';

// Get User Details
//Define your action create that set your loading state.
export const fetchUserNotifications = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: TRY_USER_NOTIFICATIONS,
        payload: bool,
    };
}
//Define a action creator to set your loading state to false, and return the data when the promise is resolved
export const fetchUserNotificationsFulfilled = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: TRY_USER_NOTIFICATIONS_FULFILLED,
        payload: data,
        loading: false,
    };
}
//Define a action creator that catches a error and sets an errorMessage
export const fetchUserNotificationsRejected = (error) => {
    //Return a action type and a payload with a error
    return {
        type: TRY_USER_NOTIFICATIONS_REJECTED,
        payload: error,
        loading: false,
    };
}

// Get Schedule for work order request
const TRY_SCHEDULE = 'TRY_SCHEDULE';
const TRY_SCHEDULE_FULFILLED = 'TRY_SCHEDULE_FULFILLED';
const TRY_SCHEDULE_REJECTED = 'TRY_SCHEDULE_REJECTED';

// Get User Details
//Define your action create that set your loading state.
export const fetchSchedule = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: TRY_SCHEDULE,
        payload: bool,
    };
}
//Define a action creator to set your loading state to false, and return the data when the promise is resolved
export const fetchScheduleFulfilled = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: TRY_SCHEDULE_FULFILLED,
        payload: data,
        loading: false,
    };
}
//Define a action creator that catches a error and sets an errorMessage
export const fetchScheduleRejected = (error) => {
    //Return a action type and a payload with a error
    return {
        type: TRY_SCHEDULE_REJECTED,
        payload: error,
        loading: false,
    };
}

// Get Schedule for work order request
const TRY_AVAILABLE_TECHNICIAN = 'TRY_AVAILABLE_TECHNICIAN';
const TRY_AVAILABLE_TECHNICIAN_FULFILLED = 'TRY_AVAILABLE_TECHNICIAN_FULFILLED';
const TRY_AVAILABLE_TECHNICIAN_REJECTED = 'TRY_AVAILABLE_TECHNICIAN_REJECTED';

// Get User Details
//Define your action create that set your loading state.
export const fetchWorkOrderAvailableTechnician = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: TRY_AVAILABLE_TECHNICIAN,
        payload: bool,
    };
}
//Define a action creator to set your loading state to false, and return the data when the promise is resolved
export const fetchWorkOrderAvailableTechnicianFulfilled = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: TRY_AVAILABLE_TECHNICIAN_FULFILLED,
        payload: data,
        loading: false,
    };
}
//Define a action creator that catches a error and sets an errorMessage
export const fetchWorkOrderAvailableTechnicianRejected = (error) => {
    //Return a action type and a payload with a error
    return {
        type: TRY_AVAILABLE_TECHNICIAN_REJECTED,
        payload: error,
        loading: false,
    };
}


// Get Schedule for work order request
const TRY_ASSIGN_TECHNICIAN = 'TRY_ASSIGN_TECHNICIAN';
const TRY_ASSIGN_TECHNICIAN_FULFILLED = 'TRY_ASSIGN_TECHNICIAN_FULFILLED';
const TRY_ASSIGN_TECHNICIAN_REJECTED = 'TRY_ASSIGN_TECHNICIAN_REJECTED';

// Get User Details
//Define your action create that set your loading state.
export const fetchWorkOrderAssignSchedule = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: TRY_ASSIGN_TECHNICIAN,
        payload: bool,
    };
}
//Define a action creator to set your loading state to false, and return the data when the promise is resolved
export const fetchWorkOrderAssignScheduleFulfilled = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: TRY_ASSIGN_TECHNICIAN_FULFILLED,
        payload: data,
        loading: false,
    };
}
//Define a action creator that catches a error and sets an errorMessage
export const fetchWorkOrderAssignScheduleRejected = (error) => {
    //Return a action type and a payload with a error
    return {
        type: TRY_ASSIGN_TECHNICIAN_REJECTED,
        payload: error,
        loading: false,
    };
}


// Get Schedule for work order request
const TRY_VENDOR_COMPANY_INFORMATION = 'TRY_VENDOR_COMPANY_INFORMATION';
const TRY_VENDOR_COMPANY_INFORMATION_FULFILLED = 'TRY_VENDOR_COMPANY_INFORMATION_FULFILLED';
const TRY_VENDOR_COMPANY_INFORMATION_REJECTED = 'TRY_VENDOR_COMPANY_INFORMATION_REJECTED';

// Get User Details
//Define your action create that set your loading state.
export const fetchVendor = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: TRY_VENDOR_COMPANY_INFORMATION,
        payload: bool,
    };
}
//Define a action creator to set your loading state to false, and return the data when the promise is resolved
export const fetchVendorFulfilled = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: TRY_VENDOR_COMPANY_INFORMATION_FULFILLED,
        payload: data,
        loading: false,
    };
}
//Define a action creator that catches a error and sets an errorMessage
export const fetchVendorRejected = (error) => {
    //Return a action type and a payload with a error
    return {
        type: TRY_VENDOR_COMPANY_INFORMATION_REJECTED,
        payload: error,
        loading: false,
    };
}


// Get Schedule for work order request
const TRY_VENDOR_COMPANY_UPDATE = 'TRY_VENDOR_COMPANY_UPDATE';
const TRY_VENDOR_COMPANY_UPDATE_FULFILLED = 'TRY_VENDOR_COMPANY_UPDATE_FULFILLED';
const TRY_VENDOR_COMPANY_UPDATE_REJECTED = 'TRY_VENDOR_COMPANY_UPDATE_REJECTED';

// Get User Details
//Define your action create that set your loading state.
export const fetchVendorUpdate = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: TRY_VENDOR_COMPANY_UPDATE,
        payload: bool,
    };
}
//Define a action creator to set your loading state to false, and return the data when the promise is resolved
export const fetchVendorUpdateFulfilled = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: TRY_VENDOR_COMPANY_UPDATE_FULFILLED,
        payload: data,
        loading: false,
    };
}
//Define a action creator that catches a error and sets an errorMessage
export const fetchVendorUpdateRejected = (error) => {
    //Return a action type and a payload with a error
    return {
        type: TRY_VENDOR_COMPANY_UPDATE_REJECTED,
        payload: error,
        loading: false,
    };
}


// Get Schedule for work order request
const TRY_VENDOR_USER_DISABLE = 'TRY_VENDOR_USER_DISABLE';
const TRY_VENDOR_USER_DISABLE_FULFILLED = 'TRY_VENDOR_USER_DISABLE_FULFILLED';
const TRY_VENDOR_USER_DISABLE_REJECTED = 'TRY_VENDOR_USER_DISABLE_REJECTED';

// Get User Details
//Define your action create that set your loading state.
export const getVendorUserDisable = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: TRY_VENDOR_USER_DISABLE,
        payload: bool,
    };
}
//Define a action creator to set your loading state to false, and return the data when the promise is resolved
export const fetchVendorUserDisableFulfilled = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: TRY_VENDOR_USER_DISABLE_FULFILLED,
        payload: data,
        loading: false,
    };
}
//Define a action creator that catches a error and sets an errorMessage
export const fetchVendorUserDisableRejected = (error) => {
    //Return a action type and a payload with a error
    return {
        type: TRY_VENDOR_USER_DISABLE_REJECTED,
        payload: error,
        loading: false,
    };
}

// Get Schedule for work order request
const TRY_WORKORDER_DETAILS = 'TRY_WORKORDER_DETAILS';
const TRY_WORKORDER_DETAILS_FULFILLED = 'TRY_WORKORDER_DETAILS_FULFILLED';
const TRY_WORKORDER_DETAILS_REJECTED = 'TRY_WORKORDER_DETAILS_REJECTED';

// Get User Details
//Define your action create that set your loading state.
export const fetchWorkOrderDetails = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: TRY_WORKORDER_DETAILS,
        payload: bool,
    };
}
//Define a action creator to set your loading state to false, and return the data when the promise is resolved
export const fetchWorkOrderDetailsFulfilled = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: TRY_WORKORDER_DETAILS_FULFILLED,
        payload: data,
        loading: false,
    };
}
//Define a action creator that catches a error and sets an errorMessage
export const fetchWorkOrderDetailsRejected = (error) => {
    //Return a action type and a payload with a error
    return {
        type: TRY_WORKORDER_DETAILS_REJECTED,
        payload: error,
        loading: false,
    };
}


// Get Schedule for work order request
const TRY_WORKORDER_DETAILS_VENDOR = 'TRY_WORKORDER_DETAILS_VENDOR';
const TRY_WORKORDER_DETAILS_VENDOR_FULFILLED = 'TRY_WORKORDER_DETAILS_VENDOR_FULFILLED';
const TRY_WORKORDER_DETAILS_VENDOR_REJECTED = 'TRY_WORKORDER_DETAILS_VENDOR_REJECTED';

// Get User Details
//Define your action create that set your loading state.
export const fetchWorkOrderDetailsVendor = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: TRY_WORKORDER_DETAILS_VENDOR,
        payload: bool,
    };
}
//Define a action creator to set your loading state to false, and return the data when the promise is resolved
export const fetchWorkOrderDetailsVendorFulfilled = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: TRY_WORKORDER_DETAILS_VENDOR_FULFILLED,
        payload: data,
        loading: false,
    };
}
//Define a action creator that catches a error and sets an errorMessage
export const fetchWorkOrderDetailsVendorRejected = (error) => {
    //Return a action type and a payload with a error
    return {
        type: TRY_WORKORDER_DETAILS_VENDOR_REJECTED,
        payload: error,
        loading: false,
    };
}



// Get Schedule for work order request
const TRY_WORKORDER_ACCEPT = 'TRY_WORKORDER_ACCEPT';
const TRY_WORKORDER_ACCEPT_FULFILLED = 'TRY_WORKORDER_ACCEPT_FULFILLED';
const TRY_WORKORDER_ACCEPT_REJECTED = 'TRY_WORKORDER_ACCEPT_REJECTED';

// Get User Details
//Define your action create that set your loading state.
export const fetchWorkOrderAcceptance = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: TRY_WORKORDER_ACCEPT,
        payload: bool,
    };
}
//Define a action creator to set your loading state to false, and return the data when the promise is resolved
export const fetchWorkOrderAcceptanceFulfilled = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: TRY_WORKORDER_ACCEPT_FULFILLED,
        payload: data,
        loading: false,
    };
}
//Define a action creator that catches a error and sets an errorMessage
export const fetchWorkOrderAcceptanceRejected = (error) => {
    //Return a action type and a payload with a error
    return {
        type: TRY_WORKORDER_ACCEPT_REJECTED,
        payload: error,
        loading: false,
    };
}


// Get Schedule for work order request
const TRY_WORKORDER_SCHEDULE = 'TRY_WORKORDER_SCHEDULE';
const TRY_WORKORDER_SCHEDULE_FULFILLED = 'TRY_WORKORDER_SCHEDULE_FULFILLED';
const TRY_WORKORDER_SCHEDULE_REJECTED = 'TRY_WORKORDER_SCHEDULE_REJECTED';

// Get User Details
//Define your action create that set your loading state.
export const fetchWorkOrderSchedule = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: TRY_WORKORDER_SCHEDULE,
        payload: bool,
    };
}
//Define a action creator to set your loading state to false, and return the data when the promise is resolved
export const fetchWorkOrderScheduleFulfilled = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: TRY_WORKORDER_SCHEDULE_FULFILLED,
        payload: data,
        loading: false,
    };
}
//Define a action creator that catches a error and sets an errorMessage
export const fetchWorkOrderScheduleRejected = (error) => {
    //Return a action type and a payload with a error
    return {
        type: TRY_WORKORDER_SCHEDULE_REJECTED,
        payload: error,
        loading: false,
    };
}


// Get Schedule for work order request
const TRY_WORKORDER_NOTE = 'TRY_WORKORDER_NOTE';
const TRY_WORKORDER_NOTE_FULFILLED = 'TRY_WORKORDER_NOTE_FULFILLED';
const TRY_WORKORDER_NOTE_REJECTED = 'TRY_WORKORDER_NOTE_REJECTED';

// Get User Details
//Define your action create that set your loading state.
export const fetchWorkOrderNote = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: TRY_WORKORDER_NOTE,
        payload: bool,
    };
}
//Define a action creator to set your loading state to false, and return the data when the promise is resolved
export const fetchWorkOrderNoteFulfilled = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: TRY_WORKORDER_NOTE_FULFILLED,
        payload: data,
        loading: false,
    };
}
//Define a action creator that catches a error and sets an errorMessage
export const fetchWorkOrderNoteRejected = (error) => {
    //Return a action type and a payload with a error
    return {
        type: TRY_WORKORDER_NOTE_REJECTED,
        payload: error,
        loading: false,
    };
}
