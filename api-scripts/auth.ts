/*
 * Copyright 2025 Uppsala University Library
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

export default async function login() {
  const res = await fetch(
    'https://cora.epc.ub.uu.se/diva/login/rest/apptoken',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.cora.login',
        Accept: 'application/vnd.cora.authentication+json',
      },
      body: `divaAdmin@cora.epc.ub.uu.se\n49ce00fb-68b5-4089-a5f7-1c225d3cf156`,
    },
  );

  const auth = await res.json();

  console.info('Successfully logged in');

  return {
    token: auth.authentication.data.children.find(
      (child: any) => child.name === 'token',
    ).value,
    logout: async () => {
      await fetch(auth.authentication.actionLinks.delete.url, {
        method: 'DELETE',
      });
      console.info('Successfully logged out');
    },
  };
}
