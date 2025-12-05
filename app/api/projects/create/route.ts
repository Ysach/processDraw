import { NextResponse } from 'next/server';
import { readJson, writeJson } from '@/lib/readJson';

export async function POST(req: Request) {
  const { name } = await req.json();

  const data = readJson();

  const newProject = {
    id: Date.now(),
    name,
    diagrams: []
  };

  data.push(newProject);
  writeJson(data);

  return NextResponse.json(newProject);
}
