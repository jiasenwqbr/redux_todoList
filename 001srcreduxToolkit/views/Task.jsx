import { Button, DatePicker, Form, Input, Modal, Popconfirm, Table, Tag, message } from 'antd';
import "./Task.less"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {  addTask, removeTask, completeTask  } from '../api'
import { getAllTaskListAsync , removeTaskAction, updateTaskAction } from '../store/features/taskSlice'


/* Method of handling dates */
const zero = function zero(text) {
    text = String(text);
    return text.length < 2 ? '0' + text : text;
};
const formatTime = function formatTime(time) {
    let arr = time.match(/\d+/g),
        [, month, day, hours = '00', minutes = '00'] = arr;
    return `${zero(month)}-${zero(day)} ${zero(hours)}:${zero(minutes)}`;
};
const Task = function Task(){
    /* Method of obtaining public status and distribution */
    let {taskList} = useSelector(state => state.task),
        dispatch = useDispatch()
    /* Table Column Data */
    const columns = [{
        title:'No.',
        dataIndex:'id',
        align: 'center',
        width:'8%'
    }, {
        title: 'Deacribe',
        dataIndex: 'task',
        ellipsis: true,
        width: '50%'
    }, {
        title: 'State',
        dataIndex: 'state',
        align: 'center',
        width: '10%',
        render: text => +text === 1 ? 'Incomplate' : 'Complated'
    }, {
        title: 'Done Time',
        dataIndex: 'time',
        align: 'center',
        width: '15%',
        render: (_, record) => {
            let { state, time, complete } = record;
            if (+state === 2) time = complete;
            return formatTime(time);
        }
    }, {
        title:'Operation',
        render:(_,record) => {
            let {id,state} = record
            return <>
                <Popconfirm title='Are you sure you want to delete this task?' onConfirm={removeHandle.bind(null,id)} okText="Ok" cancelText="Cancel">
                    <Button type="link">Delete</Button>
                </Popconfirm>
                {+state!== 2 ? <Popconfirm title="Are you sure you have set this task to complete?"  onConfirm={updateHandle.bind(null,id)} okText="Ok" cancelText="Cancel">
                    <Button type="link">Done</Button>
                </Popconfirm> : null }
            </>
        }
    }]

    /* Define the required state */
    let [selectedIndex,setSelectIndex] = useState(0),
        [tableData,setTableData] = useState([]),
        [tableLoading,setTableLoading] = useState(false),
        [modalVisible,setModalVisible] = useState(false),
        [confirmLoading,setConfirmLoading] = useState(false)
    let [formIns] = Form.useForm()

    useEffect(() => {
        (async () => {
            if (!taskList){
                setTableLoading(true)
                await dispatch(
                    getAllTaskListAsync()
                )
                setTableLoading(false)
            }
        })()
    },[])

    useEffect(()=>{
        if (!taskList){
            taskList=[]
        }
        if (selectedIndex!==0){
            taskList = taskList.filter(item => {
                return +item.state === selectedIndex
            })
        }
        setTableData(taskList)

    },[selectedIndex,taskList])



    const removeHandle = async (id) => {
        try {
            let { code } = await removeTask(id);
            if (+code === 0) {
                // 实现派发
                dispatch(removeTaskAction(id));
                message.success('Congratulations, the operation was successful!');
            } else {
                message.error('Unfortunately, the operation failed. Please try again later!');
            }
        } catch (_) { }
    };
    const updateHandle = async (id) => {
        try {
            let { code } = await completeTask(id)
            if (+code === 0) {
                // 实现派发
                dispatch(updateTaskAction(id))
                message.success('Congratulations, the operation was successful!')
            } else {
                message.error('Unfortunately, the operation failed. Please try again later!')
            }
        } catch (_) { }
    };

    const submit = async () => {
        try{
            await formIns.validateFields
            let {task,time} = formIns.getFieldValue()
            setConfirmLoading(true)
            let {code} = await addTask(task,time)
            if (+code === 0){
                closeModal()
                setTableLoading(true)
                await dispatch(
                    getAllTaskListAsync()
                )
                setTableLoading(false)
                message.success('Congratulations, the operation was successful!')
            } else {
                message.error('Unfortunately, the operation failed. Please try again later!')
            }
        }catch(_){}
        setConfirmLoading(false)

    }
    const closeModal = () => {
        setModalVisible(false)
        setConfirmLoading(false)
        formIns.resetFields()
    }



    return <div className="task-box">
        {/* Header */}
        <div className="header">
            <h2 className="title">TASK</h2>
            <Button type="primary" onClick = {()=>{
                setModalVisible(true)
            }}>Add</Button>
        </div>
        {/* Tags */}
        <div className="tag-box">
            {['All','Incomplate','Complated'].map((item,index) => {
                return <Tag key={index} 
                        color={index === selectedIndex ? '#1677ff' : ''}
                        onClick = {()=> {
                            setSelectIndex(index)
                        }}
                        >{item}</Tag>
            })}
        </div>
         {/* 表格 */}
        <Table columns={columns}
            dataSource={tableData}
            loading={tableLoading}
            pagination={false}
            rowKey="id" />

        <Modal title="Add new task" 
            open = {modalVisible}
            confirmLoading={confirmLoading}
            keyboard={false}
            maskClosable={false}
            okText="submit"
            onOk={submit}
            onCancel={closeModal}
            cancelText="Cancel"
            >
                <Form layout='vertical' 
                    initialValues={{task:'',time:''}}
                    validateTrigger="onBlur"
                    form={formIns}>
                    <Form.Item label="Describe" name="task"
                        rules={[
                            {required:true,message:'Task description is required'},
                            {min:6,message:'Input at least 6 characters or more'}
                        ]}>
                            <Input.TextArea rows={4} ></Input.TextArea>
                    </Form.Item>
                    <Form.Item label="Expected completion time" name="time"
                        rules={[
                            {required:true,message:'Expected completion time is required'}
                        ]}>
                        <DatePicker showTime />
                        </Form.Item>

                </Form>

            </Modal>
        
    </div>

}



export default Task
