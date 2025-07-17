import api from "./api";
import { type Note } from "../../types/note";
import { cookies } from "next/headers";
import nextServer from "./api";
import { ServerBoolResponse } from "../../types/user";

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

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export async function fetchNotesServer({
  page = 1,
  search,
  tag,
  cookies,
}: FetchNotesParams & { cookies: string }): Promise<NoteResponse> {
  const params: FetchNotesParams = { page, perPage: 12 };
  if (search) params.search = search;
  if (tag) params.tag = tag;
  const res = await api.get<NoteResponse>("/notes", {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      Cookie: cookies,
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
  },
  cookies: string
) {
  const res = await api.post<Note>("/notes/", noteData, {
    headers: {
      Authorization: `Bearer ${token}`,
      Cookie: cookies,
    },
  });
  return res.data;
}

export async function deleteNoteServer(id: number, cookies: string) {
  const res = await api.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Cookie: cookies,
    },
  });
  return res.data;
}

export async function fetchNoteByIdServer(id: number, cookies: string) {
  const res = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Cookie: cookies,
    },
  });
  return res.data;
}

export const checkSession = async () => {
  const cookieData = await cookies();
  const response = await nextServer<ServerBoolResponse>(`/auth/session`, {
    headers: { Cookie: cookieData.toString() },
  });
  return response;
};