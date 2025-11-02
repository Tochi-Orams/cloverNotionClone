import { getDb } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const db = await getDb();
  const items = await db.all("SELECT * FROM blocks");
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const { name, type, image_source, Content, width, height } = await req.json();
  const db = await getDb();
  await db.run(
    "INSERT INTO blocks (name, type, image_source, Content, width, height) VALUES (? ? ? ? ? ?)",
    [name, type, image_source, Content, width, height]
  );
  return NextResponse.json({ message: "Item added" });
}
