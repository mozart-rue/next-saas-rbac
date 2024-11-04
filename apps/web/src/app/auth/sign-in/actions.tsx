'use server';

import { signInWithPassword } from '@/http/sign-in-with-password';
import { HTTPError } from 'ky';
import { z } from 'zod';
import { cookies } from 'next/headers';

const signInSchema = z.object({
  email: z.string().email({ message: 'Please, provide a valid email' }),
  password: z.string().min(1, { message: 'Please, provide a password' }),
});

export async function signInWithEmailAndPassword(data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data));

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { success: false, message: null, errors };
  }

  const { email, password } = result.data;

  try {
    const { token } = await signInWithPassword({
      email: String(email),
      password: String(password),
    });

    const timeToExpireCookie = 60 * 60 * 24 * 7; // 7 days
    const cks = await cookies();
    cks.set('token', token, {
      path: '/',
      maxAge: timeToExpireCookie,
    });
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json();

      return { success: false, message, errors: null };
    }

    console.error(error);

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    };
  }

  return {
    success: true,
    message: null,
    errors: null,
  };
}
