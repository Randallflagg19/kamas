import React, {useState, useEffect} from 'react'
import styles from './Paginator.module.css'
import cn from 'classnames'

function Paginator({
	totalItemsCount,
	pageSize,
	currentPage,
	onPageChanged,
	portionSize = 10
}: {
	totalItemsCount: number,
	pageSize: number,
	currentPage: number,
	onPageChanged: (pageNumber: number) => void,
	portionSize: number
}) {
	let pagesCount = Math.ceil(totalItemsCount / pageSize)

	let pages = []
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i)
	}

	let portionCount = Math.ceil(pagesCount / portionSize)
	let [portionNumber, setPortionNumber] = useState(Math.ceil(currentPage / portionSize)) // Начальная порция на основе текущей страницы
	let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
	let rightPortionPageNumber = portionNumber * portionSize

	// Эффект для пересчета portionNumber при изменении currentPage
	useEffect(() => {
		let newPortionNumber = Math.ceil(currentPage / portionSize)
		if (newPortionNumber !== portionNumber) {
			setPortionNumber(newPortionNumber)
		}
	}, [currentPage, portionSize])

	const handlePageClick = (page: number) => {
		onPageChanged(page)
	}

	const handlePrevClick = () => {
		setPortionNumber(portionNumber - 1)
		onPageChanged(leftPortionPageNumber - 1) // Переход на последнюю страницу предыдущей порции
	}

	const handleNextClick = () => {
		setPortionNumber(portionNumber + 1)
		onPageChanged(rightPortionPageNumber + 1) // Переход на первую страницу следующей порции
	}

	return (
		<div className={styles.paginator}>
			{portionNumber > 1 && (
				<button onClick={handlePrevClick}>Prev</button>
			)}

			{pages
				.filter((page) => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
				.map((page) => (
					<span
						key={page}
						className={cn({
							[styles.selectedPage]: currentPage === page
						}, styles.pageNumber)}
						onClick={() => handlePageClick(page)}>
                        {page}</span>))}

			{portionNumber < portionCount && (
				<button onClick={handleNextClick}>Next</button>
			)}
		</div>
	)
}

export default Paginator
