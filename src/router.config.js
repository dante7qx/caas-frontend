import Home from '@/components/Home'
import Layout from '@/components/elui/Layout.vue'
import Container from '@/components/elui/Container.vue'
import Button from '@/components/elui/form/Button'
import DynaComponent from '@/components/elui/form/DynaComponent'
import DynaAddForm from '@/components/elui/form/DynaForm'
import Date from '@/components/elui/form/Date'
import Cascade from '@/components/elui/form/Cascade'
import Upload from '@/components/elui/form/Upload'
import Dialog from '@/components/elui/form/Dialog'
import Table from '@/components/elui/Table.vue'
import Tree from '@/components/elui/Tree.vue'
import SmallTest from '@/components/elui/SmallTest.vue'
import Transfer from '@/components/elui/Transfer.vue'
import TableForm from '@/components/elui/tableform/index'
import Calendar from '@/components/elui/Calendar.vue'
import OtherComponent from '@/components/elui/OtherComponent.vue'
import Esign from '@/components/third/Esign'
import HolidayPane from '@/components/third/Holiday'
import WaterBottom from '@/components/third/WaterBottom'
import JSEncrypt from '@/components/third/JSEncrypt'
import Tinymce from '@/components/third/Tinymce'
import TimerHook from '@/components/third/TimerHook'
import Crontab from '@/components/third/crontab'
import TencentMap from '@/components/third/map/Tencent'
import TreeChart from '@/components/third/TreeChart'
import ExcelPreview from '@/components/third/ExcelPreview'
import VideoPage from '@/components/third/videoPage'
import CameraMonitor from '@/components/camera/monitor'
import QrCode from '@/components/third/QrCode'
import ChatGPT from '@/components/ai/chatgpt'
import GDMap from '@/components/third/map/gd/MapContainer'
import SpeakTTS from '@/components/third/SpeakTTS'
import LaTeX from '@/components/third/LaTeX'
import DiffHtml from '@/components/third/diffhtml'
import DocEditor from '@/components/third/DocEditor'
import DesignExam from '@/components/dragdrop/designExam'
import Exam from "@/components/dragdrop/exam"
import DesignQA from '@/components/dragdrop/designQA'
import EchartPage from '@/components/echart/index'

// 定义路由
export default {
	routes: [
    { path: "/", component: GDMap },
    { path: "/home", component: Home },
    { path: "/layout", component: Layout },
    { path: "/container", component: Container },
    { path: "/button", component: Button },
    { path: "/dynacomponent", component: DynaComponent },
    { path: "/dynaaddform", component: DynaAddForm },
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
    { path: "/tinymce", component: Tinymce },
    { path: "/timer", component: TimerHook },
    { path: "/crontab", component: Crontab },
    { path: "/txmap", component: TencentMap },
    { path: "/treechart", component: TreeChart },
    { path: "/excelpreview", component: ExcelPreview },
    { path: "/video", component: VideoPage },
    { path: "/camera", component: CameraMonitor },
    { path: "/qrcode", component: QrCode },
    { path: "/chatgpt", component: ChatGPT},
    { path: "/gdmap", component: GDMap },
    { path: "/speaktts", component: SpeakTTS },
    { path: "/latex", component: LaTeX },
    { path: "/diffhtml", component: DiffHtml },
    { path: "/doceditor", component: DocEditor },
    { path: "/echart", component: EchartPage },
    { path: "/designexam", component: DesignExam },
    { path: "/exam", component: Exam },
    { path: "/designqa", component: DesignQA },
	]
}
