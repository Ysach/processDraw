import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// 读取单个图表的详细内容
function readDiagramContent(projectId, diagramId) {
  const file = path.join(process.cwd(), `/data/drawings/${projectId}/${diagramId}.json`);
  console.log("diagram file: ", file);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  return JSON.parse(raw);
}

export async function GET(req, { params }) {
  try {
    const { projectId, diagramId } = await params;

    // 读取图表详细内容
    const diagramContent = readDiagramContent(projectId, diagramId);
    
    if (!diagramContent) {
      return NextResponse.json({ error: 'Diagram not found' }, { status: 404 });
    }
    
    // 使用图表内容作为响应，因为它已经包含了项目信息
    const diagram = diagramContent;
    
    // diagram.content 可能是字符串 (JSON) 或已是对象，处理一下
    let content;
    try {
      content = typeof diagram.content === 'string' ? JSON.parse(diagram.content) : diagram.content;
    } catch (err) {
      // 如果解析失败，就把它当原始字符串
      content = diagram.content;
    }

    return NextResponse.json({ ...diagram, content });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}
