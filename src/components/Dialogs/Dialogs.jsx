import React from "react";
import styles from "./Dialogs.module.css";
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import {
  updateNewMessageBodyCreator,
  sendMessageCreator,
} from "./../../redux/dialogsReducer";

export default function Dialogs(props) {
  let state = props.store.getState().dialogsPage;

  let dialogsElements = state.dialogs.map((dialog) => {
    return <DialogItem id={dialog.id} name={dialog.name} />;
  });

  let messagesElements = state.messages.map((message) => {
    return <Message id={message.id} message={message.message} />;
  });

  let newMessageBody = state.newMessageBody;

  let onSendMessageClick = () => {
    props.store.dispatch(sendMessageCreator());

  };

  let onNewMessageChange = (e) => {
    let body = e.target.value;
    props.store.dispatch(updateNewMessageBodyCreator(body));
  };

  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>{dialogsElements}</div>
      <div className={styles.messages}>{messagesElements}</div>

      <div>
        <div>
          <textarea
            value={newMessageBody}
            onChange={onNewMessageChange}
            placeholder="Enter your message"
          ></textarea>
        </div>
        <div>
          <button onClick={onSendMessageClick}>Send</button>
        </div>
      </div>
    </div>
  );
}
