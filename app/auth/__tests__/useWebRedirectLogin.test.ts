import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import {
    logInWithWebRedirect,
    useWebRedirectLogin,
} from '../useWebRedirectLogin';
import { useFetcher } from 'react-router';
import { messageIsFromWindowOpenedFromHere } from '@/components/Layout/Header/Login/utils/utils';

vi.mock('react-router', () => ({
    useFetcher: vi.fn(),
}));

vi.mock('@/components/Layout/Header/Login/utils/utils', () => ({
    messageIsFromWindowOpenedFromHere: vi.fn(),
}));

const TestComponent = ({ returnTo }: { returnTo: string }) => {
    useWebRedirectLogin({ returnTo });
    return React.createElement('div', null, 'test');
};

describe('useWebRedirectLogin', () => {
    const submitSpy = vi.fn();

    beforeEach(() => {
        submitSpy.mockReset();
        vi.mocked(useFetcher).mockReturnValue({
            submit: submitSpy,
        } as unknown as ReturnType<typeof useFetcher>);
    });

    it('submits login payload when receiving a valid authentication message', () => {
        vi.mocked(messageIsFromWindowOpenedFromHere).mockReturnValue(true);

        render(React.createElement(TestComponent, { returnTo: '/records/123' }));

        window.dispatchEvent(
            new MessageEvent('message', {
                data: { authentication: { token: 'abc' }, extra: 'value' },
            }),
        );

        expect(submitSpy).toHaveBeenCalledWith(
            {
                loginType: 'webRedirect',
                auth: JSON.stringify({ authentication: { token: 'abc' }, extra: 'value' }),
                returnTo: '/records/123',
            },
            { action: '/login', method: 'post' },
        );
    });

    it('does not submit when message is not from opened window', () => {
        vi.mocked(messageIsFromWindowOpenedFromHere).mockReturnValue(false);

        render(React.createElement(TestComponent, { returnTo: '/' }));

        window.dispatchEvent(
            new MessageEvent('message', {
                data: { authentication: { token: 'abc' } },
            }),
        );

        expect(submitSpy).not.toHaveBeenCalled();
    });

    it('does not submit when authentication data is missing', () => {
        vi.mocked(messageIsFromWindowOpenedFromHere).mockReturnValue(true);

        render(React.createElement(TestComponent, { returnTo: '/' }));

        window.dispatchEvent(
            new MessageEvent('message', {
                data: { notAuthentication: true },
            }),
        );

        expect(submitSpy).not.toHaveBeenCalled();
    });

    it('registers and unregisters message listener on mount and unmount', () => {
        const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
        const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

        const { unmount } = render(React.createElement(TestComponent, { returnTo: '/' }));

        expect(addEventListenerSpy).toHaveBeenCalledWith(
            'message',
            expect.any(Function),
        );

        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            'message',
            expect.any(Function),
        );
    });
});

describe('logInWithWebRedirect', () => {
    it('opens devLogin in development mode', () => {
        vi.stubEnv('MODE', 'development');

        logInWithWebRedirect('https://example.com/login');

        expect(window.open).toHaveBeenCalledWith('/devLogin');
    });

    it('opens provided URL in non-development mode', () => {
        vi.stubEnv('MODE', 'test');

        logInWithWebRedirect('https://example.com/login');

        expect(window.open).toHaveBeenCalledWith('https://example.com/login');
    });
});
