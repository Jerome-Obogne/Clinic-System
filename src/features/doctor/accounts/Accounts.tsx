import UserCard from '@/components/ui/UserCard';
import AccountItem from './AccountItem';
import { useCallback } from 'react';

const Accounts = () => {

  const handleDelete = useCallback(async () => {
        
  },[])
  return (
    <div className="w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto px-4">
      <UserCard title="Registered Accounts">
        <AccountItem onDelete={handleDelete} />
      </UserCard>
    </div>
  );
}

export default Accounts