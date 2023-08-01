'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();
  const [token, setToken] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchParams.has('token')) {
      setToken(searchParams.get('token') as string);
    }
  }, [searchParams, setToken]);

  useEffect(() => {
    if (token.length > 0) {
      const verifyUserEmail = async () => {
        try {
          await axios.post('/api/register/verify-email', { token });
          setVerified(true);
        } catch (error: any) {
          console.log(error);
          setError(error);
        }
      };
      verifyUserEmail();
    }
  }, [token]);

  // return with design
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <div className='flex flex-col items-center justify-center flex-1 px-20 text-center'>
        <h1 className='text-6xl font-bold'>Verify Email</h1>

        <p className='mt-3 text-2xl'>
          {token && token.length > 0 ? (
            <span>{`Your token is ${token}. Verifying your email address...`}</span>
          ) : (
            <span>{`Your token is invalid.`}</span>
          )}
        </p>

        {verified && (
          <>
            <h2 className='text-2xl'>
              {`Your email address has been verified.`}
            </h2>

            <p className='mt-3 text-2xl'>
              {`You can now `}
              <Link href='/sign-in' className='text-blue-600 hover:underline'>
                Sign in
              </Link>
              {` to your account.`}
            </p>
          </>
        )}

        {error && (
          <>
            <h2 className='text-2xl'>{`An error has occurred.`}</h2>

            <p className='mt-3 text-2xl'>Something went wrong</p>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
