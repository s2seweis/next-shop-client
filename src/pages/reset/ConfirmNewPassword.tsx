import React, { useState } from 'react';
import { Col, Row, Form, Input } from 'antd';
import Loader from '@/src/components/Loader/Loader';
import { useParams } from 'react-router-dom';

interface PasswordResetProps { }

const PasswordReset: React.FC<PasswordResetProps> = () => {
    const [loading] = useState<boolean>(false);
    const { token, id } = useParams<{ token: string; id: string }>();
    const initialValues = { token: token, userId: id };

    const onFinish = (values: any) => {
        console.log("line:100", values);
        // dispatch(resetPassword(values));
    };

    return (
        <div className='reset' style={{ width: "fit-content", height: "100vh", display: "flex", justifyContent: "center", margin: "auto" }}>

            <div style={{ margin: 'auto', padding: '20px', width: 'fit-content', borderRadius: '25px' }}>
                <div style={{ margin: '15px 0px 15px 15px', display: 'flex' }}>
                    <a href='javascript:history.back()'>Go Back</a>
                </div>

                {loading && <Loader />}
                <Row gutter={16} className='d-flex aligin-items-center' style={{ justifyContent: 'center' }} >
                    <Col
                        // lg={12}
                        // sm={20}
                        // xs={22}
                        // className="p-2"
                    >
                        <Form
                            initialValues={initialValues}
                            className="form"
                            layout="vertical"
                            onFinish={onFinish}
                            style={{ background: "aliceblue", padding: "20px", borderRadius: "10px", width:"350px" }}
                        >
                            <h3>Reset Password</h3>
                            <hr />
                            <Form.Item
                                name="token"
                                label="Token"
                                rules={[{ required: true }]}
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                name="userId"
                                label="User ID"
                                rules={[{ required: true }]}
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                label="New Password"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                            <div className="text-right">
                                <button type="submit" className="btn1">Submit</button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </div>

        </div>
    );
}

export default PasswordReset;
