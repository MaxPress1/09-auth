import { type Note } from "../../types/note";
import {
  AuthRequest,
  LoginRequest,
  ServerBoolResponse,
  User,
} from "../../types/user";
import nextServer from "./api";

export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}

export async function fetchNotes({
  page = 1,
  search,
  tag,
}: FetchNotesParams): Promise<NoteResponse> {
  const params: FetchNotesParams = { page, perPage: 12 };
  if (search) params.search = search;
  if (tag) params.tag = tag;
  const res = await nextServer.get<NoteResponse>("/notes", {
    params,
  });

  return {
    notes: res.data.notes ?? [],
    totalPages: res.data.totalPages ?? 1,
  };
}

export async function createNote(noteData: {
  title: string;
  content?: string;
  tag: string;
}) {
  const res = await nextServer.post<Note>("/notes/", noteData);
  return res.data;
}

export async function deleteNote(id: string) {
  const res = await nextServer.delete<Note>(`/notes/${id}`);
  return res.data;
}

export async function fetchNoteById(id: string) {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
}

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

export const register = async (data: AuthRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res;
};

export const getMe = async () => {
  const res = await nextServer.get<User>("/users/me");
  return res.data;
};

export const logOut = async () => {
  await nextServer.post<ServerBoolResponse>("/auth/logout");
};

export const updateUser = async (username: string) => {
  const res = await nextServer.patch<User>("/users/me", { username });
  return res.data;
};

export const checkSession = async () => {
  await nextServer.get("/auth/session");
};