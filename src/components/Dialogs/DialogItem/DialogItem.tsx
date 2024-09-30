import styles from './DialogItem.module.css'
import {NavLink} from 'react-router-dom'

type Props = {
	key: number,
	id: number,
	name: string
}

const DialogItem: React.FC<Props> = (props) => {
	let path = '/dialogs/' + props.id
	return (
		<div className={styles.dialog + ' ' + styles.active}>
			<NavLink to={path}>{props.name}</NavLink>
		</div>
	)
}

export default DialogItem


