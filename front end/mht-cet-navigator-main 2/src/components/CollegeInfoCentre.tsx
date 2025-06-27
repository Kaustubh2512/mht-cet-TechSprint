import React, { useEffect, useState } from 'react';
import axios from 'axios';

// TODO: Replace with your actual Render backend URL
const API_BASE = 'https://mht-cet-navigator-backend.onrender.com/api/colleges';

interface College {
  college_code: string;
  name: string;
  region: string;
  district: string;
  home_university: string;
}

interface CollegeListResponse {
  success: boolean;
  colleges: College[];
}

interface CollegeInfoResponse {
  success: boolean;
  info?: string;
  message?: string;
}

const CollegeInfoCentre: React.FC = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<College | null>(null);
  const [loading, setLoading] = useState(false);
  const [aiInfo, setAiInfo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get<CollegeListResponse>(`${API_BASE}/list`)
      .then(res => {
        setColleges(res.data.colleges || []);
      })
      .catch(() => setError('Failed to load college list.'));
  }, []);

  const filtered = search
    ? colleges.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.college_code.includes(search)
      )
    : colleges;

  const handleSelect = (college: College) => {
    setSelected(college);
    setSearch(college.name);
    setAiInfo(null);
    setError(null);
  };

  const handleGetInfo = async () => {
    if (!selected) return;
    setLoading(true);
    setAiInfo(null);
    setError(null);
    try {
      const res = await axios.post<CollegeInfoResponse>(`${API_BASE}/info`, { college_code: selected.college_code });
      if (res.data.success) {
        setAiInfo(res.data.info || 'No info found.');
      } else {
        setError(res.data.message || 'Failed to get info.');
      }
    } catch (err) {
      setError('Failed to get info.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-2xl mx-auto my-10 p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-md border">
      <h2 className="text-2xl font-bold mb-4 text-center">College Information Centre</h2>
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-3 border rounded focus:outline-none focus:ring"
          placeholder="Search by college name or DTE code..."
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setSelected(null);
            setAiInfo(null);
            setError(null);
          }}
        />
        {search && !selected && (
          <div className="max-h-56 overflow-y-auto border rounded bg-white dark:bg-neutral-800 shadow mt-1 z-10 relative">
            {filtered.length === 0 ? (
              <div className="p-3 text-muted-foreground">No colleges found.</div>
            ) : (
              filtered.slice(0, 20).map(college => (
                <div
                  key={college.college_code}
                  className="p-3 cursor-pointer hover:bg-primary/10"
                  onClick={() => handleSelect(college)}
                >
                  <span className="font-medium">{college.name}</span>
                  <span className="ml-2 text-xs text-muted-foreground">({college.college_code})</span>
                  <span className="ml-2 text-xs text-muted-foreground">{college.district}, {college.region}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <button
        className="w-full py-3 rounded bg-gradient-to-r from-primary to-secondary text-white font-semibold disabled:opacity-60 mb-4"
        disabled={!selected || loading}
        onClick={handleGetInfo}
      >
        {loading ? 'Getting Info...' : 'Get Info'}
      </button>
      {error && <div className="text-red-600 mb-2 text-center">{error}</div>}
      {aiInfo && (
        <div className="mt-4 p-4 bg-muted rounded shadow text-base whitespace-pre-line">
          {aiInfo}
        </div>
      )}
    </section>
  );
};

export default CollegeInfoCentre; 