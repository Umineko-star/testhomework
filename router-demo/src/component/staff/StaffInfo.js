import React, { Component } from 'react'
import { Descriptions,Button } from 'antd';
class StaffInfo extends Component {
    render() {    
            const { m_account,m_address,m_age,m_nikname,m_remarks,m_tel,m_state } = this.props.location.state     
        // console.log('address',m_address)
        // console.log(this.props.location.state)
        return (
            <>
                <Descriptions title="员工信息" layout="vertical">
                    <Descriptions.Item label="姓名">{m_nikname}</Descriptions.Item>
                    <Descriptions.Item label="年龄">{m_age}</Descriptions.Item>
                    <Descriptions.Item label="工号">{m_account}</Descriptions.Item>
                    <Descriptions.Item label="电话">{m_tel}</Descriptions.Item>
                    <Descriptions.Item label="状态">{m_state}</Descriptions.Item>
                    <Descriptions.Item label="地址" span={2}>
                        {m_address}
                    </Descriptions.Item>
                    <Descriptions.Item label="Remark">{m_remarks}</Descriptions.Item>
                </Descriptions>
                <div style={{float:'right',marginRight:'100px'}}>
                <Button type="primary" onClick = {()=>{this.props.history.go(-1)}}>返回</Button>
                </div>
                
            </>
        )
    }
}
export default StaffInfo