import type { Dependencies } from '@/cora/bffTypes.server';
import { createTextDefinition } from '@/data/textDefinition/textDefinition.server';
import { userPreferencesCookie } from '@/userPreferences/userPreferencesCookie.server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/data/textDefinition/textDefinition.server', () => ({
    createTextDefinition: vi.fn(),
}));

const { initMock, useMock, createInstanceMock } = vi.hoisted(() => ({
    initMock: vi.fn(),
    useMock: vi.fn(),
    createInstanceMock: vi.fn(),
}));

vi.mock('i18next', () => ({
    createInstance: createInstanceMock,
}));

import { clearI18nCache, createi18nInstance } from 'server/i18n';

describe('createi18nInstance', () => {
    const dependencies = {} as Dependencies;

    beforeEach(() => {
        clearI18nCache();
        vi.clearAllMocks();

        initMock.mockReset().mockResolvedValue(undefined);
        useMock.mockReset();
        createInstanceMock.mockReset();

        createInstanceMock.mockImplementation(() => ({
            use: useMock,
            init: initMock,
        }));

        useMock.mockImplementation(() => ({
            use: useMock,
            init: initMock,
        }));

        vi.mocked(createTextDefinition).mockReturnValue({
            someText: 'someValue',
        });
    });

    it('creates and caches an instance for the locale from user preferences', async () => {
        const cookie = await userPreferencesCookie.serialize({ language: 'en' });
        const request = {
            headers: { cookie },
        } as never;

        const instance = await createi18nInstance(request, dependencies);
        const cachedInstance = await createi18nInstance(request, dependencies);

        expect(instance).toBe(cachedInstance);
        expect(createInstanceMock).toHaveBeenCalledTimes(1);
        expect(createTextDefinition).toHaveBeenCalledWith(dependencies, 'en');
        expect(initMock).toHaveBeenCalledWith(
            expect.objectContaining({
                lng: 'en',
                resources: {
                    en: {
                        translation: {
                            someText: 'someValue',
                        },
                    },
                },
            }),
        );
    });

    it('falls back to sv when no user preferences cookie exists', async () => {
        const request = {
            headers: {},
        } as never;

        await createi18nInstance(request, dependencies);

        expect(createTextDefinition).toHaveBeenCalledWith(dependencies, 'sv');
        expect(initMock).toHaveBeenCalledWith(
            expect.objectContaining({
                lng: 'sv',
            }),
        );
    });

    it('skips translation resources for cimode', async () => {
        const cookie = await userPreferencesCookie.serialize({ language: 'cimode' });
        const request = {
            headers: { cookie },
        } as never;

        await createi18nInstance(request, dependencies);

        expect(createTextDefinition).not.toHaveBeenCalled();
        expect(initMock).toHaveBeenCalledWith(
            expect.objectContaining({
                lng: 'cimode',
                resources: {},
            }),
        );
    });

    it('creates a new instance after clearing the cache', async () => {
        const cookie = await userPreferencesCookie.serialize({ language: 'en' });
        const request = {
            headers: { cookie },
        } as never;

        const firstInstance = await createi18nInstance(request, dependencies);

        clearI18nCache();

        const secondInstance = await createi18nInstance(request, dependencies);

        expect(firstInstance).not.toBe(secondInstance);
        expect(createInstanceMock).toHaveBeenCalledTimes(2);
    });
});
