import { db } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get("page") || "1"));
  const size = searchParams.get("size") || "10";
  const skip = (Number(page) - 1) * Number(size);

  const list = await db.spendMonth.findMany({
    skip: skip,
    take: Number(size),
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalCount = await db.spendMonth.count();

  return Response.json({
    data: list,
    pagination: {
      total: totalCount,
      page: Number(page),
      size: Number(size),
      totalPages: Math.ceil(totalCount / Number(size)),
    },
  });
}

export async function POST(request: Request) {
  const data = await request.json();

  // Assuming you have a bank model in your Prisma schema
  const newBank = await db.spendMonth.create({
    data: {
      month: data.month,
      year: data.year,
      date: data.date,
      total: data.total,
      description: data.description,
      tietkiem: data.total,
      color: data.color, // Default color if not provided
    },
  });

  return Response.json({
    message: "Spend created successfully",
    data: newBank,
  });
}
