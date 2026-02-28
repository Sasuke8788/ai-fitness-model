import { Link } from "react-router-dom";

function Dashboard() {
  const modules = [
    {
      title: "AI Trainer",
      description: "Posture workflows and workout scoring.",
      to: "/workout",
      metric: "Workout",
      icon: "🏋️",
    },
    {
      title: "Diet Planner",
      description: "BMI, calories, and macro split guidance.",
      to: "/diet",
      metric: "Nutrition",
      icon: "🥗",
    },
    {
      title: "Virtual Buddy",
      description: "Conversational coaching and motivation.",
      to: "/chat",
      metric: "Coaching",
      icon: "🤖",
    },
    {
      title: "Admin Analytics",
      description: "Usage signals and platform health.",
      to: "/admin",
      metric: "Analytics",
      icon: "📈",
    },
  ];

  return (
    <div className="space-y-6">
      <section className="panel p-6 md:p-8">
        <p className="soft-badge inline-flex">Fitness Intelligence Platform</p>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">AI Gym & Fitness Assistant</h1>
        <p className="mt-3 max-w-3xl text-slate-300">
          Train smarter with one clean dashboard for workouts, nutrition, AI coaching, and analytics.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="panel p-5">
          <p className="text-sm text-slate-400">Core Modules</p>
          <p className="mt-2 text-3xl font-semibold">4</p>
        </div>
        <div className="panel p-5">
          <p className="text-sm text-slate-400">API Version</p>
          <p className="mt-2 text-3xl font-semibold">v1</p>
        </div>
        <div className="panel p-5">
          <p className="text-sm text-slate-400">Status</p>
          <p className="mt-2 text-3xl font-semibold text-emerald-300">Online</p>
        </div>
        <div className="panel p-5">
          <p className="text-sm text-slate-400">UI Theme</p>
          <p className="mt-2 text-3xl font-semibold">Dark</p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {modules.map((item) => (
          <Link
            key={item.title}
            to={item.to}
            className="panel block p-5 transition hover:border-blue-500/50 hover:bg-slate-900"
          >
            <p className="text-3xl">{item.icon}</p>
            <p className="text-xs uppercase tracking-wide text-blue-300">{item.metric}</p>
            <h2 className="mt-2 text-lg font-semibold">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-300">{item.description}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}

export default Dashboard;
