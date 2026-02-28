import { useState } from "react";
import { apiClient } from "../api/client";

function Diet() {
  const [form, setForm] = useState({
    weight:"",
    height:"",
    age:"",
    goal:"maintain"
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const heightChart = [
    { ft: "4'8", cm: 142 },
    { ft: "4'9", cm: 145 },
    { ft: "4'10", cm: 147 },
    { ft: "4'11", cm: 150 },
    { ft: "5'0", cm: 152 },
    { ft: "5'1", cm: 155 },
    { ft: "5'2", cm: 157 },
    { ft: "5'3", cm: 160 },
    { ft: "5'4", cm: 163 },
    { ft: "5'5", cm: 165 },
    { ft: "5'6", cm: 168 },
    { ft: "5'7", cm: 170 },
    { ft: "5'8", cm: 173 },
    { ft: "5'9", cm: 175 },
    { ft: "5'10", cm: 178 },
    { ft: "5'11", cm: 180 },
    { ft: "6'0", cm: 183 },
    { ft: "6'1", cm: 185 },
    { ft: "6'2", cm: 188 },
    { ft: "6'3", cm: 191 },
    { ft: "6'4", cm: 193 },
    { ft: "6'5", cm: 196 },
    { ft: "6'6", cm: 198 }
  ];

  const submitDiet = async () => {
    setError("");
    try {
      const data = await apiClient.getDietRecommendation(form);
      setResult(data);
    } catch (err) {
      setResult(null);
      setError(err.message || "Failed to fetch diet recommendation.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">AI Diet Planner</h2>
        <p className="mt-1 text-sm text-slate-400">Get BMI, calorie target, and daily macro recommendations.</p>
      </div>

      <div className="panel p-5">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <input
            className="input-dark"
            placeholder="Weight (kg)"
            value={form.weight}
            onChange={e=>setForm({...form,weight:e.target.value})}
          />

          <input
            className="input-dark"
            placeholder="Height (cm)"
            value={form.height}
            onChange={e=>setForm({...form,height:e.target.value})}
          />

          <input
            className="input-dark"
            placeholder="Age"
            value={form.age}
            onChange={e=>setForm({...form,age:e.target.value})}
          />

          <select
            className="input-dark"
            value={form.goal}
            onChange={e=>setForm({...form,goal:e.target.value})}
          >
            <option value="maintain">Maintain</option>
            <option value="loss">Weight Loss</option>
            <option value="gain">Weight Gain</option>
          </select>

          <button className="btn-primary" onClick={submitDiet}>
            Calculate
          </button>
        </div>
      </div>

      {result && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="panel p-4">
            <p className="text-sm text-slate-400">BMI</p>
            <p className="mt-1 text-2xl font-semibold">{result.bmi}</p>
            <p className="text-sm capitalize text-blue-300">{result.bmi_category}</p>
          </div>
          <div className="panel p-4">
            <p className="text-sm text-slate-400">Daily Calories</p>
            <p className="mt-1 text-2xl font-semibold">{result.calories}</p>
          </div>
          <div className="panel p-4">
            <p className="text-sm text-slate-400">Macro Split</p>
            <p className="mt-1">Protein: {result.macros?.protein_g} g</p>
            <p>Carbs: {result.macros?.carbs_g} g</p>
            <p>Fats: {result.macros?.fats_g} g</p>
          </div>
        </div>
      )}

      {error && <p className="text-red-400 mb-4">{error}</p>}
      <div className="panel p-6">

        <h3 className="text-lg font-semibold mb-4">
          Height Reference (Click to auto-fill)
        </h3>

        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">

          {heightChart.map((h,i)=>(
            <div
              key={i}
              onClick={()=>setForm({...form,height:h.cm})}
              className="rounded-lg border border-slate-700 bg-slate-800 p-2 text-center transition hover:border-blue-500/50 hover:bg-slate-700 cursor-pointer"
            >
              <p>{h.ft}</p>
              <p className="text-blue-400 text-sm">{h.cm} cm</p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Diet;