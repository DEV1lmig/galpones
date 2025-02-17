import { fail, redirect, type Actions } from '@sveltejs/kit';
import { hash } from '@node-rs/argon2';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { generateSessionToken, createSession, setSessionTokenCookie } from '$lib/server/auth';
import { eq } from 'drizzle-orm';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase32LowerCase } from '@oslojs/encoding';

function validateUsername(username: unknown): username is string {
  return (
    typeof username === 'string' &&
    username.length >= 3 &&
    username.length <= 31 &&
    /^[a-z0-9_-]+$/.test(username)
  );
}

function validatePassword(password: unknown): password is string {
  return typeof password === 'string' && password.length >= 6 && password.length <= 255;
}

function generateUserId() {
  // Generate an ID with ~120 bits of entropy (similar to UUID v4)
  const bytes = crypto.getRandomValues(new Uint8Array(15));
  return encodeBase32LowerCase(bytes);
}

export const actions: Actions = {
  register: async (event) => {
    const formData = await event.request.formData();
    const username = formData.get('username');
    const password = formData.get('password');

    if (!username || !password) {
      return fail(400, { error: 'Username and password are required.' });
    }
    if (!validateUsername(username)) {
      return fail(400, { error: 'Invalid username.' });
    }
    if (!validatePassword(password)) {
      return fail(400, { error: 'Invalid password. Must be at least 6 characters.' });
    }

    const userId = generateUserId();
    const passwordHash = await hash(password.toString(), {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1
    });

    try {
      const existingUsers = await db
        .select()
        .from(table.user)
        .where(eq(table.user.username, username.toString()));
      if (existingUsers.length > 0) {
        return fail(400, { error: 'Username already taken.' });
      }

      await db.insert(table.user).values({ id: userId, username: username.toString(), passwordHash });

      const sessionToken = generateSessionToken();
      const session = await createSession(sessionToken, userId);
      setSessionTokenCookie(event, sessionToken, session.expiresAt);
    } catch (e) {
      console.error('Registration error:', e);
      return fail(500, { error: 'An error occurred during registration.' });
    }

    throw redirect(302, '/login');
  }
};
