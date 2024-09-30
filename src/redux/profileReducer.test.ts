export {}

// import profileReducer, {actions} from './profileReducer'
// import {PostType, ProfileType} from '../types/types'
//
// let state = {
// 	posts: [
// 		{id: 1, message: 'hi', likesCount: 23},
// 		{id: 2, message: 'its my first post', likesCount: 203},
// 		{id: 3, message: 'its my second post', likesCount: 230},
// 		{id: 4, message: 'dada', likesCount: 2330}
// 	] as Array<PostType>,
// 	profile: null,
// 	status: '',
// 	newPostText: ''
// }
//
// it('length of posts should be incremented ', () => {
// 	let action = actions.addPostActionCreator('it')
//
// 	let newState = profileReducer(state, action)
//
// 	expect(newState.posts.length).toBe(5)
// })
//
// it('message of new post shoul be correct ', () => {
// 	let action = actions.addPostActionCreator('it')
//
// 	let newState = profileReducer(state, action)
//
// 	expect(newState.posts[4].message).toBe('it')
// })