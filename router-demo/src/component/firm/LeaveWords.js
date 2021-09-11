import { SearchOutlined } from '@ant-design/icons';
import React,{Component,} from 'react';
import { Table, Space,Button,Tooltip } from 'antd';
import axios from "axios";
import qs from 'qs';
const { Column, ColumnGroup } = Table;
class LeaveWords extends Component{
    constructor(props) {
        super(props);
        this.state={
            data:[]
        }
    }
    getData=()=>{
        return new Promise((resolve ,reject)=>{
            axios({
                method:'get',
                url:"http://localhost:8888/getDataL.do"
            }).then(res=>{
                // console.log(res.data)
                this.setState({
                    data:res.data
                })
                resolve(res)
            }).catch(message=>message)
        })
    }
    componentDidMount() {
        this.getData().then(res=>{

        })
    }
    handleDelete(id){
        return new Promise((req,resp)=>{
            axios({
                method:"post",
                url:"http://localhost:8888/deleteDataL.do",
                data:qs.stringify({id:id})
            }).then(res=>{
                console.log(res)
                this.getData().then(res=>{
                    // console.log(res)
                })
            }).catch(message=>message)
        })
    }
    findMessage(record){
        // console.log(record)
        this.props.history.push({pathname:"/index/LeaveWordsDetail",data:record})
    }
    render() {
        return (
            <>
                <div>
                    <Table dataSource={this.state.data}>
                        <ColumnGroup title="公司名称" dataIndex="companyName" key="companyName" align="center" width="25%">
                        </ColumnGroup>
                        <Column title="联系人" dataIndex="contacts" key="contacts" align="center" width="25%"/>
                        <Column title="联系电话" dataIndex="phoneNum" key="phoneNum" align="center" width="25%"/>

                        <Column
                            align="center"
                            title="操作"
                            key="action"
                            render={(text, record) => (
                                <Space size="middle" >
                                    {/*<a key="" onClick={this.findMessage.bind(this,record.EnterpriseId)}>查看</a>*/}
                                    {/*<button onClick={this.handleDelete.bind(this,record.EnterpriseId)}>删除</button>*/}
                                    <Tooltip title="search">
                                        <Button shape="circle" onClick={this.findMessage.bind(this,record)} icon={<SearchOutlined />}/>
                                    </Tooltip>
                                    <Tooltip title="search">
                                        <Button danger shape="circle" onClick={this.handleDelete.bind(this,record.l_id)}>X</Button>
                                    </Tooltip>
                                </Space>
                            )}
                        />
                    </Table>
                </div>

            </>
        );
    }
}

export default LeaveWords;