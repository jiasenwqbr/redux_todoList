import * as TYPES from '../action-types'
import {getTaskList} from '@/api'

const taskAction = {
    async queryAllList(){
        let list = []
        try{
            let result = await getTaskList(0)
            if (+result.code === 0){
                list = result.list
            }
        }catch(_){}
        return {
            type : TYPES.TASK_LIST,
            list
        }
    },
    deleteTaskById(id) {
        return {
            type:TYPES.TASK_REMOVE,
            id
        }
    },
    updateTaskById(id){
        return {
            type:TYPES.TASK_UPDATE,
            id
        }
    }
}

export default taskAction