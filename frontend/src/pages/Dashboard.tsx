import React, { useCallback, useEffect, useState } from 'react';
import api from '../api/axiosInstance';
import { Lead } from '../types';
import { useAuth } from '../context/AuthContext';
import LeadForm from '../components/LeadForm';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';

const STATUS_COLORS: Record<string, string> = {
  New: 'bg-blue-500/20 text-blue-400',
  Contacted: 'bg-yellow-500/20 text-yellow-400',
  Qualified: 'bg-green-500/20 text-green-400',
  Lost: 'bg-red-500/20 text-red-400',
};

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editLead, setEditLead] = useState<Lead | null>(null);
  const [filters, setFilters] = useState({ status: '', source: '', search: '', sort: 'Latest' });

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = { ...filters, page };
      const { data } = await api.get('/leads', { params });
      setLeads(data.leads); setTotal(data.total); setPages(data.pages);
    } finally { setLoading(false); }
  }, [filters, page]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this lead?')) return;
    await api.delete(`/leads/${id}`);
    fetchLeads();
  };

  const handleExport = async () => {
    const { data } = await api.get('/leads/export', { responseType: 'blob' });
    const url = URL.createObjectURL(new Blob([data]));
    const a = document.createElement('a'); a.href = url; a.download = 'leads.csv'; a.click();
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-400">GigFlow</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">{user?.name} · <span className="capitalize">{user?.role}</span></span>
          <button onClick={logout} className="text-sm text-red-400 hover:text-red-300">Logout</button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Leads</h2>
            <p className="text-gray-400 text-sm">{total} total leads</p>
          </div>
          <div className="flex gap-3">
            <button onClick={handleExport} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition">Export CSV</button>
            <button onClick={() => { setEditLead(null); setShowForm(true); }} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-semibold transition">+ Add Lead</button>
          </div>
        </div>

        <Filters filters={filters} setFilters={setFilters} setPage={setPage} />

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading...</div>
        ) : leads.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No leads found</div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-800">
            <table className="w-full text-sm">
              <thead className="bg-gray-900 text-gray-400 uppercase text-xs">
                <tr>
                  {['Name', 'Email', 'Status', 'Source', 'Created', 'Actions'].map(h => (
                    <th key={h} className="px-4 py-3 text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {leads.map(lead => (
                  <tr key={lead._id} className="hover:bg-gray-900/50 transition">
                    <td className="px-4 py-3 font-medium">{lead.name}</td>
                    <td className="px-4 py-3 text-gray-400">{lead.email}</td>
                    <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[lead.status]}`}>{lead.status}</span></td>
                    <td className="px-4 py-3 text-gray-400">{lead.source}</td>
                    <td className="px-4 py-3 text-gray-500">{new Date(lead.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3 flex gap-2">
                      <button onClick={() => { setEditLead(lead); setShowForm(true); }} className="text-indigo-400 hover:text-indigo-300 text-xs">Edit</button>
                      {user?.role === 'admin' && <button onClick={() => handleDelete(lead._id)} className="text-red-400 hover:text-red-300 text-xs">Delete</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Pagination page={page} pages={pages} setPage={setPage} />
      </div>

      {showForm && <LeadForm lead={editLead} onClose={() => setShowForm(false)} onSave={() => { setShowForm(false); fetchLeads(); }} />}
    </div>
  );
};
export default Dashboard;