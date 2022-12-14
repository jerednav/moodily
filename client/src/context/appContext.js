import React, { useReducer, useContext } from "react";

import reducer from "./reducer";
import axios from "axios";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
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
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_MOOD,
  DELETE_MOOD_BEGIN,
  EDIT_MOOD_BEGIN,
  EDIT_MOOD_SUCCESS,
  EDIT_MOOD_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
} from "./actions";

const token = localStorage.getItem("token");
const userLocation = localStorage.getItem("location");
const user = localStorage.getItem("user");

export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
  showSidebar: false,
  isEditing: false,
  editMoodId: "",
  currentMood: "",
  moodLocation: userLocation || "",
  social: "none",
  socialOptions: ["none", "family", "gf/bf", "acquaintance", "friends"],
  weather: "none",
  weatherOptions: ["none", "sunny", "cloudy", "rainy", "snowy", "windy"],
  sleep: "",
  notes: "",
  moods: [],
  totalMoods: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyMoods: [],
};
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //axios
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  //request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  //response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, location, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );
      const { user, location, token } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location },
      });
      addUserToLocalStorage({ user, location, token });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);
      const { user, location, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });
      addUserToLocalStorage({ user, location, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createMood = async () => {
    dispatch({ type: CREATE_MOOD_BEGIN });
    try {
      const { moodLocation, currentMood, social, weather, sleep, notes } =
        state;
      await authFetch.post("/moods", {
        currentMood,
        moodLocation,
        social,
        weather,
        sleep,
        notes,
      });
      dispatch({ type: CREATE_MOOD_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_MOOD_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getMoods = async () => {
    let url = `/moods`;

    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { moods, totalMoods, numOfPages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          moods,
          totalMoods,
          numOfPages,
        },
      });
    } catch (error) {
      console.log(error.response);
      logoutUser();
    }
    clearAlert();
  };

  const setEditMood = (id) => {
    dispatch({ type: SET_EDIT_MOOD, payload: { id } });
  };

  const editMood = async () => {
    dispatch({ type: EDIT_MOOD_BEGIN });
    try {
      const { currentMood, moodLocation, social, weather, sleep, notes } =
        state;
      await authFetch.patch(`/moods/${state.editMoodId}`, {
        currentMood,
        moodLocation,
        social,
        weather,
        sleep,
        notes,
      });

      dispatch({ type: EDIT_MOOD_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_MOOD_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const deleteMood = async (moodId) => {
    dispatch({ type: DELETE_MOOD_BEGIN });
    try {
      await authFetch.delete(`/moods/${moodId}`);
      getMoods();
    } catch (error) {
      console.log(error.response);
      logoutUser();
    }
  };

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch("/moods/stats");
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyMoods: data.monthlyMoods,
        },
      });
    } catch (error) {
      console.log(error.response);
      logoutUser();
    }
    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createMood,
        getMoods,
        setEditMood,
        deleteMood,
        editMood,
        showStats,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
