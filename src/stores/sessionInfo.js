import { createSlice } from "@reduxjs/toolkit";
import { saveUserRoleEncrypted } from "../utils/roleUtils";

export const sessionInfo = createSlice({
  name: "sessionInfo",
  initialState: {
    user: {},
    sessionStarted: null,
    sessionExpire: null,
    sessionToken: null,
  },
  reducers: {
    setSessionDetails: (state, actions) => {
      //check if i have already the item in the array
      state.sessionStarted = actions.payload.sessionStarted;
      state.sessionExpire = actions.payload.sessionExpire;
      state.sessionToken = actions.payload.sessionToken;
    },

    setSessionUser: (state, actions) => {
      var modifiedUser = JSON.parse(JSON.stringify(actions.payload.user));
      //id first last role username pass isActive

      //TODO: RIADATTARE PER GLI WORKERS
      modifiedUser.role = saveUserRoleEncrypted(modifiedUser.role);

      state.user = modifiedUser;
    },

    destroySession: (state, actions) => {
      state.user = {};
      state.sessionToken = null;
      state.sessionExpire = null;
      state.sessionStarted = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSessionDetails, setSessionUser, destroySession } =
  sessionInfo.actions;

export default sessionInfo.reducer;
