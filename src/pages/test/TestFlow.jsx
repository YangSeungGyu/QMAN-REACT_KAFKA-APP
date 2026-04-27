import React, { useMemo } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  useNodesState, 
  useEdgesState,
  Handle,
  Position 
} from 'reactflow';
import 'reactflow/dist/style.css';

const SmartNode = ({ data }) => {
  const containerStyle = {
    padding: '0', borderRadius: '8px', background: '#ffffff', border: '2px solid #555',
    minWidth: '180px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', fontSize: '12px', overflow: 'hidden'
  };

  const headerStyle = {
    background: '#f0f0f0', padding: '8px', fontWeight: 'bold', borderBottom: '1px solid #ccc',
    textAlign: 'center', fontSize: '14px'
  };

  const sectionStyle = { padding: '8px', textAlign: 'left', lineHeight: '1.6' };
  const hrStyle = { border: 'none', borderTop: '1px dashed #bbb', margin: '4px 0' };

  return (
    <div style={containerStyle}>
      {/* Target 핸들: 선이 들어올 때 (rt: Top, rb: Bottom) */}
      <Handle type="target" position={Position.Top} id="rt" style={{ opacity: 0 }} />
      <Handle type="target" position={Position.Bottom} id="rb" style={{ opacity: 0 }} />
      <Handle type="target" position={Position.Left} id="rl" style={{ opacity: 0 }} />
      <Handle type="target" position={Position.Right} id="rr" style={{ opacity: 0 }} />

      <div style={headerStyle}>{data.label}</div>
      
      <div style={sectionStyle}>
        <div><strong>nodeId:</strong> {data.id} / <strong>targetId:</strong> {data.targetId || 'null'}</div>
        <hr style={hrStyle} />
        {/* 내가 내보낼 때 구멍(sourceHandle)과 내가 받을 때 구멍(targetHandle) 표시 */}
        <div><strong>Out(this):</strong> {data.sourceHandle || 'none'}</div>
        <div><strong>In(target):</strong> {data.targetHandle || 'none'}</div>
      </div>

      {/* Source 핸들: 선이 나갈 때 (st: Top, sb: Bottom) */}
      <Handle type="source" position={Position.Top} id="st" style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} id="sb" style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Left} id="sl" style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} id="sr" style={{ opacity: 0 }} />
    </div>
  );
};

const nodeTypes = { smart: SmartNode };

// 2. 평면 데이터 수정 (위치 관계에 맞춰 핸들 지정)
const dbData = [
  { 
    id: '1', label: '첫 번째 노드 (Root)', posX: 450, posY: 50, 
    targetId: null, animated: false, 
    sourceHandle: null, //나 출발방향
    targetHandle: null  //부모 받을곳 방향
  },
  { 
    id: '2', label: '두 번째 노드', posX: 150, posY: 250, 
    targetId: '1', animated: true, 
    sourceHandle: 'st', //나 출발방향
    targetHandle: 'rb'  //부모 받을곳 방향
  },
  { 
    id: '3', label: '세 번째 노드', posX: 450, posY: 250, 
    targetId: '1', animated: false, 
    sourceHandle: 'st', //나 출발방향
    targetHandle: 'rb'  //부모 받을곳 방향
  },
  { 
    id: '4', label: '네 번째 노드', posX: 250, posY: 50, 
    targetId: '2', animated: false, 
    sourceHandle: 'sb',//나 출발방향
    targetHandle: 'rt' //부모 받을곳 방향
  },
  { 
    id: '5', label: '다섯 번째 노드', posX: 50, posY: 50, 
    targetId: '4', animated: false, 
    sourceHandle: 'sr',//나 출발방향
    targetHandle: 'rl' //부모 받을곳 방향
  },
];

function TestFlow() {
  const { initialNodes, initialEdges } = useMemo(() => {
    const nodes = dbData.map((item) => ({
      id: item.id,
      type: 'smart',
      position: { x: item.posX, y: item.posY },
      data: { ...item }, 
    }));

    const edges = dbData
      .filter((item) => item.targetId)
      .map((item) => {

        //source : thisObj
        //target : parentObj
        return {
          id: `e${item.id}-${item.targetId}`,
          source: item.id,
          target: item.targetId,
          sourceHandle: item.sourceHandle,
          targetHandle:  item.targetHandle,
         
          animated: item.animated,
          style: { stroke: '#555', strokeWidth: 2 },
        };
      });

    return { initialNodes: nodes, initialEdges: edges };
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ width: '100%', height: '100vh', background: '#eef2f5' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodesDraggable={false}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        connectionMode="loose"
        
        defaultViewport={{ x: 0, y: 0, zoom: 1.5 }}
      >
        <Background variant="lines" color="#ddd" />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default TestFlow;