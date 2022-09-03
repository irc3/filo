import React from 'react';
import useTranslation from 'hooks/useTranslation';
import useProfile from 'hooks/useProfile';

export default function Index() {
  const { t } = useTranslation()

  const profile = useProfile()
  console.log('profile is: ', profile)

  return (
    <div className="home flex justify-center items-center">
      Logined as {profile.accounts[0]}
    </div>
  );
}
