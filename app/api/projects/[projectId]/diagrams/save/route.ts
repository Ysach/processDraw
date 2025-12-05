import { NextResponse } from 'next/server';
import { readJson, writeJson } from '@/lib/readJson';

export async function POST(req: Request, { params }) {
  const { projectId } = params;
  const body = await req.json();

  const { id, name, content } = body;

  const data = readJson();
  const project = data.find((p: any) => p.id == projectId);
  if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

  const diagram = project.diagrams.find((d: any) => d.id == id);
  if (!diagram) return NextResponse.json({ error: 'Diagram not found' }, { status: 404 });

  diagram.name = name ?? diagram.name;
  diagram.content = content ?? diagram.content;
  diagram.updatedAt = new Date().toISOString();

  writeJson(data);

  return NextResponse.json({ success: true, diagram });
}
