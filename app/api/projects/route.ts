import { NextResponse } from 'next/server';
import { readJson } from '@/lib/readJson';

export async function GET() {
  const data = readJson();
  return NextResponse.json(data);
}
