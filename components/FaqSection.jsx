import React from "react";
import FaqList from "./FaqList";

const FaqSection = () => {
  return (
    <div>
      <section className="relative mt-6 py-12 bg-[whitesmoke] overflow-hidden">
        <div className="relative z-10 container px-4 mx-auto">
          <div className="md:max-w-4xl mx-auto">
            <p className="mb-2 text-sm text-indigo-600 text-center font-semibold uppercase tracking-px">
              Have any questions?
            </p>
            <h2 className="mb-16 text-4xl md:text-8xl xl:text-5xl text-center font-bold font-heading tracking-px-n leading-none">
              Frequently Asked Questions
            </h2>
            <FaqList />
            <p className="text-gray-600 text-center font-medium">
              <span>Still have any questions?</span>
            </p>
            <p className="font-semibold cursor-pointer text-indigo-600 text-center hover:text-indigo-700">
              Contact us
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FaqSection;
