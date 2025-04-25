let xmlStr = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="sid-38422fae-e03e-43a3-bef4-bd33b32041b2" targetNamespace="http://bpmn.io/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="18.3.1">
  <process id="Process_1" isExecutable="false">
    <startEvent id="StartEvent_1y45yut" name="开始">
      <outgoing>SequenceFlow_0h21x7r</outgoing>
    </startEvent>
    <sequenceFlow id="SequenceFlow_0h21x7r" sourceRef="StartEvent_1y45yut" targetRef="Task_1hcentk" />
    <sequenceFlow id="SequenceFlow_0wnb4ke" sourceRef="Task_1hcentk" targetRef="ExclusiveGateway_15hu1pt" />
    <userTask id="Task_1hcentk" name="请假">
      <incoming>SequenceFlow_0h21x7r</incoming>
      <outgoing>SequenceFlow_0wnb4ke</outgoing>
    </userTask>
    <sequenceFlow id="Flow_0zgfjpy" name="&#62;=3" sourceRef="ExclusiveGateway_15hu1pt" targetRef="Activity_03egahq" />
    <endEvent id="Event_0exqnxf" name="结束">
      <incoming>Flow_0u7xmhg</incoming>
    </endEvent>
    <endEvent id="Event_1dpvmm0" name="结束">
      <incoming>Flow_1a4cye7</incoming>
    </endEvent>
    <sequenceFlow id="Flow_1a4cye7" name="&#60;3" sourceRef="ExclusiveGateway_15hu1pt" targetRef="Event_1dpvmm0" />
    <sequenceFlow id="Flow_0u7xmhg" sourceRef="Activity_03egahq" targetRef="Event_0exqnxf" />
    <userTask id="Activity_03egahq" name="领导审批">
      <incoming>Flow_0zgfjpy</incoming>
      <outgoing>Flow_0u7xmhg</outgoing>
    </userTask>
    <exclusiveGateway id="ExclusiveGateway_15hu1pt">
      <incoming>SequenceFlow_0wnb4ke</incoming>
      <outgoing>Flow_0zgfjpy</outgoing>
      <outgoing>Flow_1a4cye7</outgoing>
    </exclusiveGateway>
  </process>
  <bpmndi:BPMNDiagram id="BpmnDiagram_1">
    <bpmndi:BPMNPlane id="BpmnPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="StartEvent_1y45yut_di" bpmnElement="StartEvent_1y45yut">
        <omgdc:Bounds x="152" y="102" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="160" y="145" width="22" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_048etzl_di" bpmnElement="Task_1hcentk">
        <omgdc:Bounds x="240" y="80" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0exqnxf_di" bpmnElement="Event_0exqnxf">
        <omgdc:Bounds x="732" y="102" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="739" y="145" width="22" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0pez4co_di" bpmnElement="Activity_03egahq">
        <omgdc:Bounds x="550" y="80" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1dgfbit_di" bpmnElement="ExclusiveGateway_15hu1pt" isMarkerVisible="true">
        <omgdc:Bounds x="415" y="95" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1dpvmm0_di" bpmnElement="Event_1dpvmm0">
        <omgdc:Bounds x="422" y="202" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="429" y="245" width="22" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0h21x7r_di" bpmnElement="SequenceFlow_0h21x7r">
        <omgdi:waypoint x="188" y="120" />
        <omgdi:waypoint x="240" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0wnb4ke_di" bpmnElement="SequenceFlow_0wnb4ke">
        <omgdi:waypoint x="340" y="120" />
        <omgdi:waypoint x="415" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0zgfjpy_di" bpmnElement="Flow_0zgfjpy">
        <omgdi:waypoint x="465" y="120" />
        <omgdi:waypoint x="550" y="120" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="498" y="102" width="19" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1a4cye7_di" bpmnElement="Flow_1a4cye7">
        <omgdi:waypoint x="440" y="145" />
        <omgdi:waypoint x="440" y="202" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="449" y="171" width="13" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0u7xmhg_di" bpmnElement="Flow_0u7xmhg">
        <omgdi:waypoint x="650" y="120" />
        <omgdi:waypoint x="732" y="120" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>
`
export default xmlStr
