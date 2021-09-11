import { Component } from 'react';
import { Table, Form, Divider, Radio, Space, Modal, Button, Input, InputNumber } from 'antd';
import axios from "../../util/axios";
import api from "../../api";
import qs from "qs";
import moment from 'moment'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
const columns = [
    {
        title: '优惠券名称',
        dataIndex: 'coupon_name',
        editable: true
    },
    {
        title: '剩余数量',
        dataIndex: 'coupon_circulation'
    },
    {
        title: '时限',
        dataIndex: 'coupon_validity',
        editable: true
    },
    {
        title: '可领取用户',
        dataIndex: 'coupon_callableUser',
        editable: true
    },
    {
        title: '每人限领',
        dataIndex: 'coupon_restrictGet',
        editable: true,
    },
    {
        title: '门槛',
        dataIndex: 'coupon_restrictUse',
        editable: true
    },
    {
        title: '面额',
        dataIndex: 'coupon_faceValue',
        editable: true
    },
    {
        title: '可使用商品',
        dataIndex: 'coupon_canUse',
        editable: true
    }
];

let tempObj = {};
class pretestCoupon extends Component {
    constructor() {
        super();
        this.state = {
            couponData: [],
            pagination: {
                current: 1,
                pageSize: 10,
            },
            loading: false,
            visible: false
        };
    }

    showModal () {
        this.setState({
            visible: true
        })
    }
    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };
    componentDidMount() {
        const { pagination, visible, loading } = this.state;
        this.fetch({ pagination });
    }
    handleTableChange = (pagination, filters, sorter) => {
        this.fetch({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination,
            ...filters,
        });
    };
    fetch = (params = {}) => {
        this.setState({ loading: true });
        axios({
            url: api.user.getCouponMsg,
            method: 'get',
            type: 'json'
        }).then(data => {
            let pageData = [];
            data.data.map((items)=> {
                let tempDateArr = [];
                let tempCakeArr1 = [items.coupon_canUse.split('/')];
                let tempCakeArr2 = [];
                for (let i = 0;i<2;i++){
                    tempDateArr.push(items.coupon_validity.split('&')[i])
                }
                if (Date.parse(tempDateArr[0])>Date.now()){
                    tempCakeArr1.map((item)=>{
                        if (item.indexOf('cake')>=0){
                            tempCakeArr2.push('蛋糕')
                        }
                        if (item.indexOf('bread')>=0){
                            tempCakeArr2.push('面包')
                        }
                        if (item.indexOf('ice_cream')>=0){
                            tempCakeArr2.push('冰淇淋')
                        }
                        if (item.indexOf('light_cake')>=0){
                            tempCakeArr2.push('冻与焗/轻蛋糕')
                        }
                    })
                    items.coupon_validity = tempDateArr.join('至')
                    items.coupon_canUse = tempCakeArr2.join(',')
                    pageData.push(items);
                }
            })
            this.setState({
                loading: false,
                couponData: pageData
            });
        });
    };
    render() {
        const { couponData, pagination, loading } = this.state;
        tempObj.visible = this.state.visible
        tempObj.handleOk = this.handleOk
        tempObj.handleCancel = this.handleCancel
        tempObj.loading = this.state.loading
        return (
            <>
                <Table
                    columns={columns}
                    rowKey={record => record.coupon_id}
                    dataSource={couponData}
                    pagination={pagination}
                    loading={loading}
                    onChange={this.handleTableChange}
                />

            </>

        )
    }
}
export default pretestCoupon;