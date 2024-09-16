import React from 'react'
import styles from './Paginator.module.css'

function Paginator({totalUsersCount, pageSize, currentPage, onPageChanged}:
	{ totalUsersCount: number, pageSize: number, currentPage: number, onPageChanged: any }
) {
	let pagesCount = Math.ceil(totalUsersCount / pageSize)

	let pages = []
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i)
	}

	return <div>
		{pages.map((page) => (
			<span
				key={page}
				className={currentPage === page ? styles.selectedPage : undefined}
				onClick={() => { onPageChanged(page) }}>
						{page}
					</span>
		))}
	</div>
}

export default Paginator


