import { useState } from "react";
import { Dice6, MapPin, Globe, ChevronDown } from "lucide-react";
import { authStore } from "../store/authStore";
import { useAuth } from "../customHooks/useAuth";
import { showErrorToast, showSuccessToast } from "../utils/toast";

export default function CompleteProfile() {
  const { authUser } = authStore();
  const {onboarding,onBoard}=useAuth()
  console.log(authUser);

  const [formData, setFormData] = useState({
    bio: "",
    updatedPic: authUser?.profilePic,
    nativeLanguage: "",
    learningLanguage: "",
    location: "",
  });

  const [showNativeDropdown, setShowNativeDropdown] = useState(false);
  const [showLearningDropdown, setShowLearningDropdown] = useState(false);

 const languages = [
  "🇬🇧 English",
  "🇪🇸 Spanish",
  "🇫🇷 French",
  "🇩🇪 German",
  "🇮🇹 Italian",
  "🇵🇹 Portuguese",
  "🇯🇵 Japanese",
  "🇨🇳 Chinese (Mandarin)",
  "🇰🇷 Korean",
  "🇸🇦 Arabic",
  "🇷🇺 Russian",
  "🇮🇳 Hindi",
  "🇵🇰 Urdu",
  "🇹🇷 Turkish",
  "🇳🇱 Dutch",
  "🇬🇷 Greek",
  "🇵🇱 Polish",
  "🇮🇱 Hebrew",
  "🇹🇭 Thai",
  "🇻🇳 Vietnamese",
  "🇮🇩 Indonesian",
  "🇵🇭 Filipino (Tagalog)",
  "🇲🇾 Malay",
  "🇸🇪 Swedish",
  "🇳🇴 Norwegian",
  "🇩🇰 Danish",
  "🇫🇮 Finnish",
  "🇨🇿 Czech",
  "🇸🇰 Slovak",
  "🇭🇺 Hungarian",
  "🇷🇴 Romanian",
  "🇧🇬 Bulgarian",
  "🇺🇦 Ukrainian",
  "🇧🇾 Belarusian",
  "🇷🇸 Serbian",
  "🇭🇷 Croatian",
  "🇧🇦 Bosnian",
  "🇸🇮 Slovenian",
  "🇦🇱 Albanian",
  "🇲🇰 Macedonian",
  "🇬🇪 Georgian",
  "🇦🇲 Armenian",
  "🇮🇷 Persian (Farsi)",
  "🇵🇱 Lithuanian",
  "🇱🇻 Latvian",
  "🇪🇪 Estonian",
  "🇮🇸 Icelandic",
  "🇮🇪 Irish (Gaelic)",
  "🏴 Welsh",
  "🇸🇴 Somali",
  "🇪🇹 Amharic"
];


  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generateRandomAvatar = () => {
    const seed = Math.floor(Math.random() * 10000);
    const randomAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
    handleInputChange("updatedPic", randomAvatar);
  };

  const handleCompleteOnboarding = async () => {
  const { bio, updatedPic, nativeLanguage, learningLanguage, location } = formData;

  if (!bio || !updatedPic || !nativeLanguage || !learningLanguage || !location) {
    showErrorToast("Please fill out all fields before continuing.");
    return;
  }

  await onBoard(formData);
};


  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-xl space-y-4">
        <div className="text-center">
          <h1 className="text-md md:text-xl lg:text-2xl font-semibold text-green-600 mb-8">
            Complete On-boarding to get started
          </h1>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
            <img
              src={formData.updatedPic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <button
            onClick={generateRandomAvatar}
            className="bg-green-500 cursor-pointer hover:bg-green-600 text-black font-medium px-6 py-2 rounded-full flex items-center gap-2 transition-colors"
          >
            <Dice6 className="w-4 h-4" />
            Generate Random Picture
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-gray-300 text-sm block">
              Name
            </label>

            <p className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent">
              {authUser?.name}
            </p>
          </div>
          <form>
            <div className="space-y-2 mb-2">
              <label htmlFor="bio" className="text-gray-300 text-sm block">
                Bio
              </label>
              <textarea
                id="bio"
                placeholder="Tell others about yourself and your language learning goals"
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 text-sm text-white placeholder-gray-500 rounded-lg px-3 py-2 min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-gray-300 text-sm block">
                  Native Language
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowNativeDropdown(!showNativeDropdown);
                    }}
                    className="w-full text-sm bg-gray-900 border border-gray-700 text-white rounded-lg px-3 py-2 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <span
                      className={
                        formData.nativeLanguage ? "text-white" : "text-gray-500"
                      }
                    >
                      {formData.nativeLanguage || "German"}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                  {showNativeDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
                      {languages.map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            handleInputChange("nativeLanguage", lang);
                            setShowNativeDropdown(false);
                          }}
                          className="w-full text-left px-3 py-2 text-white hover:bg-gray-800 transition-colors"
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2 ">
                <label className="text-gray-300 text-sm block">
                  Learning Language
                </label>
                <div className="relative">
                  <button
                   type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowLearningDropdown(!showLearningDropdown);
                    }}
                    className="w-full text-sm bg-gray-900 border border-gray-700 text-white rounded-lg px-3 py-2 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <span
                      className={
                        formData.learningLanguage
                          ? "text-white"
                          : "text-gray-500"
                      }
                    >
                      {formData.learningLanguage || "Spanish"}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                  {showLearningDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
                      {languages.map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            handleInputChange("learningLanguage", lang);
                            setShowLearningDropdown(false);
                          }}
                          className="w-full text-left px-3 py-2 text-white hover:bg-gray-800 transition-colors"
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="text-gray-300 text-sm block">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  id="location"
                  type="text"
                  placeholder="City, Country"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
          </form>
        </div>

        <button
          onClick={handleCompleteOnboarding}
          className="w-full cursor-pointer bg-green-500 hover:bg-green-600 text-black font-medium py-3 rounded-lg flex items-center justify-center gap-2 mt-8 transition-colors"
        >
          <Globe className="w-4 h-4" />
          {onboarding?'Loading...':'Complete Onboarding'}
        </button>
      </div>
    </div>
  );
}
