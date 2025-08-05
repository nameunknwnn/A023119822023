import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function generateShortUrl(length = 6) {
  return Math.random().toString(36).substring(2, 2 + length);
}

export async function POST(req: NextRequest) {
  const { url } = await req.json();
  const shortUrl = generateShortUrl();

  const existing = await prisma.shortUrl.findUnique({
    where: {
      longUrl: url,
    },
  });
  if (existing) {
    return NextResponse.json({ success: false, message: "Short url already exists",data: existing });
  }

  const created = await prisma.shortUrl.create({
    data: {
      longUrl: url,
      shortUrl: shortUrl,
    },
  });

  return NextResponse.json({ success: true, data: created });
}
