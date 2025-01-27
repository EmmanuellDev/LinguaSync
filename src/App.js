import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("es");

  // List of languages supported (You can expand this list)
  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "hi", name: "Hindi" },
    { code: "zh", name: "Chinese" },
  ];

  // Function to call LibreTranslate API
  const translateText = async (text, sourceLang, targetLang) => {
    try {
      const response = await axios.post("https://libretranslate.de/translate", {
        q: text,
        source: sourceLang,
        target: targetLang,
        format: "text",
      });

      // Extract translated text from the response
      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error("Error translating text:", error);
      setTranslatedText("Translation failed. Please try again.");
    }
  };

  // Trigger translation whenever the source text or languages change
  useEffect(() => {
    if (sourceText.trim()) {
      translateText(sourceText, sourceLang, targetLang);
    } else {
      setTranslatedText(""); // Clear the output if input is empty
    }
  }, [sourceText, sourceLang, targetLang]); // Dependencies

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl flex gap-4">
        {/* Left Section - Input */}
        <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Input</h2>
          <textarea
            className="w-full h-64 p-4 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter text to translate"
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
          />
          {/* Language Selectors for Input */}
          <div className="flex space-x-4">
            <select
              className="flex-1 p-2 border rounded"
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
            <select
              className="flex-1 p-2 border rounded"
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Section - Output */}
        <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Output</h2>
          <textarea
            className="w-full h-64 p-4 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={translatedText}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default App;
