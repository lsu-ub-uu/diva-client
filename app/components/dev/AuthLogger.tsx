import type { Auth } from '@/auth/Auth';
import { useIsDevMode } from '@/utils/useIsDevMode';
import { isEqual } from 'lodash-es';
import { useEffect, useState } from 'react';

export const AuthLogger = ({ auth }: { auth: Auth | undefined }) => {
  const isDev = useIsDevMode();
  const [expanded, setExpanded] = useState(false);
  const [log, setLog] = useState<
    { timestamp: number; auth: Auth | undefined }[]
  >([]);

  useEffect(() => {
    const prevAuth = log.at(-1)?.auth;
    if (!isEqual(auth, prevAuth)) {
      setLog((l) => [...l, { timestamp: Date.now(), auth }]);
    }
  }, [auth, log]);

  if (!isDev) {
    return null;
  }

  if (!expanded) {
    return (
      <button
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          zIndex: 1000,
          background: 'lightgray',
          color: 'white',
          border: 'none',
          borderTopLeftRadius: '8px',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
        }}
        onClick={() => setExpanded(true)}
      >
        🗝️
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        zIndex: 1000,
        background: 'white',
        color: 'black',
        border: '1px solid #ccc',
        borderRadius: '8px 8px 0 0',
        padding: '1rem',
        maxHeight: '50vh',
        overflowY: 'auto',
        width: '500px',
        fontFamily: 'monospace',
      }}
    >
      {log.map((entry, index) => (
        <details key={index}>
          <summary>{new Date(entry.timestamp).toISOString()}</summary>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>
              <strong>User ID:</strong> {entry?.auth?.data?.userId}
            </li>
            <li>
              <strong>Token:</strong> {entry?.auth?.data?.token}
            </li>
            {entry?.auth?.data?.validUntil && (
              <li>
                <strong>Valid Until:</strong>{' '}
                {new Date(Number(entry?.auth?.data?.validUntil)).toISOString()}
              </li>
            )}
            {entry?.auth?.data?.renewUntil && (
              <li>
                <strong>Renew Until:</strong>{' '}
                {new Date(Number(entry?.auth?.data?.renewUntil)).toISOString()}
              </li>
            )}
          </ul>
        </details>
      ))}
      <button
        style={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          background: 'lightgray',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '0.25rem 0.5rem',
          cursor: 'pointer',
        }}
        onClick={() => setExpanded(false)}
      >
        ✖
      </button>
    </div>
  );
};
