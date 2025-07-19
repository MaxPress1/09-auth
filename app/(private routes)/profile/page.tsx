import Link from 'next/link';
import css from './ProfilePage.module.css';
import Image from "next/image";
import { getUserFromServer } from "@/lib/api/serverApi";
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Profile Page`,
    description: "Here is the profile page",
    openGraph: {
      title: `Profile Page`,
      description: "Here is the profile page",
      url: `https://07-routing-nextjs-ochre.vercel.app/profile`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `Profile Page`,
      description: "Here is the profile page",
      images: ["https://ac.goit.global/fullstack/react/og-meta.jpg"],
    },
  };
}


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