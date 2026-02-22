import UserCard from '@/components/ui/UserCard';

const Accounts = () => {
  return (
    <div className="w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto px-4">
      <UserCard title="Registered Accounts">
        <div className="mt-5"></div>
      </UserCard>
    </div>
  );
}

export default Accounts