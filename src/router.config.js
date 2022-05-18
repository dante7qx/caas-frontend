import Home from './components/Home'
import Layout from './components/Layout'
import Container from './components/Container'
import Button from './components/Button'
import Form from './components/Form'
import Date from './components/Date'
import Cascade from './components/Cascade'
import Table from './components/Table'
import Tree from './components/Tree'
import Dialog from './components/Dialog'
import SmallTest from './components/SmallTest'
import Transfer from './components/Transfer'
import TableForm from './components/tableform/index'
import Upload from './components/Upload'
import Calendar from './components/Calendar'
import OtherComponent from './components/OtherComponent'
import Esign from './components/third/Esign'
import HolidayPane from './components/third/Holiday'

// 定义路由
export default {
	routes: [
    { path: "/home", component: Home },
    { path: "/layout", component: Layout },
    { path: "/container", component: Container },
    { path: "/button", component: Button },
    { path: "/form", component: Form },
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
	]
}