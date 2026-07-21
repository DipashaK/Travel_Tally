import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaInfoCircle,
  FaCloudSun,
  FaUmbrellaBeach,
  FaMapMarkerAlt,
  FaPlane,
  FaUtensils,
  FaSuitcase,
  FaClock,
  FaMoneyBill,
  FaUserFriends,
  FaCog,
} from "react-icons/fa";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  sectionRefs,
  aiPlan,
  destination,
  planId,
}) => {
  const navigate = useNavigate();

  const handleNavigate = (key, ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }

    setSidebarOpen(false);

    if (
      window.location.pathname !== "/ai-plan" ||
      window.location.hash !== `#${key}`
    ) {
      navigate(`/ai-plan#${key}`, {
        state: { aiPlan, destination, planId },
      });
    } else {
      window.history.replaceState(null, "", `/ai-plan#${key}`);
    }
  };

  const links = [
    { label: "About the Place", icon: <FaInfoCircle />, key: "about", ref: sectionRefs?.about },
    { label: "Weather", icon: <FaCloudSun />, key: "weather", ref: sectionRefs?.weather },
    { label: "Top Activities", icon: <FaUmbrellaBeach />, key: "activities", ref: sectionRefs?.activities },
    { label: "Top Places to Visit", icon: <FaMapMarkerAlt />, key: "places", ref: sectionRefs?.places },
    { label: "Itinerary", icon: <FaPlane />, key: "itinerary", ref: sectionRefs?.itinerary },
    { label: "Local Cuisines", icon: <FaUtensils />, key: "cuisines", ref: sectionRefs?.cuisines },
    { label: "Packing Checklist", icon: <FaSuitcase />, key: "packing", ref: sectionRefs?.packing },
    { label: "Best Time to Visit", icon: <FaClock />, key: "bestTime", ref: sectionRefs?.bestTime },
    { label: "Budget", icon: <FaMoneyBill />, key: "budget", ref: sectionRefs?.budget },
  ];

  const NavItem = ({ onClick, icon, label, active }) => (
    <li
      onClick={onClick}
      className={`group flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer border-l-2 transition-all
        ${active
          ? "border-[#E8674F] bg-[#FBF3E7]/10 text-[#FBF3E7]"
          : "border-transparent text-[#FBF3E7]/60 hover:border-[#C99A44] hover:text-[#FBF3E7] hover:bg-[#FBF3E7]/5"
        }`}
    >
      <span className="text-[#C99A44] group-hover:text-[#E8674F] transition-colors">{icon}</span>
      <span className="text-sm tracking-wide">{label}</span>
    </li>
  );

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-16 left-0 z-40
          h-[calc(100vh-4rem)]
          w-56
          bg-[#0F3D3E]
          border-r border-[#C99A44]/20
          overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="p-4">
          <nav className="space-y-8">
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#C99A44] font-semibold mb-3 px-1">
                Your Plan
              </h3>
              <ul className="space-y-1">
                {links.map(({ label, icon, key, ref }) => (
                  <NavItem
                    key={key}
                    label={label}
                    icon={icon}
                    onClick={() => handleNavigate(key, ref)}
                  />
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#C99A44] font-semibold mb-3 px-1">
                Control Center
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/expenses"
                    state={{ aiPlan, destination, planId }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-md border-l-2 border-transparent text-[#FBF3E7]/60 hover:border-[#C99A44] hover:text-[#FBF3E7] hover:bg-[#FBF3E7]/5 transition-all"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <FaMoneyBill className="text-[#C99A44]" />
                    <span className="text-sm tracking-wide">Expense Tracker</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/collaborate"
                    state={{ aiPlan, destination, planId }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-md border-l-2 border-transparent text-[#FBF3E7]/60 hover:border-[#C99A44] hover:text-[#FBF3E7] hover:bg-[#FBF3E7]/5 transition-all"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <FaUserFriends className="text-[#C99A44]" />
                    <span className="text-sm tracking-wide">Collaborate</span>
                  </Link>
                </li>
                <NavItem
                  label="Settings"
                  icon={<FaCog />}
                  onClick={() => handleNavigate("settings", sectionRefs?.settings)}
                />
              </ul>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;