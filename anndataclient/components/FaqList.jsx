import React from "react";
import FaqSingle from "./FaqSingle";

const FaqList = () => {
  return (
    <div>
      {" "}
      <div className="mb-11 flex flex-wrap -m-1">
        <FaqSingle
          q="Do you provide any free plan?"
          a="Lorem ipsum dolor sit amet, to the consectr adipiscing elit.
              Volutpat tempor to the condi mentum vitae vel purus."
        />
        <FaqSingle
          q="Do you provide Refunds?"
          a="Lorem ipsum dolor sit amet, to the consectr adipiscing elit.
              Volutpat tempor to the condi mentum vitae vel purus."
        />
        <FaqSingle
          q="Do you provide Private Meetings?"
          a="Lorem ipsum dolor sit amet, to the consectr adipiscing elit.
              Volutpat tempor to the condi mentum vitae vel purus."
        />
      </div>
    </div>
  );
};

export default FaqList;
