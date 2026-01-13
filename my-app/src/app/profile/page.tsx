'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaUser, FaEdit, FaSave, FaTimes, FaCamera, FaLinkedin, FaTwitter, FaGithub, FaGlobe } from 'react-icons/fa';
import Link from 'next/link';

const ProfilePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const account = searchParams.get('account') || 'Not Connected';
  const balance = searchParams.get('balance') || '0 QST';

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    bio: '',
    email: '',
    location: '',
    profileImage: 'https://img.freepik.com/premium-photo/3d-style-avatar-profile-picture-featuring-male-character-generative-ai_739548-13626.jpg',
    coverImage: 'https://png.pngtree.com/thumb_back/fw800/background/20230715/pngtree-d-rendering-of-a-relaxed-brunette-man-working-from-home-on-image_3850186.jpg',
    socialLinks: {
      linkedin: '',
      twitter: '',
      github: '',
      website: '',
    },
    skills: [],
    completedBounties: 0,
    earnedTokens: 0,
    reputation: 0,
  });

  const [formData, setFormData] = useState(profileData);
  const [newSkill, setNewSkill] = useState('');

  // Load profile data from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setProfileData(parsed);
        setFormData(parsed);
      } catch (e) {
        console.error('Error loading profile:', e);
      }
    }
  }, []);

  // Save profile data to localStorage
  const handleSave = () => {
    setProfileData(formData);
    localStorage.setItem('userProfile', JSON.stringify(formData));
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSocialChange = (platform: string, value: string) => {
    setFormData({
      ...formData,
      socialLinks: {
        ...formData.socialLinks,
        [platform]: value,
      },
    });
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      });
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index),
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, imageType: 'profileImage' | 'coverImage') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({
          ...formData,
          [imageType]: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-10">
      {/* Cover Image Section */}
      <div className="relative w-full">
        <div
          className="w-full h-64 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${isEditing ? formData.coverImage : profileData.coverImage})` }}
        >
          {isEditing && (
            <label className="absolute bottom-4 right-4 bg-purple-600 text-white px-3 py-2 rounded-lg cursor-pointer flex items-center space-x-2 hover:bg-purple-700">
              <FaCamera />
              <span>Change Cover</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, 'coverImage')}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Profile Section */}
        <div className="max-w-6xl mx-auto px-4 relative -mt-24">
          <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
            {/* Profile Picture */}
            <div className="relative">
              <img
                src={isEditing ? formData.profileImage : profileData.profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-gray-900 object-cover"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer hover:bg-purple-700">
                  <FaCamera className="text-lg" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'profileImage')}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 bg-gray-800 px-6 py-4 rounded-lg w-full md:w-auto">
              {!isEditing ? (
                <div>
                  <h1 className="text-3xl font-bold text-white">{profileData.name || 'Your Name'}</h1>
                  <p className="text-gray-400 mt-2">{profileData.bio || 'Add a bio to tell others about yourself'}</p>
                  <div className="flex items-center space-x-4 mt-4 text-sm">
                    <span className="text-purple-400">📍 {profileData.location || 'Location'}</span>
                    <span className="text-gray-400">|</span>
                    <span className="text-yellow-400">⭐ {profileData.reputation || 0}/5.0</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                  />
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Bio"
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                    rows={3}
                  />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Location"
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* Edit/Save Button */}
            <div className="flex space-x-2">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-700"
                >
                  <FaEdit />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700"
                  >
                    <FaSave />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData(profileData);
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-700"
                  >
                    <FaTimes />
                    <span>Cancel</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <p className="text-gray-400 text-sm">Wallet Address</p>
              <p className="text-white font-bold mt-2 truncate">{account}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <p className="text-gray-400 text-sm">Balance</p>
              <p className="text-purple-400 font-bold text-xl mt-2">{balance}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <p className="text-gray-400 text-sm">Completed Bounties</p>
              <p className="text-green-400 font-bold text-xl mt-2">{profileData.completedBounties}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <p className="text-gray-400 text-sm">Total Earned</p>
              <p className="text-yellow-400 font-bold text-xl mt-2">{profileData.earnedTokens} QST</p>
            </div>
          </div>

          {/* Contact & Social Section */}
          {isEditing && (
            <div className="bg-gray-800 p-6 rounded-lg mt-8">
              <h2 className="text-xl font-bold text-white mb-4">Contact Information</h2>
              <div className="space-y-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Social Links Section */}
          <div className="bg-gray-800 p-6 rounded-lg mt-8">
            <h2 className="text-xl font-bold text-white mb-4">Social Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {!isEditing ? (
                <div className="space-y-3">
                  {profileData.socialLinks.linkedin && (
                    <a
                      href={profileData.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-blue-400 hover:text-blue-300"
                    >
                      <FaLinkedin />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {profileData.socialLinks.twitter && (
                    <a
                      href={profileData.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-blue-300 hover:text-blue-200"
                    >
                      <FaTwitter />
                      <span>Twitter</span>
                    </a>
                  )}
                  {profileData.socialLinks.github && (
                    <a
                      href={profileData.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-300 hover:text-white"
                    >
                      <FaGithub />
                      <span>GitHub</span>
                    </a>
                  )}
                  {profileData.socialLinks.website && (
                    <a
                      href={profileData.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-purple-400 hover:text-purple-300"
                    >
                      <FaGlobe />
                      <span>Website</span>
                    </a>
                  )}
                </div>
              ) : (
                <div className="space-y-4 md:col-span-2">
                  <div>
                    <label className="text-gray-300 flex items-center space-x-2 mb-2">
                      <FaLinkedin />
                      <span>LinkedIn</span>
                    </label>
                    <input
                      type="url"
                      value={formData.socialLinks.linkedin}
                      onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 flex items-center space-x-2 mb-2">
                      <FaTwitter />
                      <span>Twitter</span>
                    </label>
                    <input
                      type="url"
                      value={formData.socialLinks.twitter}
                      onChange={(e) => handleSocialChange('twitter', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 flex items-center space-x-2 mb-2">
                      <FaGithub />
                      <span>GitHub</span>
                    </label>
                    <input
                      type="url"
                      value={formData.socialLinks.github}
                      onChange={(e) => handleSocialChange('github', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 flex items-center space-x-2 mb-2">
                      <FaGlobe />
                      <span>Website</span>
                    </label>
                    <input
                      type="url"
                      value={formData.socialLinks.website}
                      onChange={(e) => handleSocialChange('website', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-gray-800 p-6 rounded-lg mt-8">
            <h2 className="text-xl font-bold text-white mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {(isEditing ? formData.skills : profileData.skills).map((skill, index) => (
                <div
                  key={index}
                  className="bg-purple-600 text-white px-3 py-1 rounded-full flex items-center space-x-2 text-sm"
                >
                  <span>{skill}</span>
                  {isEditing && (
                    <button
                      onClick={() => removeSkill(index)}
                      className="hover:text-red-300"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            {isEditing && (
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addSkill();
                    }
                  }}
                  placeholder="Add a new skill..."
                  className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                />
                <button
                  onClick={addSkill}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  Add
                </button>
              </div>
            )}
          </div>

          {/* Actions Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <Link href="/home">
              <button className="w-full bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 font-semibold transition">
                Back to Home
              </button>
            </Link>
            <button className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-semibold transition">
              View My Submissions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
