import React from 'react'
import styles from './Message.module.css'

type MessageProps = {
	id: number;
	message: string;
};

export default function Message(props: MessageProps) {
	return <div className={styles.message}>{props.message}</div>
}
