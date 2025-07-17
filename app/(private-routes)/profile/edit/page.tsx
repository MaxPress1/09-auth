"use client";

import css from "./EditProfilePage.module.css";
    import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMe, updateUser } from "../../../../lib/api/clientApi";
import Image from "next/image";

export default function EditProfilePage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const user = await getMe();
        setUsername(user.userName || "");
        setEmail(user.email);
        setAvatar(user.photoUrl || "/default-avatar.png");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {   
      await updateUser(username);
      router.replace("/profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  if (loading) {
    return <main className={css.mainContent}><div>Завантаження...</div></main>;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <Image
          src={avatar || "/default-avatar.png"}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />
        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={e => setUsername(e.target.value)}
              disabled={saving}
            />
          </div>
          <p>Email: {email}</p>
          <div className={css.actions}>
            <button type="submit" className={css.saveButton} disabled={saving}>
              Save
            </button>
            <button type="button" className={css.cancelButton} onClick={handleCancel} disabled={saving}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}