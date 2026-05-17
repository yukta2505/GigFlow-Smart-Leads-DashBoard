import React from 'react';

interface Props { page: number; pages: number; setPage: (p: number) => void; }

const Pagination: React.FC<Props> = ({ page, pages, setPage }) => {
  if (pages <= 1) return null;
  return (
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
        <button key={p} onClick={() => setPage(p)} className={`w-9 h-9 rounded-lg text-sm font-medium transition ${p === page ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>{p}</button>
      ))}
    </div>
  );
};
export default Pagination;