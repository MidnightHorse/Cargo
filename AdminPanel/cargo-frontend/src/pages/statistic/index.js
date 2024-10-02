import React, { useEffect, useState } from 'react';
import { Card, Statistic, Row, Col, Button, message } from 'antd';
import axios from "axios";
import lodash from "lodash";

const Overview = () => {
    const [numObj, setNumObj] = useState({});
    async function getData() {
        axios.get(`${window.location.protocol}//${window.location.host}/user/`).then((res) => {
            const num = lodash.get(res, "data.data.length");
            setNumObj(obj => {
                obj.userNum = num;
                return { ...obj };
            })
        });
        axios.get(`${window.location.protocol}//${window.location.host}/order/`).then((res) => {
            const num = lodash.get(res, "data.data.length");
            setNumObj(obj => {
                obj.orderNum = num;
                return { ...obj };
            })
        });
        axios.get(`${window.location.protocol}//${window.location.host}/car/`).then((res) => {
            const num = lodash.get(res, "data.data.length");
            setNumObj(obj => {
                obj.carNum = num;
                return { ...obj };
            })
        });
        axios.get(`${window.location.protocol}//${window.location.host}/comment/`).then((res) => {
            const num = lodash.get(res, "data.data.length");
            setNumObj(obj => {
                obj.commentNum = num;
                return { ...obj };
            })
        });
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <div>
            <Card>
                <Row gutter={16}>
                    <Col span={4}>
                        <Statistic title="Orders" value={lodash.get(numObj, "orderNum")} />
                    </Col>
                    <Col span={4}>
                        <Statistic title="Users" value={lodash.get(numObj, "userNum")} />
                    </Col>
                    <Col span={4}>
                        <Statistic title="Cars" value={lodash.get(numObj, "carNum")} />
                    </Col>
                    <Col span={4}>
                        <Statistic title="Comments" value={lodash.get(numObj, "commentNum")} />
                    </Col>
                    <Col>
                        <div style={{ lineHeight: "80px" }}>
                            <Button onClick={async () => {
                                await axios.post(`${window.location.protocol}//${window.location.host}/initData/`)
                                console.log("Re-initialize database success!")
                                message.success('Re-initialize database success!');
                                getData();
                            }}>Re-initialize database</Button>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default Overview;
