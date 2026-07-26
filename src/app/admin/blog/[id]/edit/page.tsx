import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { EditBlogForm } from "./EditBlogForm";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.blog.findUnique({
    where: { id }
  });

  if (!post) {
    notFound();
  }

  return <EditBlogForm post={post} />;
}
