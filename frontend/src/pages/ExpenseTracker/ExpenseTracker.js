import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../CreateTrip/AiPlanPage/Sidebar";
import Header from "../../common/Header";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseTable from "./ExpenseTable";
import ExpenseModal from "./ExpenseModal";
import AddExpenseButton from "./AddExpenseButton";

const STORAGE_KEY = "savedAiPlanData";

const ExpenseTracker = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Read aiPlan and destination from location.state or fallback to sessionStorage
  const [aiPlan, setAiPlan] = useState(() => {
    if (location.state?.aiPlan) return location.state.aiPlan;
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.aiPlan || null;
    }
    return null;
  });

  const [destination, setDestination] = useState(() => {
    if (location.state?.destination) return location.state.destination;
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.destination || null;
    }
    return null;
  });

  // If missing critical data, redirect to home or some fallback
  useEffect(() => {
    if (!aiPlan || !destination) {
      alert("Missing plan data. Redirecting to home.");
      navigate("/");
    }
  }, [aiPlan, destination, navigate]);

  // Save aiPlan and destination to sessionStorage for persistence
  useEffect(() => {
    if (aiPlan && destination) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ aiPlan, destination }));
    }
  }, [aiPlan, destination]);

  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    forWhat: "",
    whoSpent: "",
    category: "",
    amount: "",
    date: "",
  });

  const sectionRefs = useRef({});

  const scrollToSection = (section) => {
    sectionRefs.current[section]?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddExpense = () => {
    const { forWhat, whoSpent, category, amount, date } = formData;
    if (!forWhat || !whoSpent || !category || !amount || !date) return;

    const newExpense = {
      ...formData,
      amount: parseFloat(amount),
    };
    setExpenses([...expenses, newExpense]);
    setIsModalOpen(false);
    setFormData({ forWhat: "", whoSpent: "", category: "", amount: "", date: "" });
  };

  const handleDeleteExpense = (index) => {
    const updated = expenses.filter((_, i) => i !== index);
    setExpenses(updated);
  };

  // Render loading or redirect if data missing
  if (!aiPlan || !destination) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar
          scrollToSection={scrollToSection}
          sectionRefs={sectionRefs}
          aiPlan={aiPlan}
          destination={destination}
        />
        <div className="flex flex-col items-center justify-start bg-white p-8 ml-56 w-full mt-16">
          <h2 className="text-2xl font-bold text-black mb-2">
            {expenses.length === 0 ? "You haven't added any Expenses yet!" : "Your Expenses"}
          </h2>
          <p className="text-gray-500 mb-8 text-center">
            Effortlessly Track Your Expenses and Stay On Budget!
          </p>

          {expenses.length === 0 ? (
            <img src="/images/image.png" alt="Expense Illustration" className="w-72 h-auto mb-8" />
          ) : (
            <>
              <ExpenseSummary expenses={expenses} />
              <ExpenseTable expenses={expenses} onDelete={handleDeleteExpense} />
            </>
          )}

          <AddExpenseButton onClick={() => setIsModalOpen(true)} />
        </div>
      </div>

      <ExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleAddExpense}
      />
    </div>
  );
};

export default ExpenseTracker;