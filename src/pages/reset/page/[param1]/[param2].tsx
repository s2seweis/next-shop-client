import React, { useState, useEffect } from 'react';
import { Col, Row, Form, Input } from 'antd';
import Loader from '@/src/components/Loader/Loader';
import IsAuthPublic from '@/src/utils/authHocs/isAuthPublic';
import {resetPassword} from '@/src/redux/slices/resetSlice'
import { useAppDispatch } from '@/src/redux/hooks';

interface PasswordResetProps {}

const PasswordReset: React.FC<PasswordResetProps> = () => {
    const dispatch = useAppDispatch();
    const [token, setToken] = useState<string>('');    
    const [userId, setUserId] = useState<string>('');
    const [loading] = useState<boolean>(false);
    
    useEffect(() => {
        const url = window.location.href;
        const parts = url.split('/');
        const tokenIndex = parts.indexOf('reset') + 2;
        const userIdIndex = tokenIndex + 1;
        const extractedToken = parts[tokenIndex];
        const extractedUserId = parts[userIdIndex];
        
        setToken(extractedToken);
        setUserId(extractedUserId);
    }, []);
    
    useEffect(() => {
        // Update form fields when token and userId change
        form.setFieldsValue({ token, userId });
    }, [token, userId]);
    
    const [form] = Form.useForm();
    
    const onFinish = (values: any) => {
        // console.log("line:300", values);
        dispatch(resetPassword(values));
        // Dispatch reset password action
    };
    
    return (
        <div className='reset' style={{ width: "fit-content", height: "100vh", display: "flex", justifyContent: "center", margin: "auto" }}>
            <div style={{ margin: 'auto', padding: '20px', width: 'fit-content', borderRadius: '25px' }}>
                <div style={{ margin: '15px 0px 15px 15px', display: 'flex' }}>
                    <a href='javascript:history.back()'>Go Back</a>
                </div>

                {loading && <Loader />}
                <Row gutter={16} className='d-flex aligin-items-center' style={{ justifyContent: 'center' }} >
                    <Col>
                        <Form
                            form={form}
                            className="form"
                            layout="vertical"
                            onFinish={onFinish}
                            style={{ background: "aliceblue", padding: "20px", borderRadius: "10px", width: "350px" }}
                        >
                            <h3>Reset Password</h3>
                            <hr />
                            <Form.Item
                                name="token"
                                label="Token"
                                rules={[{ required: true, message: 'Please input your token!' }]}
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                name="userId"
                                label="User ID"
                                rules={[{ required: true, message: 'Please input your user ID!' }]}
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                label="New Password"
                                rules={[{ required: true, message: 'Please input your new password!' }]}
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

export default IsAuthPublic(PasswordReset);
