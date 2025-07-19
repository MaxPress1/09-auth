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

export interface NoteCreate {
  title: string;
  content?: string;
  tag: string;
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
  perPage = 12,
}: FetchNotesParams): Promise<NoteResponse> {
  const params: FetchNotesParams = { page, perPage };
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

export async function createNote(noteData: NoteCreate) {
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

export async function login(data: LoginRequest) {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

export async function register(data: AuthRequest) {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export async function getMe() {
  const res = await nextServer.get<User>("/users/me");
  return res.data;
};

export async function logOut() {
  try {
    await nextServer.post<ServerBoolResponse>("/auth/logout");
    return true;
  } catch {
    return false;
  }
};

export async function updateUser(username: string) {
  const res = await nextServer.patch<User>("/users/me", { username });
  return res.data;
};

export async function checkSession() {
  try {
    await nextServer.get("/auth/session");
    return true;
  } catch {
    return false;
  }
}