import React, { useCallback, useEffect, useRef, useState } from "react";
import { apiClient } from "../api/client";

export default function Workout() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [error, setError] = useState("");
  const [metrics, setMetrics] = useState({
    reps: 0,
    score: "--",
    status: "Waiting for movement"
  });
  const [anglesInput, setAnglesInput] = useState("170,165,120,90,95,160,170");
  const [behaviorInput, setBehaviorInput] = useState({
    workout_days_per_week: 4,
    avg_sleep_hours: 7,
    missed_sessions: 1,
  });
  const [behaviorResult, setBehaviorResult] = useState(null);
  const startCamera = useCallback(async () => {
    if (streamRef.current) return;

    setError("");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setCameraOn(true);

    } catch (err) {
      setError(
        "Camera access failed. Allow camera permission in browser settings."
      );
      setCameraOn(false);
    }
  }, []);

  const stopCamera = useCallback(() => {

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraOn(false);
  }, []);

  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  const analyzeSession = async () => {
    setError("");
    try {
      const parsedAngles = anglesInput
        .split(",")
        .map((value) => Number(value.trim()))
        .filter((value) => !Number.isNaN(value));

      const data = await apiClient.analyzeWorkout(parsedAngles);
      setMetrics({
        reps: data.reps,
        score: data.form_score,
        status: data.feedback,
      });
    } catch (err) {
      setError(err.message || "Workout analysis failed.");
    }
  };

  const runBehaviorPrediction = async () => {
    setError("");
    try {
      const data = await apiClient.predictBehavior(behaviorInput);
      setBehaviorResult(data);
    } catch (err) {
      setBehaviorResult(null);
      setError(err.message || "Behavior prediction failed.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Workout Trainer</h1>
        <p className="mt-1 text-sm text-slate-400">Analyze movement quality and predict adherence behavior.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="panel p-4">

          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full rounded-xl bg-black"
            style={{ minHeight: 320 }}
          />

          <div className="flex gap-3 mt-4">
            <button onClick={startCamera} className="btn-primary">
              Start Camera
            </button>

            <button onClick={stopCamera} className="btn-secondary">
              Stop Camera
            </button>
          </div>

          {cameraOn && (
            <p className="mt-3 text-green-400">
              Camera is on
            </p>
          )}

          {error && (
            <p className="mt-3 text-red-400">
              {error}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="panel p-5">
            <h2 className="panel-title">AI Performance</h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-700 bg-slate-800 p-3">
                <p className="text-xs text-slate-400">Reps</p>
                <p className="text-2xl font-semibold text-blue-300">{metrics.reps}</p>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-800 p-3">
                <p className="text-xs text-slate-400">Form Score</p>
                <p className="text-2xl font-semibold text-emerald-300">{metrics.score}</p>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-800 p-3">
                <p className="text-xs text-slate-400">Status</p>
                <p className="text-sm font-medium text-amber-300">{metrics.status}</p>
              </div>
            </div>
          </div>

          <div className="panel p-5">
            <h3 className="panel-title">Workout Analysis</h3>
            <label className="block text-sm mb-2">Joint Angles (comma-separated)</label>
            <input
              className="input-dark"
              value={anglesInput}
              onChange={(e) => setAnglesInput(e.target.value)}
            />
            <button className="btn-primary mt-3" onClick={analyzeSession}>
              Analyze Workout Session
            </button>
          </div>

          <div className="panel p-5">
            <h3 className="panel-title">Behavior Prediction</h3>
            <div className="grid grid-cols-1 gap-2">
              <input
                className="input-dark"
                type="number"
                value={behaviorInput.workout_days_per_week}
                onChange={(e) => setBehaviorInput({ ...behaviorInput, workout_days_per_week: Number(e.target.value) })}
                placeholder="Workout days per week"
              />
              <input
                className="input-dark"
                type="number"
                step="0.1"
                value={behaviorInput.avg_sleep_hours}
                onChange={(e) => setBehaviorInput({ ...behaviorInput, avg_sleep_hours: Number(e.target.value) })}
                placeholder="Avg sleep hours"
              />
              <input
                className="input-dark"
                type="number"
                value={behaviorInput.missed_sessions}
                onChange={(e) => setBehaviorInput({ ...behaviorInput, missed_sessions: Number(e.target.value) })}
                placeholder="Missed sessions"
              />
            </div>
            <button className="btn-primary mt-3" onClick={runBehaviorPrediction}>
              Predict Adherence
            </button>

            {behaviorResult && (
              <div className="mt-4 rounded-xl border border-slate-700 bg-slate-800 p-3 text-sm">
                <p>Adherence Score: {behaviorResult.adherence_score}</p>
                <p>Risk Level: {behaviorResult.risk_level}</p>
                <p className="mt-2">Recommendations:</p>
                <ul className="list-disc list-inside">
                  {behaviorResult.recommendations?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {error && <p className="text-red-400">{error}</p>}
    </div>
  );
}