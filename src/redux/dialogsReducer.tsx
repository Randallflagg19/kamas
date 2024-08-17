const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "SEND-MESSAGE";

let initialState = {
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
};

const dialogsReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY:
      state.newMessageBody = action.body;
      return state;
    case SEND_MESSAGE:
      let body = state.newMessageBody;
      state.newMessageBody = "";
      state.messages.push({ id: 6, message: body });
      return state;

    default:
      return state;
  }
};

export const sendMessageCreator = () => {
  return { type: SEND_MESSAGE };
};

export const updateNewMessageBodyCreator = (newBody: any) => {
  return {
    type: UPDATE_NEW_MESSAGE_BODY,
    body: newBody,
  };
};

export default dialogsReducer;
