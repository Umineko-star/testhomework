import {Component} from 'react';
import {Space, Table} from 'antd';
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
        dataIndex: 'coupon_name'
    },
    {
        title: '剩余数量',
        dataIndex: 'coupon_circulation'
    },
    {
        title: '时限',
        dataIndex: 'coupon_validity'
    },
    {
        title: '可领取用户',
        dataIndex: 'coupon_callableUser'
    },
    {
        title: '每人限领',
        dataIndex: 'coupon_restrictGet'
    },
    {
        title: '门槛',
        dataIndex: 'coupon_restrictUse'
    },
    {
        title: '面额',
        dataIndex: 'coupon_faceValue'
    },
    {
        title: '可使用商品',
        dataIndex: 'coupon_canUse'
    }
];

// const getRandomuserParams = params => ({
//     results: params.pagination.pageSize,
//     page: params.pagination.current,
//     ...params,
// });
class pretestCoupon extends Component {
    state = {
        couponData: [],
        pagination: {
            current: 1,
            pageSize: 10,
        },
        loading: false
    };

    componentDidMount() {
        const { pagination } = this.state;
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
                if (Date.parse(tempDateArr[0])<Date.now()&&Date.parse(tempDateArr[1])>Date.now()){
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