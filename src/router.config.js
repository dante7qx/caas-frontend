import Home from './components/Home.vue'
import Layout from './components/Layout.vue'
import Container from './components/Container.vue'
import Button from './components/Button.vue'
import Form from './components/Form.vue'
import Date from './components/Date.vue'
import Table from './components/Table.vue'
import Tree from './components/Tree.vue'
import Dialog from './components/Dialog.vue'

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
        { path: "/dialog", component: Dialog },
    ]
}