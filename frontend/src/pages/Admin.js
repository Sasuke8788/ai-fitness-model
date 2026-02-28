import { useEffect, useState } from "react";
import { apiClient } from "../api/client";

function Admin() {
  const [analytics, setAnalytics] = useState(null);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  const loadAdminData = async () => {
    setError("");
    try {
      const [analyticsData, eventsData] = await Promise.all([
        apiClient.getAdminAnalytics(),
        apiClient.getAdminEvents(15),
      ]);
      setAnalytics(analyticsData);
      setEvents(eventsData.events || []);
    } catch (err) {
      setError(err.message || "Failed to load admin analytics.");
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const usageItems = [
    { label: "Diet Requests", value: analytics?.usage?.diet_requests ?? 0 },
    { label: "Chat Requests", value: analytics?.usage?.chat_requests ?? 0 },
    { label: "Workout Analyses", value: analytics?.usage?.workout_analyses ?? 0 },
    { label: "Behavior Predictions", value: analytics?.usage?.behavior_predictions ?? 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-3xl font-bold">Admin Dashboard & Analytics</h2>
          <p className="mt-1 text-sm text-slate-400">Track request volume, model outputs, and recent events.</p>
        </div>
        <button className="btn-primary" onClick={loadAdminData}>
          Refresh Analytics
        </button>
      </div>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      {analytics && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {usageItems.map((item) => (
              <div key={item.label} className="panel p-4">
                <p className="text-xs text-slate-400">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="panel p-5">
              <h3 className="panel-title">Usage Summary</h3>
              <p className="mt-3">Total Events: {analytics.total_events}</p>
              <p>Average Form Score: {analytics.avg_form_score ?? "N/A"}</p>
            </div>

            <div className="panel p-5">
              <h3 className="panel-title">Latest Event</h3>
              <p className="mt-3">Type: {analytics.last_event?.event_type || "No events yet"}</p>
              <p className="break-all text-sm text-slate-300">
                Time: {analytics.last_event?.timestamp || "No events yet"}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="panel p-6">
        <h3 className="panel-title mb-3">Recent Events</h3>

        {events.length === 0 ? (
          <p className="text-slate-300">No events captured yet.</p>
        ) : (
          <div className="space-y-2">
            {events.map((event, idx) => (
              <div key={idx} className="rounded-xl border border-slate-700 bg-slate-800 p-3">
                <p className="font-semibold">{event.event_type}</p>
                <p className="text-sm text-slate-300">{event.timestamp}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
