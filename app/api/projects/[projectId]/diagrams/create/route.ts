import { NextResponse } from 'next/server';
import { readJson, writeJson } from '@/lib/readJson';

export async function POST(req: Request, { params }) {
  const { projectId } = params;
  const { name, content } = await req.json();

  const data = readJson();
  const project = data.find((p: any) => p.id == projectId);

  if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

  const diagram = {
    id: Date.now(),
    name,
    createdAt: new Date().toISOString(),
    content: content ?? '{}'
  };

  project.diagrams.push(diagram);
  writeJson(data);

  return NextResponse.json(diagram);
}
