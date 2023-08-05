import getSession from '@/actions/getSession';
import React from 'react';

const UserPage = async () => {
  const session = await getSession();
  console.log(session?.user.isOAuth);

  return <div>{session?.user.isOAuth}</div>;
};

export default UserPage;
