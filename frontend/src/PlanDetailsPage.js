import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PlanDetailPage = () => {
  const { planId } = useParams();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!planId) return;

    const fetchPlan = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await fetch(`https://travel-tally-3mf9.onrender.com/api/plans/get-plan/${planId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setPlan(data);
        } else {
          alert("Plan not found or access denied");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, [planId]);

  if (loading) return <div>Loading plan...</div>;
  if (!plan) return <div>No plan found</div>;

  return (
    <div>
      <h1>{plan.destination}</h1>
      {/* Render plan details */}
    </div>
  );
};

export default PlanDetailPage;
