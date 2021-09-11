import React,{ Component } from "react"; 
import { Form, Input, Button,Select } from "antd";
import api from "../../api/index";
import qs from "qs";
import axios from "../../util/axios";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};
class StaffAdd extends Component {
    constructor(props){
        super(props)
        this.state = {
            m_state:''
        }
    }
    getStaffState(value){
        console.log("e",value)
        this.setState({
            m_state:value
        })
    }
  render() {
    const onFinish = (values) => {
      values.m_routes = "1,2";
      values.m_state = this.state.m_state
      console.log(values);
      axios({
        method: "post",
        url: api.user.StaffAdd,
        data: qs.stringify(values),
      }).then((res) => {
        if (res.data) {
           if(window.confirm('添加成功，是否继续添加？')) {

           }else{
                this.props.history.go(-1)
           }
        //   alert("添加成功");
        } else {
          alert("添加失败");
        }
      });
    };
    return (
      <>      
        <Form {...layout} name="nest-messages" onFinish={onFinish}>
          <Form.Item
            name="m_name"
            label="用户名"
            rules={[{ required: true, message: "请输入员工名" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="nikname"
            label="用户昵称"
            rules={[{ required: true, message: "请输入员工昵称" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="m_account"
            label="工号"
            rules={[{ required: true, message: "请输入员工工号" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="m_password"
            label="初始密码"
            rules={[{ required: true, message: "请输入初始密码" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="m_tel"
            label="电话"
            rules={[{ required: true, message: "请输入员工联系方式" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="m_age"
            label="年龄"
            rules={[{ required: true, message: "请输入员工年龄" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="状态" name="m_state" rules={[{ required: true, message: "请输入员工状态" }]}>
          <Select onChange = {this.getStaffState.bind(this)}>
            <Select.Option value="在职">在职</Select.Option>
            <Select.Option value="休假">休假</Select.Option>
            <Select.Option value="离职">离职</Select.Option>
          </Select>
        </Form.Item>
          <Form.Item
            name="m_address"
            label="地址"
            rules={[{ required: true, message: "请输入员工地址" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="m_remarks" label="备注">
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 17 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}
export default StaffAdd;
