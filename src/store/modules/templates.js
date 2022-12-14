let urlForAPIEndpoint = "https://paperless-clone.herokuapp.com/v1/templates/";

const initialState = () => ({});
export default {
  namespaced: true,
  state: initialState(),
  mutations: {
    failure: (s, msg) => {
      console.error("[failure] ", msg);
    },
    resetState(state) {
      const initial = initialState();
      Object.keys(initial).forEach((key) => {
        state[key] = initial[key];
      });
    },
  },
  actions: {
    getTemplatesList: ({ commit, dispatch }, payload) => {
      let fail = (msg) => commit("failure", msg);
      return dispatch(
        "apiCall",
        {
          method: "get",
          params: payload,
          url: urlForAPIEndpoint,
        },
        { root: true }
      )
        .then((data) => {
          return {
            totalCount: data.totalCount,
            fetchCount: data.fetchCount,
            list: data.data,
          };
        })
        .catch((err) => {
          console.error("Err:", err);
          commit("openSnackbar", {
            text: "Something went wrong, refresh the page!",
            type: "error",
          }, { root: true });
          fail(err.toString() || "Failed to Load Templates List");
          return { totalCount: 0, fetchCount: 0, list: [] };
        });
    },
    getTemplateById: ({ commit, dispatch }, payload) => {
      let fail = (msg) => commit("failure", msg);
      return dispatch(
        "apiCall",
        {
          method: "get",
          params: "",
          url: urlForAPIEndpoint + payload.id,
        },
        { root: true }
      )
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.error("Err:", err);
          fail(err.toString() || "Failed to Load Templates List");
          return null;
        });
    },
    addTemplate: ({ commit, dispatch }, payload) => {
      let fail = (msg) => commit("failure", msg);
      return dispatch(
        "apiCall",
        {
          method: "post",
          data: payload,
          url: urlForAPIEndpoint,
        },
        { root: true }
      )
        .then(() => {
          commit("openSnackbar", {
            text: "Templates added successfully",
            type: "success",
          },
            { root: true });
          return null;
        })
        .catch((err) => {
          console.error("Err:", err);
          commit("openSnackbar", {
            text: "Failed to add templates, try again!",
            type: "error",
          }, { root: true });
          fail(err.toString() || "Failed to add Template");
          return new Error(err.message);
        });
    },
    editTemplate: ({ commit, dispatch }, payload) => {
      let fail = (msg) => commit("failure", msg);
      return dispatch(
        "apiCall",
        {
          method: "patch",
          data: payload.form,
          url: urlForAPIEndpoint + payload.id,
        },
        { root: true }
      )
        .then(() => {
          commit("openSnackbar", {
            text: "Templates Updated successfully",
            type: "success",
          },
            { root: true });
          return null;
        })
        .catch((err) => {
          console.error("Err:", err);
          fail(err.toString() || "Failed to edit Template");
          return new Error(err.message);
        });
    },
    deleteTemplate: ({ commit, dispatch }, payload) => {
      let fail = (msg) => commit("failure", msg);
      return dispatch(
        "apiCall",
        {
          method: "delete",
          data: payload,
          url: urlForAPIEndpoint + payload.id,
        },
        { root: true }
      )
        .then(() => {
          commit("openSnackbar", {
            text: "Templates deleted successfully",
            type: "success",
          },
            { root: true });
          return null;
        })
        .catch((err) => {
          console.error("Err:", err);
          commit("openSnackbar", {
            text: "Failed to delete templates",
            type: "error",
          },
            { root: true });
          fail(err.toString() || "Failed to Delete Template");
          return new Error(err.message);
        });
    },
  },
  getters: {},
};
