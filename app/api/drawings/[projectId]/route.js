import { NextResponse } from 'next/server';
import fs from "fs";
import path from "path";

export async function GET(req, { params }) {
  try {
    const projectId = params.projectId;

    const filePath = path.join(process.cwd(), "data", "drawings", `${projectId}.json`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ elements: [], appState: {} });
    }

    const data = fs.readFileSync(filePath, "utf8");
    return NextResponse.json(JSON.parse(data));
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  try {
    const projectId = params.projectId;
    const body = await req.json();

    const filePath = path.join(process.cwd(), "data", "drawings", `${projectId}.json`);

    fs.writeFileSync(filePath, JSON.stringify(body, null, 2), "utf8");

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
