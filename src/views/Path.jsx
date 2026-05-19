import React from 'react';
import AppSourceCode from '@/App.jsx?raw';
import MainLayoutSourceCode from '@/layout/MainLayout.jsx?raw';
import SideLayoutSourceCode from '@/layout/SideLayout.jsx?raw';
import TopLayoutSourceCode from '@/layout/TopLayout.jsx?raw';
import CommonContextSourceCode from '@/context/CommonContext.jsx?raw';
import commJsSourceCode from '@/js/comm.js?raw';
import useAuthStoreSourceCode from '@/js/auth/useAuthStore.js?raw';
import CustomAlertSourceCode from '@/components/Modal/CustomAlert.jsx?raw';
import ModalLayoutSourceCode from '@/components/Modal/ModalLayout.jsx?raw';
import postApiSourceCode from '@/features/post/postApi.js?raw';
import postSliceSourceCode from '@/features/post/postSlice.js?raw';
import mainSourceCode from '@/main.jsx?raw';
import postSagaSourceCode from '@/sagas/postSaga.js?raw';
import rootSagaSourceCode from '@/sagas/rootSaga.js?raw';
import rootReducerSourceCode from '@/store/rootReducer.js?raw';
import storeSourceCode from '@/store/store.js?raw';

function Path() {
  const sourceCodeObj = { 
    'App.jsx': AppSourceCode,
    'MainLayout.jsx': MainLayoutSourceCode,
    'SideLayout.jsx': SideLayoutSourceCode,
    'TopLayout.jsx': TopLayoutSourceCode,
    'CommonContext.jsx': CommonContextSourceCode,
    'comm.js': commJsSourceCode,
    'useAuthStore.js': useAuthStoreSourceCode,
    'CustomAlert.jsx': CustomAlertSourceCode,
    'ModalLayout.jsx': ModalLayoutSourceCode,
    'postApi.js': postApiSourceCode,
    'postSlice.js': postSliceSourceCode,
    'main.jsx': mainSourceCode,
    'postSaga.js': postSagaSourceCode,
    'rootSaga.js': rootSagaSourceCode,
    'rootReducer.js': rootReducerSourceCode,
    'store.js': storeSourceCode
  };

  const modules = import.meta.glob('/src/**/*');
  const originalPaths = Object.keys(modules);

  //경로 배열을 계층형 트리 객체로 변환
  const buildTree = (paths) => {
    const root = { name: 'src', children: {}, isFile: false };

    paths.forEach((path) => {
      const cleanPath = path.startsWith('/') ? path.slice(1) : path;
      const parts = cleanPath.split('/').filter(Boolean);
      
      let current = root;
      const startIndex = parts[0] === 'src' ? 1 : 0;

      for (let i = startIndex; i < parts.length; i++) {
        const part = parts[i];
        const isFile = i === parts.length - 1;
        
        if (!current.children[part]) {
          current.children[part] = {
            name: part,
            children: {},
            isFile: isFile,
            fullPath: path
          };
        }
        current = current.children[part];
      }
    });
    return root;
  };

  //트리 객체를 순회하며 화면을 그리는 재귀 함수
  const renderTree = (node, prefix = '', isLast = true, isRoot = true) => {
    if (isRoot) {
      const childKeys = Object.keys(node.children);
      return (
        <div key="root">
          <div style={{ color: '#ffffff', height: '24px', display: 'flex', alignItems: 'center' }}>src</div>
          {childKeys.map((key, index) => 
            renderTree(node.children[key], '', index === childKeys.length - 1, false)
          )}
        </div>
      );
    }

    //트리구조 문자열 
    const currentPrefix = isLast ? '└── ' : '├── ';
    const nextPrefix = prefix + (isLast ? '    ' : '│   ');

    let matchedKey = null;
    let codeContent = null;

    if (node.isFile) {
      for (const key in sourceCodeObj) {
        if (node.fullPath.includes(key)) {
          matchedKey = key;
          codeContent = sourceCodeObj[key];
          break;
        }
      }
    }

    const childKeys = Object.keys(node.children);

    const rowStyle = {
      display: 'flex',
      alignItems: 'center',
      height: '24px', 
      color: '#ffffff'
    };

    const prefixStyle = {
      color: '#888',
      whiteSpace: 'pre',
      display: 'inline-block'
    };

    return (
      <div key={node.fullPath || node.name}>
        {node.isFile ? (
          // [파일인 경우]
          matchedKey ? (
            //소스코드 매칭 파일 (details 구조)
            <details style={{ display: 'block' }}>
              <summary style={{ ...rowStyle, color: 'skyblue', cursor: 'pointer', listStyle: 'none' }}>
                <span style={prefixStyle}>{prefix}{currentPrefix}</span>
                <span>{node.name}</span>
              </summary>
              <pre style={{
                backgroundColor: '#282c34',
                padding: '15px',
                borderRadius: '4px',
                marginTop: '4px',
                marginBottom: '4px',
                marginLeft: `${(prefix + currentPrefix).length * 8.4}px`, 
                color: '#abb2bf',
                overflowX: 'auto',
                fontSize: '14px',
                lineHeight: '1.8',
                border: '1px solid #3e4451',
                cursor: 'default'
              }} onClick={(e) => e.stopPropagation()}>
                {codeContent}
              </pre>
            </details>
          ) : (
            // 일반 파일
            <div style={rowStyle}>
              <span style={prefixStyle}>{prefix}{currentPrefix}</span>
              {node.name}
            </div>
          )
        ) : (
          // [폴더인 경우]
          <div>
            <div style={rowStyle}>
              <span style={prefixStyle}>{prefix}{currentPrefix}</span>
              {node.name}
            </div>
            {childKeys.map((key, index) => 
              renderTree(node.children[key], nextPrefix, index === childKeys.length - 1, false)
            )}
          </div>
        )}
      </div>
    );
  };

  const treeRootData = buildTree(originalPaths);

  return (
    <div style={{ padding: '20px', backgroundColor: '#1e1e1e', color: '#fff', minHeight: '100vh' }}>
      <h2>React-Sample Tree 구조(주요 설정 관련만 링크)</h2>
      
      <style>{`
        summary::-webkit-details-marker,
        summary::marker {
          display: none;
        }
        summary {
          outline: none;
        }
      `}</style>

      <div style={{ fontFamily: 'monospace', lineHeight: '1', fontSize: '14px', marginTop: '20px' }}>
        {renderTree(treeRootData)}
      </div>
    </div>
  );
}

export default Path;