import React from 'react'
import styles from './Message.module.css'

type Props = {
	id: number;
	message: string;
};

const Message: React.FC<Props> = (props: Props) => {
	return <div className={styles.message}>{props.message}</div>
}

export default Message