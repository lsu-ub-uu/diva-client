/*
 * Copyright 2026 Uppsala University Library
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

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { uploadFile } from '../uploadFile';

let xhrInstance: XMLHttpRequest;

beforeEach(() => {
  vi.spyOn(XMLHttpRequest.prototype, 'open').mockImplementation(function (
    this: XMLHttpRequest,
  ) {
    xhrInstance = this;
  });
  vi.spyOn(XMLHttpRequest.prototype, 'send').mockImplementation(function (
    this: XMLHttpRequest,
  ) {
    xhrInstance = this;
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

const fireLoad = (status: number) => {
  Object.defineProperty(xhrInstance, 'status', { value: status });
  xhrInstance.dispatchEvent(new Event('load'));
};

const fireError = () => {
  xhrInstance.dispatchEvent(new Event('error'));
};

const fireUploadProgress = (loaded: number, total: number) => {
  xhrInstance.upload.dispatchEvent(
    new ProgressEvent('progress', { loaded, total }),
  );
};

describe('uploadFile', () => {
  it('sends a POST request with FormData', async () => {
    const formData = new FormData();
    const promise = uploadFile('/upload', formData);

    expect(XMLHttpRequest.prototype.open).toHaveBeenCalledWith(
      'POST',
      '/upload',
    );
    expect(XMLHttpRequest.prototype.send).toHaveBeenCalledWith(formData);

    fireLoad(200);
    await promise;
  });

  it('resolves on successful response', async () => {
    const promise = uploadFile('/upload', new FormData());

    fireLoad(201);

    await expect(promise).resolves.toBeUndefined();
  });

  it('rejects on non-2xx response', async () => {
    const promise = uploadFile('/upload', new FormData());

    fireLoad(500);

    await expect(promise).rejects.toThrow('Upload failed with status 500');
  });

  it('rejects on network error', async () => {
    const promise = uploadFile('/upload', new FormData());

    fireError();

    await expect(promise).rejects.toThrow(
      'Upload failed due to a network error',
    );
  });

  it('reports upload progress', async () => {
    const onProgress = vi.fn();
    const promise = uploadFile('/upload', new FormData(), onProgress);

    fireUploadProgress(50, 100);
    expect(onProgress).toHaveBeenCalledWith({ loaded: 50, total: 100 });

    fireUploadProgress(100, 100);
    expect(onProgress).toHaveBeenCalledWith({ loaded: 100, total: 100 });

    fireLoad(200);
    await promise;
  });

  it('does not call progress callback when none provided', async () => {
    const onProgress = vi.fn();
    const promise = uploadFile('/upload', new FormData());

    fireUploadProgress(50, 100);
    expect(onProgress).not.toHaveBeenCalled();

    fireLoad(200);
    await promise;
  });
});
