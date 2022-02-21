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
    fetchUsers({ commit, state }) {
      FeedbackService.getUsers()
        .then((response) => {
          commit("SET_USERS", response.data);
          console.log(state.users.length);
        })
        .catch((error) => {
          console.log("Error fetching users" + error);
        });
    },
    fetchUserName({ commit, state }, username) {
      const user = state.users.find((user) => user.username === username);
      if (user) {
        commit("SET_CURRENT_USER", user);
      } else {
        console.log("Error fetching user");
      }
    },
    postNewUser({ commit }, user) {
      commit("ADD_USER", user);
      FeedbackService.postUser(user)
        .then(() => {
          console.log("Sent successfully");
        })
        .catch((error) => {
          console.log("Error sending user " + error);
        });
    },
  },
  modules: {},
});
