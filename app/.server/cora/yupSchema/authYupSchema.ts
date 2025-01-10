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

import * as yup from 'yup';

const actionLinkSchema = yup.object({
  requestMethod: yup.string(),
  rel: yup.string(),
  url: yup.string().url(),
  accept: yup.string(),
  contentType: yup.string(),
});

export const authYupSchema = yup.object({
  data: yup
    .object({
      token: yup.string().required(),
      validForNoSeconds: yup.string().required(),
      // validUntil: yup.string().required(),
      // renewUntil: yup.string().required(),
      userId: yup.string().required(),
      loginId: yup.string(),
      lastName: yup.string(),
      firstName: yup.string(),
    })
    .required(),
  actionLinks: yup.object({
    delete: actionLinkSchema,
    // renew: actionLinkSchema,
  }),
});
