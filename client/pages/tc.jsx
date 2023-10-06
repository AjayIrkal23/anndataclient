import React from "react";
const tc = () => {
  return (
    <div>
      <h1 className="md:text-xl  text-black font-semibold text-center my-4 underline text-base">
        Terms and Conditions for Annadata.guru Networking Platform
      </h1>

      <p className="text-italic text-black text-sm px-4 text-center">
        These Terms and Conditions ("Agreement") are a legally binding contract
        between you ("User" or "You") and Annadata.Guru ("Company," "We," "Us,"
        or "Our") governing your access to and use of our Annadata.guru
        networking platform ("Platform" or "Service"). By accessing or using the
        Platform, you agree to be bound by these Terms and Conditions.
      </p>

      <div className="flex flex-col gap-4 px-8 text-sm">
        {" "}
        <div>
          {" "}
          <p className="font-semibold text-lg ">1. Acceptance of Terms</p>
          <ul className="list-disc ">
            <li className="ml-6">
              By accessing or using the Platform, you confirm that you have
              read, understood, and agree to comply with these Terms and
              Conditions, as well as our Privacy Policy.
            </li>
            <li className="ml-6">
              You are responsible for safeguarding your account credentials
              (e.g., username and password) and for any activities or actions
              conducted under your account.
            </li>
          </ul>
        </div>
        <div>
          {" "}
          <h2 className="font-semibold text-lg ">2. User Content</h2>
          <ul className="list-disc ">
            <li className="ml-6">
              You are solely responsible for any content, information, or
              materials you upload, post, or otherwise provide on or through
              Annadata.guru ("User Content").
            </li>
            <li className="ml-6">
              You grant the Company a non-exclusive, worldwide, royalty-free,
              sublicensable, transferable, and perpetual license to use,
              display, reproduce, distribute, modify, and create derivative
              works from your User Content for the purpose of operating and
              promoting Annadata.guru.
            </li>
          </ul>
        </div>
        <div>
          {" "}
          <h2 className="font-semibold text-lg ">3. Prohibited Activities</h2>
          <ul className="list-disc">
            <p className="">
              You agree not to engage in any of the following activities on
              Annadata.guru:
            </p>
            <li className="ml-6">
              Violating any applicable laws, regulations, or third-party rights.
            </li>
            <li className="ml-6">
              Transmitting spam, viruses, or any other harmful code.
            </li>
            <li className="ml-6">
              Impersonating another person or entity or using a false identity.
            </li>
            <li className="ml-6">
              Using Annadata.guru for any illegal or unauthorized purpose.
            </li>
            <li className="ml-6">
              Attempting to interfere with, compromise the security of, or
              disrupt Annadata.guru.
            </li>
          </ul>
        </div>
        <div>
          {" "}
          <h2 className="font-semibold text-lg ">5. Intellectual Property</h2>
          <ul className="list-disc">
            {" "}
            <li className="ml-6">
              Annadata.guru and its content, including but not limited to text,
              graphics, logos, images, and software, are protected by copyright,
              trademark, and other intellectual property laws.
            </li>
            <li className="ml-6">
              You may not use, reproduce, distribute, or create derivative works
              based upon any part of Annadata.guru without the prior written
              consent of the Company.
            </li>
          </ul>
        </div>
        <div>
          {" "}
          <h2 className="font-semibold text-lg ">
            6. Disclaimer of Warranties
          </h2>
          <ul className="list-disc">
            <li className="ml-6">
              Annadata.guru is provided "as is" and "as available," without any
              warranties of any kind, whether express or implied.
            </li>
            <li className="ml-6">
              We do not warrant that Annadata.guru will be error-free,
              uninterrupted, secure, or free from viruses or other harmful
              components.
            </li>
          </ul>
        </div>
        <div>
          {" "}
          <h2 className="font-semibold text-lg ">7. Limitation of Liability</h2>
          <ul className="list-disc">
            <li className="ml-6">
              To the maximum extent permitted by applicable law, the Company and
              its affiliates shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages, or any loss of
              profits or revenues, whether incurred directly or indirectly.
            </li>
            <li className="ml-6">
              The Company's maximum aggregate liability for any claims arising
              out of or related to these Terms and Conditions shall not exceed
              the amount you have paid to us in the preceding six (6) months.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-lg ">8. Termination</h2>
          <ul className="list-disc">
            <li className="ml-6">
              We reserve the right to suspend or terminate your access to
              Annadata.guru at any time, with or without cause, without notice
              or liability.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-lg ">9. Governing Law</h2>
          <ul className="list-disc">
            <li className="ml-6">
              These Terms and Conditions shall be governed by and construed in
              accordance with the laws of [Your Jurisdiction], without regard to
              its conflict of law principles.
            </li>
          </ul>
        </div>
        <div>
          {" "}
          <h2 className="font-semibold text-lg ">10. Contact Information</h2>
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
              We reserve the right to modify or revise these Terms and
              Conditions at any time. We will provide notice of any significant
              changes. Your continued use of Annadata.guru after such
              modifications or revisions constitutes your acceptance of the
              updated Terms and Conditions.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default tc;
