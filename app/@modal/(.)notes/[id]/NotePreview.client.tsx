"use client";
import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "../../../../lib/api/clientApi";
import css from "./NotePreview.module.css";

interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({  
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(Number(id)),
    refetchOnMount: false,
  });
  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <Modal onClose={handleGoBack}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <button className={css.backBtn} onClick={handleGoBack}>
              Back
            </button>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
          <p className={css.content}> {note.tag}</p>
        </div>
      </div>
    </Modal>
  );
}
