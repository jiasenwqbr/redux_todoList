/* Slicing of TASK section, including: */
import { createSlice } from "@reduxjs/toolkit";
import { getTaskList } from '../../api'

const taskSlice = createSlice({
    // Set the name of the slice
    name:'task',
    initialState:{
        taskList:null
    },
    // Writing changes to public state of different business logic
    reducers:{
        getAllTaskList(state,action){
            // State: The public state information in Redux is managed based on the imer library, and there is no need to clone it yourself
            // Action: We no longer need to consider the issue of behavior identification for the distributed behavior object; The other information passed in is the value passed in as action.payload!!
            state.taskList = action.payload
        },
        removeTask(state,{payload}){
            let taskList = state.taskList
            if (!Array.isArray(taskList)){
                return 
            }
            state.taskList = taskList.filter(item => {
                return +item.id !== +payload
            })
        },
        updateTask(state,{payload}){
            let taskList = state.taskList
            if (!Array.isArray(taskList)){
                return 
            }
            state.taskList = taskList.map(item => {
                if (+item.id === +payload){
                    item.state = 2
                    item.complate = new Date().toLocaleString('zh-CN')
                }
                return item
            })
        }
    }
})

/* Obtain actionCreator from the switch: 
    The deconstruction method here is the same as the method in reducers above, 
    only with the same function name; Method execution, returning the behavior object that needs to be dispatched; 
    In the later stage, we can dispatch tasks based on dispatch!! */
export let { getAllTaskList,removeTask,updateTask } = taskSlice.actions

export const removeTaskAction = removeTask
export const updateTaskAction = updateTask

/* Implement asynchronous distribution of 'redux thunk' */
export const getAllTaskListAsync = () => {
    return async dispatch => {
        let list = []
        try{
            let result = await getTaskList(0)
            if (+result.code === 0){
                list = result.list
                console.log('list',list)
            }
        } catch(_){}
        dispatch(getAllTaskList(list))
    }
}

// Obtaining a reducer from a slice
export default taskSlice.reducer
