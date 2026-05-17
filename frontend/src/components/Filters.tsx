import React, { useEffect, useState, useCallback } from 'react';
   
interface Props {
  filters: { status: string; source: string; search: string; sort: string };
  setFilters: (f: any) => void;
  setPage: (p: number) => void;
}

const Filters: React.FC<Props> = ({ filters, setFilters, setPage }) => {
  const [search, setSearch] = useState(filters.search);

  const applySearch = useCallback(() => {
    setFilters((f: any) => ({ ...f, search }));
    setPage(1);
  }, [search, setFilters, setPage]);

  useEffect(() => {
    const t = setTimeout(() => {
      applySearch();
    }, 400);
    return () => clearTimeout(t);
  }, [applySearch]);

  const update = (key: string, val: string) => {
    setFilters((f: any) => ({ ...f, [key]: val }));
    setPage(1);
  };

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <input
        className="bg-gray-800 text-white px-4 py-2 rounded-lg outline-none text-sm flex-1 min-w-[200px]"
        placeholder="Search name or email..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {[
        ['status', ['', 'New', 'Contacted', 'Qualified', 'Lost']],
        ['source', ['', 'Website', 'Instagram', 'Referral']],
        ['sort', ['Latest', 'Oldest']],
      ].map(([key, opts]) => (
        <select
          key={key as string}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg outline-none text-sm"
          value={filters[key as keyof typeof filters]}
          onChange={e => update(key as string, e.target.value)}
        >
          {(opts as string[]).map(o => (
            <option key={o} value={o}>{o || `All ${key}`}</option>
          ))}
        </select>
      ))}
    </div>
  );
};

export default Filters;