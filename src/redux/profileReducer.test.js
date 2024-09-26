import React from 'react'
import profileReducer, {addPostActionCreator} from './profileReducer'

let state = {
	posts: [
		{id: 1, message: 'Hey', likesCount: 12},
		{id: 2, message: 'HeyHey', likesCount: 1212},
		{id: 3, message: 'HeyHeyHey', likesCount: 121212},
		{id: 4, message: 'HeyHeyHey', likesCount: 12121212}
	]
}

it('length of posts should be incremented ', () => {
	let action = addPostActionCreator('it')

	let newState = profileReducer(state, action)

	expect(newState.posts.length).toBe(5)
})

it('message of new post shoul be correct ', () => {
	let action = addPostActionCreator('it')

	let newState = profileReducer(state, action)

	expect(newState.posts[4].message).toBe('it')
})