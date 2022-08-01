import Home from './components/Home'
import Layout from './components/Layout'
import Container from './components/Container'
import Button from './components/form/Button'
import DynaComponent from './components/form/DynaComponent'
import Date from './components/form/Date'
import Cascade from './components/form/Cascade'
import Upload from './components/form/Upload'
import Dialog from './components/form/Dialog'
import Table from './components/Table'
import Tree from './components/Tree'
import SmallTest from './components/SmallTest'
import Transfer from './components/Transfer'
import TableForm from './components/tableform/index'

import Calendar from './components/Calendar'
import OtherComponent from './components/OtherComponent'
import Esign from './components/third/Esign'
import HolidayPane from './components/third/Holiday'
import WaterBottom from './components/third/WaterBottom'
import JSEncrypt from './components/third/JSEncrypt'

// 定义路由
export default {
	routes: [
    { path: "/home", component: Home },
    { path: "/layout", component: Layout },
    { path: "/container", component: Container },
    { path: "/button", component: Button },
    { path: "/dynacomponent", component: DynaComponent },
    { path: "/table", component: Table },
    { path: "/tree", component: Tree },
    { path: "/date", component: Date },
    { path: "/cascade", component: Cascade },
    { path: "/dialog", component: Dialog },
    { path: "/smalltest", component: SmallTest },
    { path: "/transfer", component: Transfer },
    { path: "/tableform", component: TableForm },
    { path: "/upload", component: Upload },
    { path: "/calendar", component: Calendar },
    { path: "/otherwiget", component: OtherComponent },
		{ path: "/esign", component: Esign },
    { path: "/holidaypane", component: HolidayPane },
    { path: "/waterbottom", component: WaterBottom },
    { path: "/jsenc", component: JSEncrypt },
	]
}