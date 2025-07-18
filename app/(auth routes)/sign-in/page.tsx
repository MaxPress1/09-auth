"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import css from './SignInPage.module.css';
import { LoginRequest } from '../../../types/user';
import { login } from '../../../lib/api/clientApi';
import { useAuthStore } from '../../../lib/store/authStore';

export default function SignInPage() {

    const router = useRouter();
    const setUser = useAuthStore((state) => state.setUser);
    const [error, setError] = useState("");
    const handleSubmit = async (formData: FormData) => {
        try {
            const formValues = Object.fromEntries(formData) as LoginRequest;
            const res = await login(formValues);
            if (res) {
                setUser(res);
                router.replace("/profile");
            }
        } catch (error) {
            console.log(error);
            setError("Invalid email or password");
        }
    }
  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        <p className={css.error}>{error}</p>
      </form>
      {error && <p className={css.error}>{error}</p>}
    </main>
  );
}