import { createStore } from "vuex";
import FeedbackService from "@/features/FeedbackService";

export default createStore({
  state: {
    user: "",
    email: "",
    flashMessage: "",
    loginStatus: "",
    submissions: {},
    submission: [],
    users: [],
    currentUser: "",
    token: "",
  },
  getters: {
    getName(state) {
      return state.currentUser;
    },

    getLoginStatus(state) {
      return state.loginStatus;
    },

    getToken(state) {
      return state.token;
    },

    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    ADD_SUBMISSION(state, submission) {
      state.submissions.push(submission);
    },
    SET_SUBMISSION(state, submission) {
      state.submission = submission;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_EMAIL(state, email) {
      state.email = email;
    },
    SET_FLASHMESSAGE(state, flashMessage) {
      state.flashMessage = flashMessage;
    },
    SET_LOGINSTATUS(state, loginStatus) {
      state.loginStatus = loginStatus;
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_CURRENT_USER(state, currentUser) {
      state.currentUser = currentUser;
    },
    ADD_USER(state, user) {
      state.users.push(user);
    },
    SET_CURRENT_TOKEN(state, token) {
      state.token = token;
    },
  },
  actions: {
    submitSubmission({ commit }, submission) {
      console.log("Sent subbmissions" + submission.id);
      commit("ADD_SUBMISSION", submission);
      commit("SET_USER", submission.name);
      commit("SET_EMAIL", submission.email);
    },
    getSubmission({ commit, state }, id) {
      const existing = state.submissions.find(
        (submission) => submission.id === id
      );
      if (existing) {
        commit("SET_SUBMISSION", existing);
      } else {
        console.log("Error submission with id" + existing.id + " not found");
      }
    },
    async fetchUserName({ commit }, user) {
      const token = await FeedbackService.getToken(user);
      const gottenUser = await FeedbackService.getUser(user);
      console.log(gottenUser);
      if (token) {
        commit("SET_CURRENT_TOKEN", token);
        commit("SET_CURRENT_USER", gottenUser);
        return token;
      } else {
        console.log("Error fetching token");
        return null;
      }
    },
  },
  modules: {},
});
