import Link from 'next/link';
import css from './ProfilePage.module.css';
import Image from "next/image";
import { getUserFromServer } from "@/lib/api/serverApi";

export default async function Profile() {
    const user = await getUserFromServer();

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
            src={user?.avatar || "/default-avatar.png"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username}</p>
          <p>Email: {user?.email}</p>
        </div>
      </div>  
    </main>
  );
}