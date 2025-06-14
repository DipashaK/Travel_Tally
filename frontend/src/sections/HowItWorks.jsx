// import React, { useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const HowItWorks = () => {
//   useEffect(() => {
//     AOS.init({ duration: 1000 });
//   }, []);

//   return (
//     <section className="h-screen flex flex-col justify-center items-center bg-white text-center pb-32">
//       <h2 className="text-blue-600 font-bold text-4xl mb-6 mt-[-60px]">How it works?</h2>
//       <h3 className="text-4xl font-extrabold">Craft Your Ideal Journey Swiftly</h3>

//       <div className="flex items-center mt-10 space-x-16">
//         <div data-aos="fade-up" className="text-center w-52">
//           <div className="bg-gray-100 p-6 rounded-lg shadow-md h-40 flex justify-center items-center">
//             <span className="text-blue-600 text-4xl">➡️</span>
//           </div>
//           <h4 className="mt-4 text-lg font-bold">Login</h4>
//           <p className="text-gray-600">Log in to start your journey.</p>
//         </div>
//      <div className="w-32 mt-[-80px]">
//        <svg
//         width="120"
//         height="80"
//         viewBox="0 0 120 80"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M10 60 Q40 10, 60 40 Q80 70, 110 50"
//           stroke="gray"
//           strokeDasharray="5,5"
//           strokeWidth="2"
//           fill="transparent"
//         />
//         <polygon points="105,45 120,50 109,55" fill="gray" />
//       </svg>
//     </div>
//         <div data-aos="fade-up" className="text-center w-52">
//           <div className="bg-gray-100 p-6 rounded-lg shadow-md h-40 flex justify-center items-center">
//             <span className="text-blue-600 text-4xl">💡</span>
//           </div>
//           <h4 className="mt-4 text-lg font-bold">Key in the travel idea</h4>
//           <p className="text-gray-600">Tell us about your ideal trip.</p>
//         </div>
//      <div className="w-32 mt-[-80px]">
//        <svg
//         width="120"
//         height="80"
//         viewBox="0 0 120 80"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M10 60 Q40 10, 60 40 Q80 70, 110 50"
//           stroke="gray"
//           strokeDasharray="5,5"
//           strokeWidth="2"
//           fill="transparent"
//         />
//         <polygon points="105,45 120,50 109,55" fill="gray" />
//       </svg>
//     </div>
//         <div data-aos="fade-up" className="text-center w-52">
//           <div className="bg-gray-100 p-6 rounded-lg shadow-md h-40 flex justify-center items-center">
//             <span className="text-blue-600 text-4xl">✈️</span>
//           </div>
//           <h4 className="mt-4 text-lg font-bold">Get AI Plan</h4>
//           <p className="text-gray-600">
//             Get your AI-driven tailored travel plan.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HowItWorks;























import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const HowItWorks = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const steps = [
    {
      icon: "➡️",
      title: "Login",
      description: "Log in to start your journey."
    },
    {
      icon: "💡",
      title: "Key in the travel idea",
      description: "Tell us about your ideal trip."
    },
    {
      icon: "✈️",
      title: "Get AI Plan",
      description: "Get your AI-driven tailored travel plan."
    }
  ];

  return (
    <section className="py-24 bg-white text-center">
      <h2 className="text-blue-600 font-bold text-4xl mb-4">How it works?</h2>
      <h3 className="text-3xl md:text-4xl font-extrabold mb-12">
        Craft Your Ideal Journey Swiftly
      </h3>

      <div className="flex flex-wrap justify-center gap-10 px-4">
        {steps.map((step, idx) => (
          <div
            key={idx}
            data-aos="fade-up"
            data-aos-delay={idx * 200}
            className="w-72 bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
          >
            <div className="text-blue-600 text-5xl mb-4">{step.icon}</div>
            <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
