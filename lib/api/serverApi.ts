
import { type Note } from "../../types/note";
import { cookies } from "next/headers";
import nextServer from "./api";
import { User } from "@/types/user";

export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}

export async function fetchNotesServer({
  page = 1,
  search,
  tag,
}: FetchNotesParams): Promise<NoteResponse> {
  const params: FetchNotesParams = { page, perPage: 12 };
  if (search) params.search = search;
  if (tag) params.tag = tag;
  const cookieStore = await cookies();
  const res = await nextServer.get<NoteResponse>("/notes", {
    params,
    headers: {
      Accept: "application/json",
      Cookie: cookieStore.toString(),
    },
  });

  return {
    notes: res.data.notes ?? [],
    totalPages: res.data.totalPages ?? 1,
  };
}

export async function createNoteServer(
  noteData: {
    title: string;
    content?: string;
    tag: string;
  }
) {
  const cookieStore = await cookies();
  const res = await nextServer.post<Note>("/notes/", noteData, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
}

export async function deleteNoteServer(id: string) {
  const cookieStore = await cookies();
  const res = await nextServer.delete<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
}

export async function fetchNoteByIdServer(id: string) {
  const cookieStore = await cookies();
  const res = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {  
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
}

export async function checkServerSession() { 
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};

export async function getUserFromServer(): Promise<User> {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },  
  });
  return data;
};
