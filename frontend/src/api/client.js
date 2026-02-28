const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:5000";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
}

export const apiClient = {
  getHealth() {
    return request("/health");
  },
  sendChat(message) {
    return request("/api/v1/chat", {
      method: "POST",
      body: JSON.stringify({ message }),
    });
  },
  getDietRecommendation(payload) {
    return request("/api/v1/diet/recommendation", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  analyzeWorkout(angles) {
    return request("/api/v1/workout/analyze", {
      method: "POST",
      body: JSON.stringify({ angles }),
    });
  },
  predictBehavior(payload) {
    return request("/api/v1/behavior/predict", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  getAdminAnalytics() {
    return request("/api/v1/admin/analytics");
  },
  getAdminEvents(limit = 20) {
    return request(`/api/v1/admin/events?limit=${limit}`);
  },
};
