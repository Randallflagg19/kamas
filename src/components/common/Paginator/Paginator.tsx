import React, {useState, useEffect} from 'react'
import styles from './Paginator.module.css'
import cn from 'classnames'

type PropsType = {
	totalItemsCount: number,
	pageSize: number,
	currentPageNumber: number,
	onPageChanged?: (pageNumber: number) => void,
	portionSize?: number
}

const Paginator: React.FC<PropsType> = ({
	totalItemsCount,
	pageSize,
	currentPageNumber,
	onPageChanged = () => {},
	portionSize = 10
}) => {
	let pagesCount = Math.ceil(totalItemsCount / pageSize)

	let pages: Array<number> = []
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i)
	}

	let portionCount = Math.ceil(pagesCount / portionSize)
	let [portionNumber, setPortionNumber] = useState(1) // Начальная порция на основе текущей страницы
	let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
	let rightPortionPageNumber = portionNumber * portionSize

	// Эффект для пересчета portionNumber при изменении currentPageNumber
	useEffect(() => {
		let newPortionNumber = Math.ceil(currentPageNumber / portionSize)
		if (newPortionNumber !== portionNumber) {
			setPortionNumber(newPortionNumber)
		}
	}, [currentPageNumber, portionSize])

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
							[styles.selectedPage]: currentPageNumber === page
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
