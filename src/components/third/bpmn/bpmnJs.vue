<template>
  <div class="app-container">
    <h2 style="text-align: center;">Bpmn设计器</h2>
    <h3 style="text-align: center;">
      <a href="https://blog.csdn.net/qq_41619796/article/details/120137745">参考资料1</a>
      <a href="https://blog.csdn.net/weixin_47006899/article/details/134378389?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-5-134378389-blog-120137745.235^v43^pc_blog_bottom_relevance_base3&spm=1001.2101.3001.4242.4&utm_relevant_index=8">参考资料2</a>
    </h3>
    <div class="containers" ref="containers">
      <div id="js-canvas" class="canvas" ref="canvas"></div>
      <div id="js-properties-panel"></div>
    </div>
  </div>

</template>

<script>
import xmlStr from './xml' //引入默认显示的xml字符串数据
import BpmnModeler from 'bpmn-js/lib/Modeler' // 引入 bpmn-js
import customTranslate from './customTranslate/customTranslate'  //汉化
//右侧属性栏功能
import propertiesPanelModule from 'bpmn-js-properties-panel'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'

export default {
  name: "BpmnJsPage",
  data() {
    return {
      bpmnModeler: null,
      containers: null,
      canvas: null,
      customTranslateModule: {
        translate: [ 'value', customTranslate ]
      }
    }
  },
  mounted() {
   this.initDiagram();
  },
  methods: {
    initDiagram() {
      this.containers = this.$refs.containers   // 获取到属性ref为“containers”的dom节点
      const canvas = this.$refs.canvas   // 获取到属性ref为“canvas”的dom节点
      this.bpmnModeler = new BpmnModeler({
        container: canvas,
        // 添加控制板
        propertiesPanel: {
          parent: '#js-properties-panel'
        },
        // 左侧
        additionalModules: [
          this.customTranslateModule,
          // 右边的属性栏
          propertiesProviderModule,
          propertiesPanelModule
        ],
        moddleExtensions: {
          camunda: camundaModdleDescriptor
        }
      })
      this.createNewDiagram()
    },
    // 注意：必须先加载一个bpmn文件，新建就是加载一个空的bpmn文件，否则不能拖拽节点
    createNewDiagram() {
      this.openDiagram(xmlStr)
    },
    openDiagram(xml){
      this.bpmnModeler.importXML(xml, function(err) {
        if (err) {
          console.error(err);
        } else {
        }
      });
    }
  }
};

</script>

<style lang="scss">
/*左边工具栏以及编辑节点的样式*/
@import '~bpmn-js/dist/assets/diagram-js.css';
@import '~bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
@import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
@import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';

/*右侧详情*/
@import '~bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';

.containers {
  position: absolute;
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  display: flex;
  .canvas {
    width: 100%;
    height: 100%;
  }
  .bjs-powered-by {
    display: none;
  }
}
</style>
