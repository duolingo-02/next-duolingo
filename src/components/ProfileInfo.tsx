import React from 'react';
import Image from 'next/image';

interface ProfileInfoProps {
  user: {
    username: string;
    email: string;
    profilePicture: string;
    totalPoints: number;
  };
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <Image
        src={user.profilePicture || '/default-pp.png'}
        alt={user.username}
        width={150}
        height={150}
        className="mx-auto rounded-full mb-4"
      />
      <h2 className="text-2xl font-bold text-center mb-2">{user.username}</h2>
      <p className="text-gray-600 text-center mb-4">{user.email}</p>
      <p className="text-xl font-semibold text-center text-duolingoGreen">
        Total Points: {user.totalPoints}
      </p>
    </div>
  );
};

export default ProfileInfo;