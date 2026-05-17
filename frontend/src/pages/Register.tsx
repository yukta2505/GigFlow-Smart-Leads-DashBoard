import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'sales' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try { await register(form.name, form.email, form.password, form.role); navigate('/'); }
    catch { setError('Registration failed'); }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-2xl w-full max-w-md shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-6">Create Account</h1>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        {['name', 'email', 'password'].map(field => (
          <input key={field} className="w-full mb-4 p-3 rounded-lg bg-gray-800 text-white outline-none" type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} value={form[field as keyof typeof form]} onChange={e => setForm({ ...form, [field]: e.target.value })} required />
        ))}
        <select className="w-full mb-6 p-3 rounded-lg bg-gray-800 text-white outline-none" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
          <option value="sales">Sales User</option>
          <option value="admin">Admin</option>
        </select>
        <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg font-semibold transition">Register</button>
        <p className="text-gray-400 mt-4 text-center">Have an account? <Link to="/login" className="text-indigo-400">Login</Link></p>
      </form>
    </div>
  );
};
export default Register;