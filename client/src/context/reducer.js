import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  // REGISTER_USER_BEGIN,
  // REGISTER_USER_SUCCESS,
  // REGISTER_USER_ERROR,
  // LOGIN_USER_BEGIN,
  // LOGIN_USER_SUCCESS,
  // LOGIN_USER_ERROR,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_MOOD_BEGIN,
  CREATE_MOOD_ERROR,
  CREATE_MOOD_SUCCESS,
} from "./actions";

import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values!",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "danger",
      alertText: "",
    };
  }

  // if (action.type === REGISTER_USER_BEGIN) {
  //   return { ...state, isLoading: true };
  // }
  // if (action.type === REGISTER_USER_SUCCESS) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     token: action.payload.token,
  //     user: action.payload.user,
  //     userLocation: action.payload.location,
  //     moodLocation: action.payload.location,
  //     showAlert: true,
  //     alertType: "Successful",
  //     alertText: "User created! Redirecting...",
  //   };
  // }
  // if (action.type === REGISTER_USER_ERROR) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     showAlert: true,
  //     alertType: "Danger",
  //     alertText: action.payload.msg,
  //   };
  // }
  // if (action.type === LOGIN_USER_BEGIN) {
  //   return { ...state, isLoading: true };
  // }
  // if (action.type === LOGIN_USER_SUCCESS) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     token: action.payload.token,
  //     user: action.payload.user,
  //     userLocation: action.payload.location,
  //     moodLocation: action.payload.location,
  //     showAlert: true,
  //     alertType: "Successful",
  //     alertText: "Login successful! Redirecting...",
  //   };
  // }
  // if (action.type === LOGIN_USER_ERROR) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     showAlert: true,
  //     alertType: "Danger",
  //     alertText: action.payload.msg,
  //   };
  // }
  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      moodLocation: action.payload.location,
      showAlert: true,
      alertType: "Success",
      alertText: action.payload.alertText,
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "Danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      moodLocation: "",
      userLocation: "",
    };
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      moodLocation: action.payload.location,
      showAlert: true,
      alertType: "Success",
      alertText: "User Profile updated",
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "Danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editMoodId: "",
      currentMood: "",
      moodLocation: state.userLocation,
      social: "",
      weather: "",
      sleep: "",
      notes: "",
    };
    return {
      ...state,
      ...initialState,
    };
  }

  if (action.type === CREATE_MOOD_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_MOOD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "SUCCESS",
      alertText: "New mood created",
    };
  }
  if (action.type === CREATE_MOOD_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  throw new Error(`No such action : ${action.type}`);
};

export default reducer;
