import getSession from '@/actions/getSession';
import React from 'react';

const UserPage = async () => {
  const session = await getSession();

  return <div>{session?.user.isOAuth}</div>;
};

export default UserPage;
