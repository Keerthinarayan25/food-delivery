import { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import type { UserRole } from '@/stores/authStore';
import { Link } from 'react-router-dom';
import { Button, buttonVariants } from '@/components/ui/button';
import { User } from 'lucide-react';
import { UtensilsCrossed } from 'lucide-react';


const Signup = () => {
  const [role, setRole] = useState<"user" |"restaurant">("user");

  const [formData, setFormData] = useState({
    name:"",
    address:"",
    email: '',
    password: '',
    role: 'user' as UserRole
  });

  const { signup } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 ">
      <div className="w-sm p-7 shadow-2xl rounded-xl bg-gray-100 ">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Create an Account
        </h1>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
          Choose your role to get started.
        </p>
        {/* Role  */}
        <div className="flex mb-6 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <Button className={`flex-1 flex items-center justify-center gap-2 py-2 ${
              role === "user"
              ? buttonVariants({ variant: "default" })
              : buttonVariants({ variant: "secondary" })
            }`}
            onClick={() => setRole("user")}>
              <User/>Customer
          </Button>
          <Button className={`flex-1 flex items-center justify-center gap-2 py-2 ${
              role === "restaurant"
                ?  buttonVariants({ variant: "default" })
                : buttonVariants({ variant: "secondary" })
            }`}
            onClick={() => setRole("restaurant")}>
              <UtensilsCrossed/> Restaurant 
          </Button>
        </div>

        {/* Form  */}
        <form onSubmit={handleSubmit} className='space-y-4'>
          {role === "restaurant" && (
            <>
            <input 
              type="text" 
              placeholder='Restaurant Name'
              value={formData.name}
              onChange={(e) => setFormData({...formData, name:e.target.value})} 
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
              />

              <input 
              type="text" 
              placeholder='Business Address'
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
              />
            </>
          )}
          {role === "user" && (
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
          />
          <Button type="submit" className='w-full py-3 '>
            Create Account
          </Button>

        </form>
        <div className="flex flex-row items-center justify-center pt-6">
          <h1>
            Already have an account?
            <strong className="text-sm hover:underline cursor-pointer">
              <Link to="/login"> Login</Link>
            </strong>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Signup;
