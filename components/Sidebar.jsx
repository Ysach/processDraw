'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function Sidebar({ onDiagramClick }) {
  const router = useRouter();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedProjectId, setExpandedProjectId] = useState(null);

  /**
   * 🔥 从 API 加载项目 + 图表
   */
  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error('加载项目失败', error);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  /** 🔍 搜索过滤 */
  const filteredProjects = useMemo(() => {
    if (!searchTerm) return projects;

    const keyword = searchTerm.toLowerCase();

    return projects
      .map((project) => {
        const matchedDiagrams = project.diagrams.filter((d) =>
          d.name.toLowerCase().includes(keyword)
        );

        const matchProject = project.name.toLowerCase().includes(keyword);

        return matchProject || matchedDiagrams.length > 0
          ? { ...project, diagrams: matchedDiagrams }
          : null;
      })
      .filter(Boolean);
  }, [searchTerm, projects]);

  /** 🔽 展开项目 */
  const toggleProjectExpansion = useCallback((id) => {
    setExpandedProjectId((prev) => (prev === id ? null : id));
  }, []);

  /** 🖼 点击图表 */
  const handleDiagramClick = useCallback(
    (diagram, projectId) => onDiagramClick?.(diagram, projectId),
    [onDiagramClick]
  );


  /** 🏠 Logo 返回 */
  const handleLogoClick = () => router.push('/');

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0 z-40">

      {/* Logo */}
      <div
        className="flex items-center cursor-pointer group select-none p-4 border-b border-gray-200"
        onClick={handleLogoClick}
      >
        <h1 className="flex items-baseline text-lg">
          <span className="font-bold text-slate-700">Process</span>
          <span className="ml-1 font-serif italic bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent text-xl">
            流程图
          </span>
        </h1>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="搜索图名..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 项目列表 */}
      <div className="flex-1 overflow-y-auto p-4">

        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
          项目列表
        </h2>

        {loading && <p className="text-gray-400 text-sm">加载中...</p>}

        <ul className="space-y-2">
          {filteredProjects.map((project) => (
            <li key={project.id}>
              <div
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => toggleProjectExpansion(project.id)}
              >
                <span className="font-medium text-gray-700">{project.name}</span>
                <span className="text-xs text-gray-400">{project.diagrams.length}</span>
              </div>

              {expandedProjectId === project.id && project.diagrams.length > 0 && (
                <ul className="ml-4 mt-1 space-y-1">
                  {project.diagrams.map((diagram) => (
                    <li
                      key={diagram.id}
                      className="p-2 rounded-lg hover:bg-blue-50 cursor-pointer text-sm text-gray-600"
                      onClick={(e) => handleDiagramClick(diagram, project.id)}
                    >
                      <div className="flex items-center justify-between">
                        <span>{diagram.name}</span>
                        <span className="text-xs text-gray-400">{diagram.createdAt}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

      </div>
    </aside>
  );
}
