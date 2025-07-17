"use client";

import Link from 'next/link';
import css from './ProfilePage.module.css';
import { useAuth } from '../../../lib/store/authStore';
import Image from "next/image";

export default function Profile() {
  const { user } = useAuth();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user?.photoUrl || ""}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.userName}</p>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </main>
  );
}