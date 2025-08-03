import { db } from "@/lib/prisma";

export async function POST(request: Request) {
  const data = await request.json();

  // Assuming you have a bank model in your Prisma schema
  const newBank = await db.expense.create({
    data: {
      amount: data.amount,
      description: data.description,
      date: new Date(data.date),
      bankId: data.bank.id,
      categoryId: data.category.id,
      spendMonthId: data.spendMonthId,
      isAdd: data.isAdd, // Assuming isAdd is a boolean field in your Expense model
    },
  });

  return Response.json({ message: "Bank created successfully", data: newBank });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get("page") || "1"));
  const size = searchParams.get("size") || "10";
  const skip = (Number(page) - 1) * Number(size);

  const list = await db.expense.findMany({
    skip: skip,
    take: Number(size),
    orderBy: {
      createdAt: "desc",
    },
    include: {
      bank: true,
      category: true,
      spendMonth: true,
    },
  });

  const totalCount = await db.expense.count();

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
