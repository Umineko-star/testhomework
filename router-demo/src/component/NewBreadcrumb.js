import { Component } from "react";
import { Breadcrumb } from "antd";
import { inject, observer } from "mobx-react"
import { Link, withRouter } from 'react-router-dom'
@inject('user')
@observer
class NewBreadcrumb extends Component {
    constructor() {
        super()
        this.state = {
            menuList: [],
            extraBreadcrumbItem: []
        }
    }
    //以递归的方式展开react router数组
    changeMenuList() {
        const arr = this.props.user.user.menuInfo.reduce(function f(pre, item) {
            //const callee = arguments.callee//将运行函数赋值给一个变量
            pre.push(item)
            if (item.menuChilds && item.menuChilds.length > 0) {
                item.menuChilds.reduce(f, pre);//判断当前参数是否存在children，有则递归处理
            }
            return pre
        }, []).map(item => {
            item.menuChilds = []
            return item
        })
        // console.log(arr)
        this.setState({
            menuList: arr
        }, function () {
            this.buildBread()
        })
    }
    buildBread = () => {
        //  清空面包屑的项
        this.setState({
            extraBreadcrumbItem: []
        }, function () {
            //1.获取路径名
            let pathname = this.props.history.location.pathname;
            // console.log(this.props)
            let currentMenu = this.state.menuList.find(item => {
                return item.menuUrl === pathname
            });
            if (currentMenu && currentMenu.menuId) {
                this.buildBreadItemByMenuId(currentMenu.menuId)
            }
        })
    }
    buildBreadItemByMenuId = (menuId) => {
        let Menu = this.state.menuList.find(item => {
            return item.menuId === menuId
        })
        // console.log(Menu)
        if (Menu) {
            this.setState({
                extraBreadcrumbItem: [
                    (<Breadcrumb.Item key={Menu.menuUrl}>
                        <Link to={Menu.menuUrl}>
                            {Menu.menuName}
                        </Link>
                    </Breadcrumb.Item>), ...this.state.extraBreadcrumbItem]
            }, function () {
                if (Menu.pId !== 0) {
                    this.buildBreadItemByMenuId(Menu.pId)
                }
            })
        }
    }
    componentDidMount() {
        this.changeMenuList()
    }
    componentWillReceiveProps() {
        //    console.log('=======================================')
        this.buildBread()
    }

    render() {
        // console.log('+++++++++')
        return (
            <Breadcrumb style={{ margin: '16px 0' }}>
                {this.state.extraBreadcrumbItem}
            </Breadcrumb>
        )
    }
}
export default withRouter(NewBreadcrumb)