import { Component } from "react";
import { Route } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import loadable from '@loadable/component'
@inject('user')
@observer
class PrivateRoute extends Component {
    constructor() {
        super();
        this.state = {
            routelist: []
        }
    }

    bindRouter(list) {
        let arr = []
        list.map(item => {
            if (item.menuChilds && item.menuChilds.length > 0) {
                //有子菜单
                //所有子菜单不做嵌套
                // arr.push(...this.bindRouter(item.menuChilds))
                // arr.push(...this.bindRouter(item.menuChilds),
                // <Route path = {item.menuUrl} key = {item.menuId} component={loadable(()=>{
                //     return import("./"+item.componentPath)
                // })}></Route>)
                if (!item.isContainChildren) {
                    arr.push(...this.bindRouter(item.menuChilds))
                } else {
                    let ComponentName = loadable(() => import('./' + item.componentPath));
                    arr.push(//<Home>Route</Home>将子路由嵌套到父路由
                        <Route path={item.menuUrl} key={item.menuId}>
                            <ComponentName> {this.bindRouter(item.menuChilds)} </ComponentName>
                        </Route>)
                }
            } else {
                arr.push(<Route path={item.menuUrl} key={item.menuId} component={loadable(() => {
                    return import("./" + item.componentPath)
                })}></Route>)
            }
        })
        // console.log(arr)
        return arr
        // let routerList = list.map((item,index)=>{
        //     if(item.menuChilds && item.menuChilds.length>0){
        //             return [...this.bindRouter(item.menuChilds),<Route path = {item.menuUrl} key={item.menuId}
        //                 component = {loadable(()=>{ return import('./'+item.componentPath)})}>
        //                 </Route>]
        //     }else{
        //            return <Route path = {item.menuUrl} key={item.menuId}
        //            component = {
        //                loadable(()=>{
        //                   return import('./'+item.componentPath)
        //                })}>
        //            </Route>
        //     }
        // })
        // return routerList
    }
    componentDidMount() {
        let mylist = this.bindRouter(this.props.user.user.menuInfo)
        // console.log(mylist)
        this.setState({
            routelist: mylist
        })
    }
    render() {
        return (
            <>
                {this.state.routelist}
            </>
        )
    }
}
export default PrivateRoute