// //state
//
// let rerenderTree = () => {
//     console.log(23)
// }
//
// let state = {}
//
// export const addPost = () => {
//     let newPost = {
//         id: 1,
//         message: state.prifilePage.newPostText,
//         likesCount: 0
//     }
//     state.prifilePage.posts.push(newPost)
//     state.posts.push(newPost).newPostText = ''
//     rerenderTree()
// }
//
// export const updateNewPostText = (newText) => {
// }
//
// export const subscribe = (observer) => {
//     rerenderTree = observer
// }
//
//
// //index
// import store from './redux/state'
// import App from './App'
//
// let rerenderTree = (state) => {
//     ReactDOM.render(<App state={store.getState()} addPost={store.addPost}
//                          updateNewPostText={store.updateNewPostText}/>)
// }
//
// rerenderTree(store.state)
//
// store.subscribe(rerenderTree)
