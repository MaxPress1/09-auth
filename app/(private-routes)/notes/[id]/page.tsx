import { fetchNoteById } from "../../../../lib/api/clientApi";
import NoteDetailsClient from "./NoteDetails.client";
import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type NoteDetailsProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: NoteDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(Number(id));
  return {
    title: `Notes: ${note.title || "Note"}`,
    description: note.content?.slice(0, 30) || "Note",
    openGraph: {
      title: `Notes: ${note.title || "Note"}`,
      description: note.content?.slice(0, 30) || "Note",
      url: `https://07-routing-nextjs-ochre.vercel.app/notes/${id}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `Notes: ${note.title || "Note"}`,
      description: note.content?.slice(0, 30) || "Note",
      images: ["https://ac.goit.global/fullstack/react/og-meta.jpg"],
    },
  };
}

export default async function NoteDetails({ params }: NoteDetailsProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(Number(id)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
