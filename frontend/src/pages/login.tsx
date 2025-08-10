// src/pages/Login.tsx
import { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';


const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="w-sm p-7 shadow-2xl rounded-xl bg-gray-100">
        <div className="flex flex-row justify-between pb-6">
          <h1 className="text-2xl font-bold">Login</h1>
          <h1>
            No Account?
            <strong className="text-sm hover:underline cursor-pointer">
              <Link to="/signup"> Sign up</Link>
            </strong>
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="pb-6">
            <label htmlFor="email" className="block text-sm pb-3">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              placeholder="Email address"
              className="block w-full border  p-1.5 rounded-md"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="pb-6">
            <label htmlFor="password" className="block text-sm pb-3">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="block w-full border  p-1.5 rounded-md"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <Button className='w-full'>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
