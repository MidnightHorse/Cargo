import React, { useState, useEffect } from 'react';
import {Table, Button, Modal, Form, Input, DatePicker, InputNumber, Select} from 'antd';
import axios from "axios";
import moment from "moment";
import lodash from "lodash";

const OrderList = () => {
    const [form] = Form.useForm();
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [cars, setCars] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    async function getData() {
        axios.get(`${window.location.protocol}//${window.location.host}/order/`).then((res) => {
            setOrders(lodash.get(res, "data.data"))
        });
    }
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
    useEffect(()=>{
        getData();
        getUserData();
        getCarData();
    },[])
    
    const handleFormSubmit = async (values) => {
        
        values.orderDate = moment(values.orderDate).format("MM/DD/YYYY");
        if (selectedOrder) {
            // update order
            const updatedOrder = { ...selectedOrder, ...values };
            await axios.post(`${window.location.protocol}//${window.location.host}/order/${selectedOrder._id}`, updatedOrder);
            getData();
        } else {
            // add new order
            const newOrder = { ...values };
            await axios.post(`${window.location.protocol}//${window.location.host}/order/`, newOrder);
            getData();
        }
        form.resetFields();
        setIsModalVisible(false);
        setSelectedOrder(null);
    };

    const handleEditOrder = (order) => {
        setSelectedOrder(order);
        const params = lodash.cloneDeep(order);
        params.orderDate = moment(order.orderDate);
        form.setFieldsValue(params);
        setIsModalVisible(true);
    };

    const handleDeleteOrder = async (_id) => {
        try {
            await axios.delete(`${window.location.protocol}//${window.location.host}/order/${_id}`);
            const filteredOrders = orders.filter((order) => order._id !== _id);
            setOrders(filteredOrders);
        } catch (error) {
            console.error(error);
        }

    };

    // columns for table
    const columns = [
        { title: 'oid', dataIndex: '_id', key: '_id' },
        { title: 'uid', dataIndex: 'uid', key: 'uid' },
        { title: 'cid', dataIndex: 'cid', key: 'cid' },
        { title: 'Order Date', dataIndex: 'orderDate', key: 'orderDate' },
        { title: 'Order Length (days)', dataIndex: 'orderLength', key: 'orderLength' },
        { title: 'Total Price', dataIndex: 'totalPrice', key: 'totalPrice' },
        { title: 'Active', dataIndex: 'active', key: 'active',
            render:(text)=>{
                const map = {
                    0 : "Not Active",
                    1 : "Active"
                }
                return map[text];

            }},
        {
            title: 'Actions',
            dataIndex: '',
            key: 'actions',
            render: (_, record) => (
                <div>
                    <Button type="link" onClick={() => handleEditOrder(record)}>
                        Edit
                    </Button>
                    <Button type="link" onClick={() => handleDeleteOrder(record._id)}>
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div style={{textAlign:"right",margin:8}}>
                <Button type="primary" onClick={() => {
                    form.resetFields();
                    setSelectedOrder(null);
                    setIsModalVisible(true)
                }}>
                    Add Order
                </Button>
            </div>
            <Table dataSource={orders} columns={columns} />

            <Modal
                title={selectedOrder ? 'Edit Order' : 'Add Order'}
                visible={isModalVisible}
                onCancel={() => {
                    form.resetFields();
                    setIsModalVisible(false);
                    setSelectedOrder(null);
                }}
                footer={[
                    <Button key="cancel" onClick={() => setIsModalVisible(false)}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={form.submit}>
                        {selectedOrder ? 'Update' : 'Create'}
                    </Button>,
                ]}
            >
                <Form form={form} onFinish={handleFormSubmit} layout="vertical">
                    <Form.Item
                        name="uid"
                        label="User ID"
                        rules={[{ required: true, message: 'Please enter the User ID' }]}
                    >
                        <Select
                            options={users.map(item=>{
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
                            options={cars.map(item=>{
                                return {
                                    text: item._id,
                                    value: item._id
                                }
                            })}
                        />
                    </Form.Item>
                    <Form.Item
                        name="orderDate"
                        label="Order Date"
                        rules={[{ required: true, message: 'Please select the order date' }]}
                    >
                        <DatePicker style={{width:"100%"}}/>
                    </Form.Item>
                    <Form.Item
                        name="orderLength"
                        label="Order Length (days)"
                        rules={[{ required: true, message: 'Please enter the order length' }]}
                    >
                        <InputNumber style={{width:"100%"}}/>
                    </Form.Item>
                    <Form.Item
                        name="totalPrice"
                        label="Total Price"
                        rules={[{ required: true, message: 'Please enter the total price' }]}
                    >
                        <InputNumber style={{width:"100%"}}/>
                    </Form.Item>
                    <Form.Item
                        name="active"
                        label="Active"
                        rules={[{ required: true, message: 'Please enter the active status' }]}
                    >
                        <Select>
                            <Select.Option value={0}>Not Active</Select.Option>
                            <Select.Option value={1}>Active</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default OrderList;
