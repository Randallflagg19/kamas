export {}
// import userReducer, {actions, initialState, InitialState} from './userReducer'
//
// let state: InitialState = {
// 	users: [
// 		{
// 			id: 0,
// 			name: '0',
// 			followed: false,
// 			photos: {small: null, large: null}, status: 'status 0'
// 		},
// 		{
// 			id: 1,
// 			name: '1',
// 			followed: false,
// 			photos: {small: null, large: null}, status: 'status 1'
// 		},
// 		{
// 			id: 2,
// 			name: '2',
// 			followed: true,
// 			photos: {small: null, large: null}, status: 'status 0'
// 		},
// 		{
// 			id: 3,
// 			name: '3',
// 			followed: false,
// 			photos: {small: null, large: null}, status: 'status 0'
// 		}
// 	],
// 	pageSize: 10,
// 	totalUsersCount: 0,
// 	currentPage: 1,
// 	isFetching: false,
// 	followingInProgress: []
// }
//
// beforeEach(() => {
// 	state = {
// 		users: [
// 			{
// 				id: 0,
// 				name: '0',
// 				followed: false,
// 				photos: {small: null, large: null}, status: 'status 0'
// 			},
// 			{
// 				id: 1,
// 				name: '1',
// 				followed: false,
// 				photos: {small: null, large: null}, status: 'status 1'
// 			},
// 			{
// 				id: 2,
// 				name: '2',
// 				followed: true,
// 				photos: {small: null, large: null}, status: 'status 2'
// 			},
// 			{
// 				id: 3,
// 				name: '3',
// 				followed: true,
// 				photos: {small: null, large: null}, status: 'status 3'
// 			}
// 		],
// 		pageSize: 10,
// 		totalUsersCount: 0,
// 		currentPage: 1,
// 		isFetching: false,
// 		followingInProgress: []
// 	}
// })
//
// test('follow success', () => {
//
// 	const newState = userReducer(state, actions.followSuccess(1))
// 	expect(newState.users[0].followed).toBeFalsy()
// 	expect(newState.users[1].followed).toBeTruthy()
// })
//
// test('unfollow success', () => {
//
// 	const newState = userReducer(state, actions.unfollowSuccess(3))
// 	expect(newState.users[2].followed).toBeTruthy()
// 	expect(newState.users[3].followed).toBeFalsy()
// })