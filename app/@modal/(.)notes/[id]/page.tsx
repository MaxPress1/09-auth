import {   fetchNoteByIdServer } from "../../../../lib/api/serverApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotePreviewClient from "./NotePreview.client";
import { cookies } from "next/headers";

type NoteDetailsProps = {
  params: Promise<{ id: string }>;
};

export default async function NotePreview({ params }: NoteDetailsProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: async () => fetchNoteByIdServer(id, (await cookies()).toString()),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient id={id} />
    </HydrationBoundary>
  );
}
