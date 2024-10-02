import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Rate, Select } from 'antd';
import axios from 'axios';
import lodash from 'lodash';

const CommentList = () => {
    const [comments, setComments] = useState([]); // comment data
    const [visible, setVisible] = useState(false); // form window visibility
    const [cars, setCars] = useState([]);
    const [users, setUsers] = useState([]);
    const [editingComment, setEditingComment] = useState(null); // track the comment being edited
    const [form] = Form.useForm(); // form instance

    async function getUserData() {
        axios.get(`${window.location.protocol}//${window.location.host}/user/`).then((res) => {
            setUsers(lodash.get(res, "data.data"))
        });
    }
    async function getCarData() {
        axios.get(`${window.location.protocol}//${window.location.host}/car/`).then((res) => {
            setCars(lodash.get(res, "data.data"))
        });
    }
    useEffect(() => {
        getData();
        getUserData();
        getCarData();
    }, [])

    // get comment data
    async function getData() {
        try {
            const response = await axios.get(`${window.location.protocol}//${window.location.host}/comment/`);
            setComments(lodash.get(response, 'data.data'));
        } catch (error) {
            console.error(error);
        }
    }

    // add comment
    const addComment = (comment) => {
        form.resetFields(); // reset form
        if (comment) {
            form.setFieldsValue(comment); // set the form fields with the comment data
            setEditingComment(comment); // set the editingComment state to track the comment being edited
        }
        setEditingComment(null);
        setVisible(true);
    };

    // save comment
    const saveComment = () => {
        form.validateFields().then(async (values) => {
            try {
                if (editingComment) {
                    // update comment post
                    await axios.post(`${window.location.protocol}//${window.location.host}/comment/${editingComment._id}`, values);
                    const updatedComments = comments.map((comment) =>
                        comment._id === editingComment._id ? { ...comment, ...values } : comment
                    );
                    setComments(updatedComments);
                    setEditingComment(null); // Clear the editingComment state
                } else {
                    // add new comment post
                    const response = await axios.post(`${window.location.protocol}//${window.location.host}/comment/`, values);
                    const newComment = lodash.get(response, 'data');
                    setComments([...comments, newComment]);
                }
                form.resetFields();
                setVisible(false);
                getData();
            } catch (error) {
                console.error(error);
            }
        }).catch(error => {
            console.error(error);
        });
    };

    // delete comment
    const deleteComment = async (_id) => {
        try {
            await axios.delete(`${window.location.protocol}//${window.location.host}/comment/${_id}`);
            const updatedComments = comments.filter((comment) => comment._id !== _id);
            setComments(updatedComments);
        } catch (error) {
            console.error(error);
        }
    };

    // columns for table
    const columns = [
        {
            title: 'Comment ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'cid',
            dataIndex: 'cid',
            key: 'cid',
        }, 
        {
            title: 'uid',
            dataIndex: 'uid',
            key: 'uid',
        },
        {
            title: 'Comment',
            dataIndex: 'comment',
            key: 'comment',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            render: (text) => {
                return <Rate allowHalf value={text} disabled />;
            }
        },

        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div>
                    <Button type="link" onClick={() => addComment(record)}>
                        Edit
                    </Button>
                    <Button type="link" onClick={() => deleteComment(record._id)}>
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div style={{ textAlign: "right", margin: 8 }}>
                <Button type="primary" onClick={addComment}>
                    Add Comment
                </Button>
            </div>
            <Table dataSource={comments} columns={columns} />

            <Modal visible={visible} title={editingComment ? 'Edit Comment' : 'Add Comment'} onCancel={() => setVisible(false)} onOk={saveComment}>
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="uid"
                        label="User ID"
                        rules={[{ required: true, message: 'Please enter the User ID' }]}
                    >
                        <Select
                            options={users.map(item => {
                                return {
                                    text: item._id,
                                    value: item._id
                                }
                            })}
                        />
                    </Form.Item>
                    <Form.Item
                        name="cid"
                        label="Car ID"
                        rules={[{ required: true, message: 'Please enter the car ID' }]}
                    >
                        <Select
                            options={cars.map(item => {
                                return {
                                    text: item._id,
                                    value: item._id
                                }
                            })}
                        />
                    </Form.Item>

                    <Form.Item
                        name="comment"
                        label="Comment"
                        rules={[{ required: true, message: 'Please enter the comment' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="rating"
                        label="Rating"
                        rules={[{ required: true, message: 'Please enter the rating' }]}
                    >
                        <Rate allowHalf />
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    );
};

export default CommentList;
