'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// 动态引入 Excalidraw（避免 SSR）
const Excalidraw = dynamic(
  () => import('@excalidraw/excalidraw').then((mod) => mod.Excalidraw),
  { ssr: false }
);

export default function DiagramDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { projectId, diagramId } = params;

  const [initialData, setInitialData] = useState({ elements: [], appState: {} });
  const [loading, setLoading] = useState(true);
  const excalidrawAPIRef = useRef(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/projects/${projectId}/diagrams/${diagramId}`);
        if (!res.ok) {
          console.error('加载失败', await res.text());
          setLoading(false);
          return;
        }
        const json = await res.json();

        // json.content 里可能直接是 Excalidraw 的 initialData (elements/appState)
        // 或者是你之前存的自定义结构（例如 { elements: [...], appState: {...} }）
        let data = { elements: [], appState: {} };

        if (json.content) {
          // 如果 content 是对象且含 elements，直接用
          if (json.content.elements) {
            data = {
              elements: json.content.elements || [],
              appState: json.content.appState || {}
            };
          } else {
            // 如果 content 本身就是 elements 数组
            if (Array.isArray(json.content)) {
              data.elements = json.content;
            } else {
              // fallback：把 content 放到 elements 中（你可根据实际格式调整）
              data = json.content;
            }
          }
        } else {
          // 兼容 diagram 对象直接有 elements/appState 字段
          if (json.elements) data.elements = json.elements;
          if (json.appState) data.appState = json.appState;
        }

        setInitialData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [projectId, diagramId]);

  // 自动保存示例（防抖可在外层实现）
  const handleChange = async (elements, state) => {
    try {
      await fetch(`/api/drawings/${projectId}`, { // 或你的 save API 路径：/api/projects/${projectId}/diagrams/save
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ elements, appState: state }),
      });
    } catch (err) {
      console.error('保存失败', err);
    }
  };

  if (loading) return <div style={{ padding: 16 }}>加载中...</div>;

  return (
    <div style={{ width: '100%', height: 'calc(100vh - 64px)' }}>
      <div style={{ padding: 8, display: 'flex', gap: 8, alignItems: 'center' }}>
        <button onClick={() => router.back()} className="px-3 py-1 rounded border">返回</button>
        <div>项目：{projectId} - 图：{diagramId}</div>
      </div>

      <Excalidraw
        initialData={initialData}
        onChange={(elements, state) => handleChange(elements, state)}
        excalidrawAPI={(api) => (excalidrawAPIRef.current = api)}
      />
    </div>
  );
}
