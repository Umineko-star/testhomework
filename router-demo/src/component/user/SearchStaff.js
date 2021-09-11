import { Component } from "react"
import { Form, Input, Button, Table, Space } from "antd";
import { inject, observer } from 'mobx-react'
import "../../asset/SearchStaff.css"
import api from "../../api/index"
import qs from "qs"
import axios from "../../util/axios";
const columns = [
  {
    title: '昵称',
    dataIndex: 'm_nikname',
    key: 'm_nikname',
  },
  {
    title: '年龄',
    dataIndex: 'm_age',
    key: 'm_age',
  },
  {
    title: '员工工号',
    dataIndex: 'm_account',
    key: 'm_account',
  },
  {
    title: '员工电话',
    dataIndex: 'm_tel',
    key: 'm_tel',
  },

  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <Button type="primary" onClick={() => {
          searchList.history.push({ pathname: '/index/StaffInfo', state: record })
          // console.log('button', searchList)
          // console.log('record',record)
        }}>查看</Button>
      </Space>
    ),
  },
];
var searchList
var selectValue
@inject('user')
@observer
class SearchStaff extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataList: '',
      m_state: ''
    }
  }
  handleChange(e) {
    selectValue = e.target.value
    // console.log('boolean',Number(selectValue))
  }
  render() {
    searchList = this.props
    // console.log('searchList', searchList)

    const onFinish = (values) => {
      if (values.m_account === 'w2560001') {
        alert('您权限不够，请重新输入用户名')
      } else {       
        //去除空属性
        // console.log('values',values)
        if(Number(selectValue)!==0){
          values.m_state = selectValue
        }       
        for (const key in values) {
          if (!values[key]) {
            delete values[key]
          }
        }
        console.log('Success:', values);
        //发送异步axios请求
        axios({
          method: 'post',
          url: api.user.SearchStaff,
          data: qs.stringify(values)
        }).then(res => {
          // console.log('搜索请求数据', res.data)
          console.log('res',res.data)
          if(!res.data){
            alert('您搜索的用户不存在！！！')
          }else{
            this.props.user.searchData = res.data
            this.setState({
              dataList: res.data
            })
          }         
          // console.log('this.props.user.searchData', this.props.user.searchData)
        })
      }

    };
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    return (
      <>
        <Form
          className="form-content"
          name="basic"
          labelCol={{ span: 1.5 }}
          wrapperCol={{ span: 3 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            className="from-item"
            label="员工姓名"
            name="m_name"            
          >
            <Input />
          </Form.Item>
          <Form.Item
            className="from-item"
            label="员工工号"
            name="m_account"          
          >
            <Input />
          </Form.Item>
          <select name="m_state" onChange={this.handleChange.bind(this)}
            style={{ width: "180px", height: "34px", border: "1px solid gainsboro", outline: "none" }}
          >
            <option value="0">请选择</option>
            <option value="在职">在职</option>
            <option value="休假">休假</option>
            <option value="离职">离职</option>
          </select>
          {/* <Form.Item
            className="from-item"
            label="员工状态"
            name="m_state"
            required="请输入员工状态"
          >
            <Input />
          </Form.Item> */}
          <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="from-item">
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>
        <Table columns={columns} dataSource={this.props.user.searchData}/>
      </>
    )
  }
}
export default SearchStaff