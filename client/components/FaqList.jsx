import React from "react";
import FaqSingle from "./FaqSingle";

const FaqList = () => {
  return (
    <div>
      {" "}
      <div className="mb-11 flex flex-wrap -m-1">
        <FaqSingle
          q="Do you provide any free plan?"
          a="No we charge 100rps on registration as token amount. there are no free plans."
        />
        <FaqSingle
          q="Do you provide Refunds?"
          a="No we do not provide any refunds."
        />
        <FaqSingle
          q="Do you provide Private Meetings?"
          a="Yes you can have 1:1 private meetings with any user of AandataGuru.AI"
        />
      </div>
    </div>
  );
};

export default FaqList;
