import { Component } from "react";
import { Form, Input, Button } from 'antd';
import axios from '../../util/axios';
import api from '../../api/index'
import qs from 'qs'
class StaffEdit extends Component {
    constructor(props) {
        super(props)
        // console.log('super',props)
        const { m_account, m_address, m_age, m_nikname, m_remarks, m_tel, m_id } = props.location.state
        this.state = ({
            m_id: m_id,
            m_nikname: m_nikname,
            m_age: m_age,
            m_account: m_account,
            m_tel: m_tel,
            m_address: m_address,
            m_remarks: m_remarks
        })
    }
    render() {
        // console.log('this state',this.state)
        console.log('props', this.props)
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 16 },
        };
        const onFinish = () => {
            console.log("this.e", this.state);
            axios({
                method: 'post',
                url: api.user.StaffEdit,
                data: qs.stringify(this.state)
            }).then(res => {
                if (res.data) {
                    alert('修改成功')
                    sessionStorage.removeItem('StaffInfo')
                    sessionStorage.removeItem('haveData')
                    this.props.history.go(-1)
                }
            })
        }
        return (
            <>
                <Form {...layout} name="nest-messages" onFinish={onFinish} >
                    <Form.Item label="姓名" className='inputName'>
                        <Input type='text'
                            required='required'
                            value={this.state.m_nikname}
                            onChange={(e) => {
                                // console.log("e",e.target.value)
                                this.setState({ m_nikname: e.target.value })
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="年龄" className='inputName'>
                        <Input
                            type='number'
                            value={this.state.m_age}
                            onChange={e => this.setState({ m_age: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="工号" className='inputName'>
                        <Input
                            readOnly
                            type='text'
                            value={this.state.m_account}
                            onChange={e => this.setState({ m_account: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="电话" className='inputName'>
                        <Input
                            type='text'
                            value={this.state.m_tel}
                            onChange={e => this.setState({ m_tel: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="地址">
                        <Input.TextArea className="inputAdress"
                            value={this.state.m_address}
                            onChange={e => this.setState({ m_address: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="备注">
                        <Input.TextArea className="inputAdress"
                            value={this.state.m_remarks}
                            onChange={e => this.setState({ m_remarks: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 17 }}>
                        <Button type="primary" onClick={() => this.props.history.go(-1)}>返回</Button>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: '40px' }}>提交</Button>
                    </Form.Item>
                </Form>
            </>
        )
    }

}
export default StaffEdit