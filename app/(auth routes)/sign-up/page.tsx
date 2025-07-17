  "use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import css from './SignUpPage.module.css';
import { AuthRequest } from '../../../types/user';
import { register } from '../../../lib/api/clientApi';
import { useAuth } from '../../../lib/store/authStore';

export default function SignUpPage() {

    const router = useRouter();
  const [error, setError] = useState("");

  const setUser = useAuth(state => state.setUser);
  
    const handleSubmit = async (formData: FormData) => {
        try {
          const formValues = Object.fromEntries(formData) as AuthRequest;
          console.log(formValues);
          const res = await register(formValues);
          if (res) {
            setUser(res.data);
            router.push("/profile");
          }
        } catch (error) {
          console.log(error);
          setError("Invalid email or password");
        }
    }
  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
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
            Register
          </button>
        </div>

        <p className={css.error}>Error</p>
          </form>
      {error && <p className={css.error}>{error}</p>}
    </main>
  );
}