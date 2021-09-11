import React,{Component} from 'react';
import {Button} from "antd";
import axios from "axios";
import qs from "qs";
// import EnterpriseInformation from "./EnterpriseInformation";
class AddEnterprise extends Component{

    constructor(props) {
        super(props);
    }
    addEnterprise(){
        // console.log(this.refs.enterpriseName.value)
        let name=this.refs.enterpriseName.value
        let phone=this.refs.enterpriseNum.value
        let email=this.refs.enterpriseEmail.value
        let address=this.refs.enterpriseAddress.value
        return new Promise((req,resp)=>{
            axios({
                method:"post",
                url:"http://localhost:8888/addEnterprise.do",
                data:qs.stringify({name:name,phone:phone,email:email,address:address})
            }).then(res=>{
                // console.log(res)、
                alert(res.data)
                this.props.history.push("/index/firm/EnterpriseInformation");
            }).catch(message=>message)
        })
    }
    render() {
        return(
            <>
                <div>
                    <p>企业名称</p>
                    <input type="text" ref='enterpriseName'/>
                    <p>企业电话</p>
                    <input type="text" ref='enterpriseNum'/>
                    <p>企业邮箱</p>
                    <input type="text" ref='enterpriseEmail'/>
                    <p>企业地址</p>
                    <input type="text" ref='enterpriseAddress'/>
                    <br/>
                    <br/>
                    <Button type="primary" onClick={this.addEnterprise.bind(this)}>
                        提交
                    </Button>
                </div>
            </>
        )
    }
}

export default AddEnterprise
