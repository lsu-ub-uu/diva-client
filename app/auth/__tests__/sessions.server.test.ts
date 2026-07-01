import { describe, expect, it } from 'vitest';
import type { Auth } from '../Auth';
import {
    commitSession,
    getAuth,
    getSession,
    getSessionFromCookie,
    requireAuth
} from '../sessions.server';

describe('sessions.server', () => {
    describe('getSessionFromCookie', () => {
        it('reads session data from cookie', async () => {
            const auth = createAuth();
            const session = await getSession();
            session.set('auth', auth);
            const cookie = await commitSession(session);

            const request = new Request('http://localhost/test', {
                headers: { Cookie: cookie },
            });
            const sessionFromCookie = await getSessionFromCookie(request);

            expect(getAuth(sessionFromCookie)).toEqual(auth);
        });
    });

    describe('requireAuth', () => {
        it('returns auth for authenticated session', async () => {
            const auth = createAuth();
            const session = await getSession();
            session.set('auth', auth);

            await expect(requireAuth(session)).resolves.toEqual(auth);
        });

        it('throws unauthorized for unauthenticated session', async () => {
            const session = await getSession();

            try {
                await requireAuth(session);
                throw new Error('Expected requireAuth to throw for unauthenticated session');
            } catch (error: unknown) {
                if (error instanceof Response) {
                    expect(error.status).toEqual(401);
                    return;
                }

                expect(error).toMatchObject({
                    data: 'Unauthorized',
                    init: { status: 401 },
                });
            }
        });
    });
});

function createAuth(): Auth {
    return {
        data: {
            token: 'token',
            validUntil: '1735689600000',
            renewUntil: '1735693200000',
            userId: 'user-id',
            loginId: 'login-id',
        },
        actionLinks: {
            renew: {
                requestMethod: 'POST',
                rel: 'renew',
                url: '/renew',
            },
            delete: {
                requestMethod: 'DELETE',
                rel: 'delete',
                url: '/delete',
            },
        },
    };
}
