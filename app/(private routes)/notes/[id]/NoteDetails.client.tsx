"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "../../../../lib/api/clientApi";
import css from "./NoteDetails.page.module.css";

interface NoteDetailsClientProps {
  noteId: string;
}

export default function  NoteDetailsClient ({ noteId }: NoteDetailsClientProps) {
  const router = useRouter();
  const {
    data: item,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });
  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !item) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{item.title}</h2>
          <button className={css.backBtn} onClick={() => router.back()}>
            Edit note
          </button>
        </div>
        <p className={css.content}>{item.content}</p>
        <p className={css.date}>{item.createdAt}</p>
      </div>
    </div>
  );
}
