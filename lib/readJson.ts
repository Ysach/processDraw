import fs from 'fs';
import path from 'path';

export function readJson() {
  const filePath = path.join(process.cwd(), 'data.json');
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

export function writeJson(json: any) {
  const filePath = path.join(process.cwd(), 'data.json');
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
}
