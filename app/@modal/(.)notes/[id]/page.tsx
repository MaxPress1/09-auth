import NotePreviewClient from "./NotePreview.client";

type NoteDetailsProps = {
  params: Promise<{ id: string }>;
};

export default async function NotePreview({ params }: NoteDetailsProps) {
  const { id } = await params;

  return <NotePreviewClient id={id} />;
}
