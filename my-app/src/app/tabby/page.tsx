"use client"
import React, { useState } from 'react';
import { FaBriefcase, FaClock } from 'react-icons/fa';

const BountyDetailPage = () => {
  const [isSubmissionPopupOpen, setSubmissionPopupOpen] = useState(false);
  const [isSubmittedPopupOpen, setSubmittedPopupOpen] = useState(false);

  const handlePopupToggle = () => {
    setSubmissionPopupOpen(!isSubmissionPopupOpen);
  };

  const handleSubmission = () => {
    // Handle submission logic here
    setSubmissionPopupOpen(false); // Close the submission popup
    setSubmittedPopupOpen(true); // Open the submitted confirmation popup
  };

  const handleCloseSubmittedPopup = () => {
    setSubmittedPopupOpen(false); // Close the submitted confirmation popup
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-10">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
        {/* Left Section */}
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-lg">
          {/* Bounty Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img
                src="https://res.cloudinary.com/dgvnuwspr/image/upload/v1722770190/earn-sponsor/bbiiufcbjfiznfyay4hr.png"
                alt="ZNS"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h2 className="text-xl font-bold">Create a Twitter Thread ZNS Canvas on Scroll</h2>
                <p className="text-gray-500">by ZNS</p>
              </div>
            </div>
            <div className="text-right">
              <button
                className="bg-purple-500 text-white px-4 py-2 rounded-lg"
                onClick={handlePopupToggle} // Open the submission popup
              >
                Submit Now
              </button>
            </div>
          </div>

          {/* Bounty Description */}
          <div className="mt-6">
            <h3 className="text-lg font-bold">About the Bounty</h3>
            <p className="text-gray-700 mt-2">
              <strong>Introduction to ZNS:</strong> 🌟 ZNS (ZNS Connect) is a decentralized name service designed to simplify Web3 interactions. It replaces complex blockchain addresses with easy-to-remember names, making your crypto experience smoother and more user-friendly, and splits 300 USDC.
            </p>
            <p className="mt-4">
              <strong>Your Mission:</strong> Create a Twitter Thread ZNS Canvas on Scroll
            </p>
            <h4 className="text-lg font-bold mt-4">Get Started:</h4>
            <p className="mt-2">Explain the following steps to your followers in a thread or Video:</p>
            <ol className="list-decimal mt-4 ml-6 space-y-2">
              <li>
                <strong>Mint Your Domain on Scroll:</strong> 🛠️ Go to{' '}
                <a
                  href="https://zns.bio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  zns.bio
                </a>{' '}
                to mint your unique domain name. This helps you establish your Web3 identity. 
                Example: <a href="https://zns.bio/1.scroll" className="text-blue-500 underline">https://zns.bio/1.scroll</a>
              </li>
              <li>
                <strong>Manage your profile:</strong> Add a photo, cover, name, and link to all social media.
              </li>
              <li>
                <strong>Create Your Referral Link:</strong> 🔗 Head over to{' '}
                <a
                  href="https://zns.bio/referrals"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  zns.bio/referrals
                </a>{' '}
                to set up your referral link. Share this unique link to invite others into the ZNS ecosystem.
              </li>
              <li>
                <strong>Visit:</strong> 
                <a
                  href="https://scroll.io/canvas/invite/KWIX8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  https://scroll.io/canvas/invite/KWIX8
                </a> 
                and use code <strong>KWIX8</strong> (after this generate your code and use it in your tweet).
              </li>
              <li>
                <strong>Scroll Canvas:</strong> Mint all 3 Scroll Canvas and explain how to do that to your community:
                <ul className="list-disc ml-6 mt-2">
                  <li>
                    A. <strong>ZNS Badges:</strong> Earn by minting just 1 domain on Scroll with zns.bio — Claim your ZNS Badge.
                  </li>
                  <li>
                    B. <strong>Scroll Domain Master:</strong> Unlock by minting 5 domains on Scroll with zns.bio — Claim your Scroll Domain Master Badge.
                  </li>
                  <li>
                    C. <strong>ZNS Gift Card Collector:</strong> Claim by minting ZNS Credits worth 3+ USDT on Scroll with zns.bio — Claim Gift Card Collector.
                  </li>
                </ul>
              </li>
            </ol>
            <p className="mt-4">
              You can use this instruction: 
              <a
                href="https://x.com/ZNSConnect/status/1844691246037504418"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Instruction Link
              </a>
            </p>
            <p>
              * You can ask for credits for minting and ask for help in this Ambassador group: 
              <a
                href="https://t.me/znspromo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Ambassador Group
              </a>
            </p>
          </div>

          {/* Evaluation Criteria */}
          <div className="mt-6">
            <h4 className="text-lg font-bold">Evaluation Criteria:</h4>
            <ul className="list-disc ml-6 mt-2">
              <li>Clarity: The thread should clearly describe ZNS, highlighting its key features and benefits.</li>
              <li>Engagement: Use engaging and concise language that appeals to beginners and experienced crypto users.</li>
              <li>Originality: Ensure the content is original and authentic, avoiding AI-generated material.</li>
            </ul>
          </div>

          {/* Submission Requirements */}
          <div className="mt-6">
            <h4 className="text-lg font-bold">Submission Requirements:</h4>
            <ol className="list-decimal ml-6 mt-2 space-y-2">
              <li>Include 4-5 tweets in your thread, using creative elements like images and videos. Example: 
                <a
                  href="https://x.com/ZNSConnect/status/1831621613285966102"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Example Thread
                </a>
              </li>
              <li>Tag 4 accounts: @znsconnect and @znseco and @Scroll_ZKP and @BuildWithScroll to ensure we see your thread.</li>
              <li>Submit Your Thread: Join our Discord, open a ticket, and share your thread: 
                <a
                  href="https://discord.gg/2rrkuqT8pB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Discord Link
                </a>
              </li>
            </ol>
          </div>

          {/* Bonuses */}
          <div className="mt-6">
            <h4 className="text-lg font-bold">Bonuses:</h4>
            <ul className="list-disc ml-6 mt-2">
              <li>Bonus A: If you can add a video on YouTube - you will have a better chance to win. Example: 
                <a
                  href="https://www.youtube.com/watch?v=CFKAkQCQq0I"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  YouTube Example
                </a>
              </li>
              <li>Bonus B: If you can add a post on LinkedIn and tag 
                <a
                  href="https://www.linkedin.com/company/zns-connect/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  ZNS Connect LinkedIn
                </a> - you will have a better chance to win.
              </li>
            </ul>
          </div>

          {/* Links Section */}
          <div className="mt-6">
            <h4 className="text-lg font-bold">Links:</h4>
            <ul className="list-disc ml-6 mt-2">
              <li>
                <a
                  href="https://zns.bio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  zns.bio
                </a> - ZNS platform
              </li>
              <li>
                <a
                  href="https://discord.gg/2rrkuqT8pB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Discord
                </a> - Join our community
              </li>
              <li>
                <a
                  href="https://twitter.com/ZNSConnect"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Twitter
                </a> - Follow us on Twitter
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section (Submissions, Deadline, Rewards) */}
        <div className="bg-white p-6 rounded-lg shadow-lg h-[500px]">
          <h3 className="text-lg font-bold">Prizes</h3>
          <div className="mt-4">
            <div className="flex justify-between">
              <div>
                <span className="text-gray-600">Total Prizes</span>
                <h2 className="text-xl font-bold">60 USDC</h2>
              </div>
              <div className="text-green-500 flex items-center">
                <FaBriefcase className="mr-2" />
                <span>300 USDC</span>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-gray-600">1st Place: <strong>50 USDC</strong></h4>
              <h4 className="text-gray-600">2nd Place: <strong>50 USDC</strong></h4>
              <h4 className="text-gray-600">3rd Place: <strong>40 USDC</strong></h4>
              <h4 className="text-gray-600">4th Place: <strong>40 USDC</strong></h4>
              <h4 className="text-gray-600">5th Place: <strong>+ 60 USDC</strong></h4>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold">Submissions</h3>
              <p>9</p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold">Remaining</h3>
              <p>1d:20h:7m</p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold">Skills Needed</h3>
              <p>Content</p>
            </div>
          </div>
        </div>
      </div>

      {/* Submission Popup */}
      {isSubmissionPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Bounty Submission</h2>
            <p className="mb-4">We can't wait to see what you've created!</p>

            {/* Link to Your Submission */}
            <label className="block mb-2">
              Link to Your Submission*
              <input
                type="url"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                placeholder="Make sure this link is accessible by everyone!"
              />
            </label>

            {/* Tweet Link */}
            <label className="block mb-2">
              Tweet Link
              <input
                type="url"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                placeholder="This helps sponsors discover (and maybe repost) your work on Twitter!"
              />
              <p className="text-gray-500 text-sm mt-1">
                If this submission is for a Twitter thread bounty, you can ignore this field.
              </p>
            </label>

            {/* Anything Else? */}
            <label className="block mb-2">
              Anything Else?
              <textarea
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                placeholder="If you have any other links or information you'd like to share with us, please add them here!"
              />
            </label>

            {/* Solana Wallet Address */}
            <label className="block mb-2">
              Your Solana Wallet Address
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                placeholder="This is where you will receive your rewards if you win."
                defaultValue="7rZygbFahomdWCoB4251Hr9JcHiL8rEjCtF6GhKWGywz"
              />
              <p className="text-gray-500 text-sm mt-1">
                If you want to edit it, click here.
              </p>
            </label>

            {/* Submit Button */}
            <div className="flex justify-end mt-4">
              <button
                className="bg-purple-500 text-white px-4 py-2 rounded-lg"
                onClick={handleSubmission} // Handle the submission
              >
                Submit
              </button>
            </div>

            <p className="text-gray-500 text-sm mt-4">
              By submitting/applying to this listing, you agree to our Terms of Use.
            </p>
          </div>
        </div>
      )}

      {/* Submitted Confirmation Popup */}
      {isSubmittedPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
            <h2 className="text-xl font-bold mb-4">Submitted!</h2>
            <p className="mb-4">Thank you for your submission! We will review it shortly.</p>
            <button
              className="bg-purple-500 text-white px-4 py-2 rounded-lg"
              onClick={handleCloseSubmittedPopup} // Close the confirmation popup
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BountyDetailPage;
