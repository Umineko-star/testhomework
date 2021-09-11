import React, { Component } from "react";
import { Descriptions, Button } from "antd";
class UserInfo extends Component {
  render() {
      console.log(this.props)
    const {
      m_id,
      m_nikname,
      m_name,
      m_account,
      m_password,
      m_age,
      m_tel,
      m_address,
      m_state,
      m_remarks,
    } = this.props.history.location.state;
    return (
      <>
        <Descriptions title="员工信息" layout="vertical">
          <Descriptions.Item label="ID">{m_id}</Descriptions.Item>
          <Descriptions.Item label="姓名">{m_name}</Descriptions.Item>
          <Descriptions.Item label="密码">{m_password}</Descriptions.Item>
          <Descriptions.Item label="昵称">{m_nikname}</Descriptions.Item>
          <Descriptions.Item label="年龄">{m_age}</Descriptions.Item>
          <Descriptions.Item label="工号">{m_account}</Descriptions.Item>
          <Descriptions.Item label="电话">{m_tel}</Descriptions.Item>
          <Descriptions.Item label="状态">{m_state}</Descriptions.Item>
          <Descriptions.Item label="地址" span={2}>
            {m_address}
          </Descriptions.Item>
          <Descriptions.Item label="Remark">{m_remarks}</Descriptions.Item>
        </Descriptions>
        <div style={{ float: "right", marginRight: "100px",marginTop:'-20px' }}>
          <Button
            type="primary"
            onClick={() => {
              this.props.history.go(-1);
            }}
          >
            返回
          </Button>
        </div>
      </>
    );
  }
}
export default UserInfo;
