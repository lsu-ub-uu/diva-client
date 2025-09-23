/*
 * Copyright 2024 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 */

import { Form, redirect } from 'react-router';
import { destroySession, getAuth, getSession } from '@/auth/sessions.server';
import { deleteSession } from '@/data/deleteSession.server';

import type { Route } from '../auth/+types/logout';
import { Button } from '@/components/Button/Button';

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const auth = getAuth(session);
  const form = await request.formData();
  const returnTo = decodeURIComponent(form.get('returnTo')!.toString());
  if (auth) {
    try {
      await deleteSession(auth);
    } catch (error) {
      console.error('Failed to delete session', error);
    }
  }

  return redirect(returnTo ?? '/', {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  });
}

export async function loader({ request }: Route.LoaderArgs) {
  const returnTo = decodeURIComponent(
    new URL(request.url).searchParams.get('returnTo') || '',
  );
  return { returnTo };
}

export default function Logout({
  loaderData: { returnTo },
}: Route.ComponentProps) {
  return (
    <main>
      <h1>Logga ut</h1>
      <Form method='post'>
        <input type='hidden' name='returnTo' value={returnTo || '/'} />
        <Button size='large' variant='primary' type='submit'>
          Logga ut
        </Button>
      </Form>
    </main>
  );
}
