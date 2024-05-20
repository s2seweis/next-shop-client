import React from 'react';
import { Row, Col, Input, Form } from 'antd';
import Loader from '@/src/components/Loader/Loader';
import { useAppDispatch } from '@/src/redux/hooks';
import {requestResetPassword} from '@/src/redux/slices/resetSlice'
import IsAuthPublic from '@/src/utils/authHocs/isAuthPublic';

interface ForgotPasswordProps { }

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
    const dispatch = useAppDispatch();
    const [loading] = React.useState<boolean>(false);

    const onFinish = (values: any) => {
        // console.log("line:100", values);
        dispatch(requestResetPassword(values));
    };

    return (
        <div className='login' style={{ width: "fit-content", height: "100vh", display: "flex", justifyContent: "center", margin: "auto" }}>


            <div style={{ margin: 'auto', padding: '20px', width: 'fit-content', borderRadius: '25px' }}>
                <div style={{ margin: '15px 0px 15px 15px', display: 'flex' }}>
                    <a href='javascript:history.back()'>Go Back</a>
                </div>

                {loading && <Loader />}
                <Row gutter={16} className='d-flex aligin-items-center' style={{ justifyContent: 'center' }}>

                    <Col
                        // lg={12}
                        // sm={20}
                        // xs={22}
                        className="p-2"
                    >
                        <Form
                            // layout='vertical'
                            className='login-form'
                            onFinish={onFinish}
                            style={{ background: "aliceblue", padding: "20px", borderRadius: "10px", width:"350px" }}
                        >
                            <h1>Reset Password</h1>
                            <h3>Enter your Email for request a reset link</h3>
                            <hr />
                            <Form.Item name='email' label='Email' rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <button style={{ marginBottom: '15px' }} className='btn1 mt-2 mb-3' type="submit">
                                Submit
                            </button>
                            <br />
                        </Form>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default IsAuthPublic(ForgotPassword);
