const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";


export const addPostActionCreator = () => ({ type: ADD_POST });

export const updateNewPostTextActionCreator = (text:any) => {
  return {
    type: UPDATE_NEW_POST_TEXT,
    newText: text,
  };
};

let initialState  = {
  posts: [
    {
      id: 1,
      message: "hi",
      likesCount: "23",
    },
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
}

const profileReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 6,
        message: state.newPostText,
        likesCount: "0",
      };
      state.posts.push(newPost);
      state.newPostText = "";
      return state;

    case UPDATE_NEW_POST_TEXT:
      state.newPostText = action.newText;
      return state;

    default:
      return state;
  }
};
export default profileReducer;
