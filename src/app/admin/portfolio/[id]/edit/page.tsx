import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { EditPortfolioForm } from "./EditPortfolioForm";

export default async function EditPortfolioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const portfolio = await prisma.portfolio.findUnique({
    where: { id }
  });

  if (!portfolio) {
    notFound();
  }

  return <EditPortfolioForm portfolio={portfolio} />;
}
