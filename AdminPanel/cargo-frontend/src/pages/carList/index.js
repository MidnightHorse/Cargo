import React, { useEffect, useState } from 'react';
import {Table, Button, Modal, Form, Input, Select, Row, Col, Image, InputNumber} from 'antd';
import axios from "axios";
import lodash from "lodash";

const CarList = () => {
    const [cars, setCars] = useState([]); // car data
    const [users, setUsers] = useState([]); // car data
    const [visible, setVisible] = useState(false); // form window visibility
    const [form] = Form.useForm(); // form instance
    const [editingCarId, setEditingCarId] = useState(null); // ID of the car being edited
    const [carProfileURLURL, setBase64Image] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result;
            setBase64Image(base64);
            form.setFieldsValue({
                carProfileURLURL:base64
            })
        };
        reader.readAsDataURL(file);
    };
    // get car data
    async function getData() {
        try {
            const response = await axios.get(`${window.location.protocol}//${window.location.host}/car/`);
            setCars(lodash.get(response, "data.data"));
        } catch (error) {
            console.error(error);
        }
    }
    async function getUserData() {
        try {
            const response = await axios.get(`${window.location.protocol}//${window.location.host}/user/`);
            setUsers(lodash.get(response, "data.data"));
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getData();
        getUserData();
    }, []);

    // add car
    const addCar = () => {
        form.resetFields();
        setBase64Image(null)
        setEditingCarId(null); // clear the ID
        setVisible(true);
    };

    // edit car
    const editCar = (carId) => {
        setEditingCarId(carId);
        setVisible(true);
        let editingCar = lodash.find(cars, { _id: carId }); // find the car being edited by ID
        editingCar = {...editingCar};
        setBase64Image(editingCar.carProfileURLURL)
        form.setFieldsValue(editingCar); // set form field values
    };

    // save car
    const saveCar = () => {
        form.validateFields().then(async (values) => {
            try {
                let response;
                if (editingCarId) {
                    // edit car post
                    response = await axios.post(`${window.location.protocol}//${window.location.host}/car/${editingCarId}`, values);
                } else {
                    // add car post
                    response = await axios.post(`${window.location.protocol}//${window.location.host}/car/`, values);
                }
                await getData();
                form.resetFields();
                setVisible(false);
                setEditingCarId(null);
            } catch (error) {
                console.error(error);
            }
        }).catch(error=>{
            console.error(error);
        });
    };

    // delete car
    const deleteCar = async (_id) => {
        try {
            await axios.delete(`${window.location.protocol}//${window.location.host}/car/${_id}`);
            const updatedCars = cars.filter((car) => car._id !== _id);
            setCars(updatedCars);
        } catch (error) {
            console.error(error);
        }
    };

    // columns for table
    const columns = [
        {
            title: 'cid',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'uid',
            dataIndex: 'uid',
            key: 'uid',
        },
        {
            title: 'Make',
            dataIndex: 'make',
            key: 'make',
        },
        {
            title: 'Model',
            dataIndex: 'model',
            key: 'model',
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
        },
        {
            title: 'Engine Type',
            dataIndex: 'engineType',
            key: 'engineType',
        },
        {
            title: 'carProfileURL',
            dataIndex: 'carProfileURL',
            key: 'carProfileURL',
            render:(text, record)=>{
                return record.carProfileURL &&
                    <Image src={record.carProfileURL}  style={{width:200,height:200}}/>
            }
        },
        {
            title: 'Door Type',
            dataIndex: 'doorType',
            key: 'doorType',
        },
        {
            title: 'Seats',
            dataIndex: 'seats',
            key: 'seats',
        },
        {
            title: 'Price Per Day',
            dataIndex: 'pricePerDay',
            key: 'pricePerDay',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Features',
            dataIndex: 'features',
            key: 'features',
        },
        {
            title: 'Booked',
            dataIndex: 'booked',
            key: 'booked',
            render:(text)=>{
                const map = {
                    0 : "Not Booked",
                    1 : "Booked"
                }
                return map[text];

            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div>
                    <Button type="link" onClick={() => editCar(record._id)}>
                        Edit
                    </Button>
                    <Button type="link" onClick={() => deleteCar(record._id)}>
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div style={{textAlign:"right",margin:8}}>
                <Button type="primary" onClick={addCar}>
                    Add Car
                </Button>
            </div>
            <Table   dataSource={cars} columns={columns} />

            <Modal
                visible={visible}
                title={editingCarId ? 'Edit Car' : 'Add Car'}
                onCancel={() => setVisible(false)}
                onOk={saveCar}
                width={800}
            >
                <Form form={form} layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="uid"
                                label="Owner UID"
                                rules={[{ required: true, message: 'Please enter the owner UID' }]}
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
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="make"
                                label="Make"
                                rules={[{ required: true, message: 'Please enter the make' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="model"
                                label="Model"
                                rules={[{ required: true, message: 'Please enter the model' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="year"
                                label="Year"
                                rules={[{ required: true, message: 'Please enter the year' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="engineType"
                                label="Engine Type"
                                rules={[{ required: true, message: 'Please enter the engine type' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="doorType"
                                label="Door Type"
                                rules={[{ required: true, message: 'Please enter the door type' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="seats"
                                label="Seats"
                                rules={[{ required: true, message: 'Please enter the number of seats' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="pricePerDay"
                                label="Price Per Day"
                                rules={[{ required: true, message: 'Please enter the price per day' }]}
                            >
                                <InputNumber style={{width:"100%"}} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="location"
                                label="Location"
                                rules={[{ required: true, message: 'Please enter the location' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="features"
                                label="Features"
                                rules={[{ required: true, message: 'Please enter the features' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="booked"
                                label="Booked"
                                rules={[{ required: true, message: 'Please enter the booked status' }]}
                            >
                                <Select>
                                    <Select.Option value={0}>Not Booked</Select.Option>
                                    <Select.Option value={1}>Booked</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="carProfileURL"
                                label="carProfileURL"
                                rules={[{ required: true, message: 'Please enter the carProfileURL' }]}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>
            </Modal>
        </div>
    );
};

export default CarList;
