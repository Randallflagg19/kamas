import styles from './DialogItem.module.css'
import {NavLink} from 'react-router-dom'

type dialogItemProps = {
	key: number,
	id: number,
	name: string
}

export default function DialogItem(props: dialogItemProps) {
	let path = '/dialogs/' + props.id
	return (
		<div className={styles.dialog + ' ' + styles.active}>
			<NavLink to={path}>{props.name}</NavLink>
		</div>
	)
};



