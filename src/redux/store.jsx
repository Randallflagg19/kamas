import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: "hi", likesCount: "23" },
        {
          id: 2,
          message: "its my first post",
          likesCount: "203",
        },
        {
          id: 3,
          message: "its my second post",
          likesCount: "230",
        },
        {
          id: 4,
          message: "dadaa",
          likesCount: "2330",
        },
      ],
      newPostText: "newPost",
    },

    dialogsPage: {
      messages: [
        {
          id: 1,
          message: "hi",
        },
        {
          id: 2,
          message: "hihi",
        },
        {
          id: 3,
          message: "hihihi",
        },
      ],
      dialogs: [
        {
          id: 1,
          name: "firstname",
        },
        {
          id: 2,
          name: "secondname",
        },
        {
          id: 3,
          name: "third",
        },
        {
          id: 4,
          name: "forth",
        },
        {
          id: 5,
          name: "fifth",
        },
        {
          id: 6,
          name: "sixth",
        },
      ],
      newMessageBody: "",
    },
    sidebar: {},
  },


  
  _callSubscriber() {
    console.log("State is changed");
  },
  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);

    this._callSubscriber(this._state);
  },
};

export default store;
window.store = store;
