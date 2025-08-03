import { db } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const existing = await db.spendMonth.findUnique({
    where: { id },
  });

  if (!existing) {
    return Response.json({ message: "Category not found" }, { status: 404 });
  }

  return Response.json({
    data: existing,
    message: "Category retrieved successfully",
  });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await request.json();

  const existing = await db.spendMonth.findUnique({
    where: { id },
  });

  if (!existing) {
    return Response.json({ message: "Category not found" }, { status: 404 });
  }

  const updatedCategory = await db.spendMonth.update({
    where: { id },
    data: data,
  });

  return Response.json({
    message: "spendMonth updated successfully",
    data: updatedCategory,
  });
}
