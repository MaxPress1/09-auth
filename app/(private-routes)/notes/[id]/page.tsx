
import NoteDetailsClient from "./NoteDetails.client";
import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { fetchNoteByIdServer } from "@/lib/api/serverApi";

type NoteDetailsProps = {
  params: Promise<{ noteId: string }>;
};

export async function generateMetadata({
  params,
}: NoteDetailsProps): Promise<Metadata> {
  const { noteId } = await params;
  const note = await fetchNoteByIdServer(noteId, (await cookies()).toString());
  return {
    title: `Notes: ${note.title || "Note"}`,
    description: note.content?.slice(0, 30) || "Note",
    openGraph: {
      title: `Notes: ${note.title || "Note"}`,
      description: note.content?.slice(0, 30) || "Note",
      url: `https://07-routing-nextjs-ochre.vercel.app/notes/${noteId}`,
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
  const { noteId } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: async () => await fetchNoteByIdServer(noteId, (await cookies()).toString()), 
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={noteId} />
    </HydrationBoundary>
  );
}
