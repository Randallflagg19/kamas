import App from './App'
import React from 'react'
import {render, screen} from '@testing-library/react'

test('renders without crashing', () => {
	render(<App/>)
	const profileElement = screen.getByText('Profile')
	expect(profileElement).toBeInTheDocument()
})

