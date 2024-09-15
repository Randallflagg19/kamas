import React from 'react'
import picture from './load.gif'

function Preloader() {
	return (
		<div><img src={picture} style={{width: '15%'}}/>
		</div>
	)
}

export default Preloader