import {
  updateNewMessageBodyCreator,
  sendMessageCreator,
} from "./../../redux/dialogsReducer";
import Dialogs from "./Dialogs";

export default function DialogsContainer(props) {
  let state = props.store.getState().dialogsPage;


  let sendMessage = () => {
    props.store.dispatch(sendMessageCreator());

  };

  let updateNewMessage = (body) => {
    props.store.dispatch(updateNewMessageBodyCreator(body));
  };

  return (
    <Dialogs
      sendMessage={sendMessage}
      updateNewMessage={updateNewMessage}
      dialogsPage={state}
    />
  );
}
