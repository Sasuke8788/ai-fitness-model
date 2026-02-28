import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Dashboard", icon: "📊" },
  { to: "/workout", label: "Workout", icon: "🏋️" },
  { to: "/diet", label: "Diet", icon: "🥗" },
  { to: "/chat", label: "AI Buddy", icon: "🤖" },
  { to: "/admin", label: "Admin", icon: "🛠️" },
];

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 md:flex">
      <aside className="w-full border-b border-slate-800 bg-slate-900/50 p-4 backdrop-blur md:min-h-screen md:w-72 md:border-b-0 md:border-r md:p-6">
        <div className="mb-6 flex items-center justify-between md:block">
          <div>
            <h1 className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-2xl font-bold text-transparent">AI Fitness</h1>
            <p className="mt-1 text-sm text-slate-400">Gym Assistant Suite</p>
          </div>
          <span className="soft-badge border-emerald-600/40 bg-emerald-600/10 text-emerald-300">
            Live
          </span>
        </div>

        <nav className="grid grid-cols-2 gap-2 md:grid-cols-1 md:gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `rounded-xl px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600/20 to-cyan-500/20 text-blue-200"
                    : "text-slate-300 hover:bg-slate-800/80 hover:text-slate-100"
                }`
              }
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}

export default Layout;
