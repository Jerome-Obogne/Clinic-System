import UserCard from '@/components/ui/UserCard';
import { AccountLists } from './AccountItem';


const Accounts = () => {
  return (
    <div className="w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto px-4">
      <UserCard title="Registered Accounts">
        <AccountLists/>
      </UserCard>
    </div>
  );
}

export default Accounts