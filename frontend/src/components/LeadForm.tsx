import React, { useState } from 'react';
import api from '../api/axiosInstance';
import { Lead } from '../types';

interface Props { lead: Lead | null; onClose: () => void; onSave: () => void; }

const LeadForm: React.FC<Props> = ({ lead, onClose, onSave }) => {
  const [form, setForm] = useState({ name: lead?.name || '', email: lead?.email || '', status: lead?.status || 'New', source: lead?.source || 'Website' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (lead) await api.put(`/leads/${lead._id}`, form);
      else await api.post('/leads', form);
      onSave();
    } catch { setError('Failed to save lead'); }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-2xl w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-6">{lead ? 'Edit Lead' : 'Add Lead'}</h2>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        {['name', 'email'].map(f => (
          <input key={f} className="w-full mb-4 p-3 rounded-lg bg-gray-800 text-white outline-none" type={f === 'email' ? 'email' : 'text'} placeholder={f.charAt(0).toUpperCase() + f.slice(1)} value={form[f as 'name' | 'email']} onChange={e => setForm({ ...form, [f]: e.target.value })} required />
        ))}
        <select className="w-full mb-4 p-3 rounded-lg bg-gray-800 text-white outline-none" value={form.status} onChange={e => setForm({ ...form, status: e.target.value as any })}>
          {['New', 'Contacted', 'Qualified', 'Lost'].map(s => <option key={s}>{s}</option>)}
        </select>
        <select className="w-full mb-6 p-3 rounded-lg bg-gray-800 text-white outline-none" value={form.source} onChange={e => setForm({ ...form, source: e.target.value as any })}>
          {['Website', 'Instagram', 'Referral'].map(s => <option key={s}>{s}</option>)}
        </select>
        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition">Cancel</button>
          <button type="submit" className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition">Save</button>
        </div>
      </form>
    </div>
  );
};
export default LeadForm;