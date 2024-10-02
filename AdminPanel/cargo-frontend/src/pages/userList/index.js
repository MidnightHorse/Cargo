import React, { useEffect, useState } from 'react';
import {Table, Button, Modal, Form, Input, Col, Image, Row} from 'antd';
import axios from 'axios';
import lodash from 'lodash';
import moment from "moment";

const UserList = () => {
    const [users, setUsers] = useState([]); // user data
    const [visible, setVisible] = useState(false); // form window visibility
    const [form] = Form.useForm(); // form instance
    const [editingUser, setEditingUser] = useState(null); // track the user being edited
    const [userProfileURL, setBase64Image] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result;
            setBase64Image(base64);
            form.setFieldsValue({
                userProfileURL:base64
            })
        };
        reader.readAsDataURL(file);
    };
    async function getData() {
        try {
            const response = await axios.get(`${window.location.protocol}//${window.location.host}/user/`);
            setUsers(lodash.get(response, 'data.data'));
            setUsers(lodash.get(response, 'data.data'));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    // add user
    const addUser = () => {
        form.resetFields();
        setVisible(true);
        setEditingUser(null);
    };

    // save user
    const saveUser = () => {
        form.validateFields().then(async (values) => {
            const newUser = { ...values};

            if (editingUser) {
                // edit an existing user
                try {
                    await axios.post(`${window.location.protocol}//${window.location.host}/user/${editingUser._id}`, newUser);
                    const updatedUsers = users.map((user) =>
                        user._id === editingUser._id ? { ...user, ...newUser } : user
                    );
                    setUsers(updatedUsers);
                    setEditingUser(null);
                } catch (error) {
                    console.error(error);
                }
            } else {
                newUser.joinDate = moment().format("MM/DD/YYYY");
                // adding a new user
                try {
                    await axios.post(`${window.location.protocol}//${window.location.host}/user/`, newUser);
                    setUsers([...users, newUser]);
                } catch (error) {
                    console.error(error);
                }
            }

            form.resetFields();
            setVisible(false);
        }).catch(error=>{
            console.error(error);
        });
    };

    // delete user
    const deleteUser = async (_id) => {
        try {
            await axios.delete(`${window.location.protocol}//${window.location.host}/user/${_id}`);
            const updatedUsers = users.filter((user) => user._id !== _id);
            setUsers(updatedUsers);
        } catch (error) {
            console.error(error);
        }
    };

    // edit user
    const editUser = (user) => {
        setVisible(true);
        setEditingUser(user);
        form.setFieldsValue(user);
    };

    // columns for table
    const columns = [
        {
            title: 'uid',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Real Name',
            dataIndex: 'realName',
            key: 'realName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Join Date',
            dataIndex: 'joinDate',
            key: 'joinDate',
        },
        {
            title: 'userProfile',
            dataIndex: 'userProfile',
            key: 'userProfile',
            render:(text, record)=>{
                return record.userProfileURL &&
                <Image src={record.userProfileURL}  style={{width:200,height:200}}/>
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button type="link" onClick={() => editUser(record)}>
                        Edit
                    </Button>
                    <Button type="link" onClick={() => deleteUser(record._id)}>
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div>
            <div style={{textAlign:"right",margin:8}}>
                <Button type="primary" onClick={addUser}>
                    Add User
                </Button>
            </div>
            <Table dataSource={users} columns={columns} />

            <Modal
                visible={visible}
                title={editingUser ? 'Edit User' : 'Add User'}
                onCancel={() => setVisible(false)}
                onOk={saveUser}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[{ required: true, message: 'Please enter a username' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="realName"
                        label="Real Name"
                        rules={[{ required: true, message: 'Please enter a real name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Please enter an email' },
                            { type: 'email', message: 'Please enter a valid email' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: 'Please enter a password' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="userProfileURL"
                        label="userProfileURL"
                        rules={[{ required: true, message: 'Please enter the userProfileURL' }]}
                    >
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UserList;
