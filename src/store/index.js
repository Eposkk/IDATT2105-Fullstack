import { createStore } from "vuex";

export default createStore({
  state: {
    user: "",
    Email: "",
    submissions: {},
    submission: [],
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
  },
  modules: {},
});
