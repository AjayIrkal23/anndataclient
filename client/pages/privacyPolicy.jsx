import React from "react";

const privacyPolicy = () => {
  return (
    <div>
      <h1 className="md:text-xl  text-black font-semibold text-center my-4 underline text-base">
        Privacy Policy for Annadata.guru Networking Platform
      </h1>

      <p className="text-italic text-black text-sm px-4 text-center">
        Welcome to Annadata.guru! This Privacy Policy ("Policy") explains how
        AnnadataGuru ("Company," "We," "Us," or "Our") collects, uses, and
        protects your personal information when you access or use our
        Annadata.guru networking platform ("Platform" or "Service").
      </p>

      <div className="flex flex-col gap-4 px-8 text-sm">
        {" "}
        <div>
          {" "}
          <p className="font-semibold text-lg ">1. Information We Collect</p>
          <ul className="list-disc ">
            <li className="ml-6">
              We may collect personal information that you provide directly when
              using our Platform, such as when you register for an account,
              update your profile, or communicate with other users. This
              information may include
            </li>
            <li className="ml-6">
              We may also collect certain information automatically when you use
              our Platform
            </li>
          </ul>
        </div>
        <div>
          {" "}
          <h2 className="font-semibold text-lg ">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc ">
            <p>
              We may use your personal information for the following purposes
            </p>
            <li className="ml-6">
              To provide and improve our Platform and services
            </li>
            <li className="ml-6">To personalize your user experience</li>
            <li className="ml-6">
              To communicate with you, including responding to inquiries and
              providing updates
            </li>
            <li className="ml-6">
              To protect the security and integrity of our Platform
            </li>
            <li className="ml-6">To comply with legal obligations</li>
          </ul>
        </div>
        <div>
          {" "}
          <h2 className="font-semibold text-lg ">
            3. Sharing Your Information
          </h2>
          <ul className="list-disc">
            <p className="">
              You agree not to engage in any of the following activities on
              Annadata.guru:
            </p>
            <li className="ml-6">
              We may share your personal information in the following
              circumstances:
            </li>
            <li className="ml-6">
              With service providers who help us operate the Platform
            </li>
            <li className="ml-6">
              With law enforcement or regulatory authorities when required by
              law
            </li>
            <li className="ml-6">
              In connection with a business transaction (e.g., merger or
              acquisition)
            </li>
          </ul>
        </div>
        <div>
          {" "}
          <h2 className="font-semibold text-lg ">5. Your Choices</h2>
          <p>
            You have choices regarding the personal information you provide to
            us:
          </p>
          <ul className="list-disc">
            {" "}
            <li className="ml-6">
              You can access and update your profile information through your
              account settings.
            </li>
            <li className="ml-6">
              You can opt-out of receiving certain communications from us.
            </li>
            <li className="ml-6">
              You can delete your account, subject to our retention policies.
            </li>
          </ul>
        </div>
        <div>
          {" "}
          <h2 className="font-semibold text-lg ">6. Data Security</h2>
          <ul className="list-disc">
            <li className="ml-6">
              We take measures to protect your personal information from
              unauthorized access and disclosure. However, no data transmission
              over the internet can be guaranteed to be completely secure.
            </li>
          </ul>
        </div>
        <div>
          {" "}
          <h2 className="font-semibold text-lg ">7. Changes to this Policy</h2>
          <ul className="list-disc">
            <li className="ml-6">
              We may update this Privacy Policy to reflect changes in our data
              practices. We will notify you of any significant changes by email
              or by posting a notice on the Platform.
            </li>
          </ul>
        </div>
        <div>
          {" "}
          <h2 className="font-semibold text-lg ">8. Contact Information</h2>
          <ul className="list-disc">
            <li className="ml-6">
              For questions or concerns regarding these Terms and Conditions or
              the use of Annadata.guru, please feel free to contact us at{" "}
              <span>
                {" "}
                <a
                  href="mailto:info.docketrun@docketrun.com"
                  className=" font-semibold underline "
                >
                  Contact Email
                </a>
              </span>{" "}
              .
            </li>
          </ul>
        </div>
        <div className="mb-6">
          {" "}
          <h2 className="font-semibold text-lg ">
            11. Changes to Terms and Conditions
          </h2>
          <ul className="list-disc">
            <li className="ml-6">
              We reserve the right to modify or revise these Policy at any time.
              We will provide notice of any significant changes. Your continued
              use of Annadata.guru after such modifications or revisions
              constitutes your acceptance of the updated Policy.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default privacyPolicy;
