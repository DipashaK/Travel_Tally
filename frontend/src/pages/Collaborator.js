import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./CreateTrip/AiPlanPage/Sidebar";
import Header from "../common/Header";
import { useLocation } from "react-router-dom";

const CollaboratorsPage = () => {
  const [email, setEmail] = useState("");
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Extract or fallback to sessionStorage
  const savedData = (() => {
  try {
    const item = sessionStorage.getItem("savedAiPlanData");
    return item ? JSON.parse(item) : {};
  } catch {
    return {};
  }
})();
// const savedPlanId = sessionStorage.getItem("planId");

const aiPlan = location.state?.aiPlan || savedData.aiPlan || null;
// // const planId = location.state?.planId || savedPlanId.planId || null;
// // const planName = aiPlan?.destination || "Your Plan";

const planId = sessionStorage.getItem('planId');

const planName = sessionStorage.getItem('destination');

console.log('planId:', planId);
console.log('destination:', planName);



  // Fetch invites on load or when planId changes
  const token = sessionStorage.getItem("token");
useEffect(() => {
  const fetchInvites = async () => {
    if (!planId || !token) return;
    try {
      const res = await fetch(`http://localhost:5000/api/mail/invites?planId=${planId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setInvites(data);
      } else {
        console.error("Failed to fetch invites");
      }
    } catch (err) {
      console.error("Error fetching invites", err);
    }
  };
  fetchInvites();
}, [planId, token]);


  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleInvite = async () => {
    if (!email) {
      alert("Please enter an email");
      return;
    }
    if (!isValidEmail(email)) {
      alert("Please enter a valid email");
      return;
    }
    if (!planId) {
      alert("Plan ID not found.");
      return;
    }

    setLoading(true);
    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/mail/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email,
          planId,
          planName,
          inviteLink: `${window.location.origin}/join-plan?planId=${planId}&invitedEmail=${email}`,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Invite sent successfully!");
        setEmail("");
        setInvites((prev) => [
          ...prev,
          { email, planName, status: "pending" },
        ]);
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      alert("Failed to send invite");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRevoke = async (emailToRevoke) => {
    if (!planId) {
      alert("Plan ID not found.");
      return;
    }

    const token = sessionStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/mail/revoke-invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: emailToRevoke, planId }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Invite revoked");
        setInvites((prev) => prev.filter((inv) => inv.email !== emailToRevoke));
      } else {
        alert(data.message || "Failed to revoke invite");
      }
    } catch (err) {
      console.error(err);
      alert("Error revoking invite");
    }
  };

  const sectionRefs = useRef({});

  const scrollToSection = (key) => {
    sectionRefs.current[key]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar scrollToSection={scrollToSection} sectionRefs={sectionRefs} />
        <div className="flex flex-col items-center justify-start bg-white p-8 ml-56 w-full mt-16">
          <div className="max-w-3xl bg-white border rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Collaborators</h2>
            <p className="text-gray-600 mb-6">
              To invite people to your travel plan, send them an email invite using below
            </p>

            <div className="mb-4">
              <label htmlFor="email" className="block font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your-co-worker@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={loading}
              />
            </div>

            <button
              onClick={handleInvite}
              disabled={loading}
              className={`px-5 py-2 rounded-md transition ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {loading ? "Sending..." : "Invite"}
            </button>

            <h3 className="mt-6 font-semibold">
              People having access to this plan
            </h3>

            <ul className="space-y-2">
              {invites.map((invite) => (
                <li
                  key={`${invite.email}-${planId}`}
                  className="flex justify-between items-center border p-2 rounded-md"
                >
                  <span>
                    {invite.email} - {invite.planName} ({invite.status || "pending"})
                  </span>
                  <button
                    onClick={() => handleRevoke(invite.email)}
                    className="text-red-600 hover:underline"
                    disabled={loading}
                  >
                    Revoke
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaboratorsPage;