// import React from "react";

// const SearchBar = ({ searchQuery, setSearchQuery, onOpenModal }) => {
//   return (
//     <div className="p-6 flex justify-between items-center bg-purple-100">
//       <input
//         type="text"
//         placeholder="Search Travel Plans..."
//         className="px-4 py-2 border rounded-lg w-1/2"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//       />
//       {/* Button triggers modal */}
//       <button
//         className="bg-blue-200 text-black px-4 py-2 rounded-lg hover:bg-blue-400"
//         onClick={onOpenModal}  
//       >
//         <span>Create Travel Plan</span>
//       </button>
//     </div>
//   );
// };

// export default SearchBar;




















// SearchBar.js
import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery, onOpenModal }) => {
  return (
    <div className="p-6 flex flex-col sm:flex-row gap-4 sm:justify-between items-center bg-white shadow-sm rounded-xl mx-6 mt-6">
      <input
        type="text"
        placeholder="Search Travel Plans..."
        className="px-4 py-2 border border-gray-300 rounded-lg w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all shadow"
        onClick={onOpenModal}
      >
        ➕ Create Travel Plan
      </button>
    </div>
  );
};

export default SearchBar;