// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const JoinPlanPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   const queryParams = new URLSearchParams(location.search);
//   const planId = queryParams.get("planId");

//   useEffect(() => {
//     if (!planId) {
//       alert("Invalid link: no plan specified");
//       return;
//     }

//     const fetchPlan = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch(`http://localhost:5000/api/plans/get-plan/${planId}`, {
//           headers: {
//             "Authorization": `Bearer ${token}`,
//           },
//         });

//         const data = await response.json();

//         if (response.ok) {
//           // ✅ Navigate with fetched data
//           navigate(`/ai-plan/${planId}`, {
//             state: {
//               aiPlan: data.aiPlan,
//               destination: data.destination,
//               startDate: data.startDate,
//               endDate: data.endDate,
//             },
//           });
//         } else {
//           alert(data.message || "Could not join the plan");
//         }
//       } catch (err) {
//         console.error(err);
//         alert("Error joining the plan");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPlan();
//   }, [planId, navigate]);

//   return <div>{loading ? "Joining plan..." : "Redirect failed."}</div>;
// };

// export default JoinPlanPage;












import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const JoinPlanPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Extract planId from URL query params
  const queryParams = new URLSearchParams(location.search);
  const planId = queryParams.get("planId");

  useEffect(() => {
    console.log("URL query string:", location.search);
    for (const [key, value] of queryParams.entries()) {
      console.log(`Query param ${key}: ${value}`);
    }
  }, [location.search]);

  useEffect(() => {
    if (!planId) {
      alert("Invalid link: no plan specified");
      setLoading(false);
      return;
    }

    const token = sessionStorage.getItem("token");

    if (!token) {
      // No user logged in → redirect to signup with redirect URL including planId
      navigate(`/signup?redirectTo=${encodeURIComponent(`/join-plan?planId=${planId}`)}`);
      return;
    }

    const processJoin = async () => {
      try {
        // Get public plan info (including invitedEmail)
        const planRes = await fetch(`https://travel-tally-3mf9.onrender.com/api/plans/public/${planId}`);
        const planData = await planRes.json();

        if (!planRes.ok || !planData.invitedEmail) {
          alert("Invalid or expired plan link.");
          setLoading(false);
          return;
        }

        // Fetch full plan details (with auth)
        const fullPlanRes = await fetch(`https://travel-tally-3mf9.onrender.com/api/plans/get-plan/${planId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const fullPlanData = await fullPlanRes.json();

        if (fullPlanRes.ok) {
          navigate(`/ai-plan/${planId}`, {
            state: {
              aiPlan: fullPlanData.aiPlan,
              destination: fullPlanData.destination,
              startDate: fullPlanData.startDate,
              endDate: fullPlanData.endDate,
            },
          });
        } else {
          alert(fullPlanData.message || "Could not fetch plan.");
        }
      } catch (err) {
        console.error("Error joining plan:", err);
        alert("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    processJoin();
  }, [planId, navigate]);

  return <div>{loading ? "Joining plan..." : "Redirect failed."}</div>;
};

export default JoinPlanPage;
