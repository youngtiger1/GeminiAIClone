import { useContext, useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const [userInput, setUserInput] = useState("");

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const finalInput =
        input.toLowerCase().includes("bot's name") ||
        input.toLowerCase().includes("your name")
          ? `When user asks about your name or bot's name, your name should be nikki.ai developed by Luxeenet platform from Magomeni, Dar es Salaam, Tanzania. ${userInput}`
          : userInput;
      setInput(finalInput);
      onSent();
      setUserInput(""); // Clear the input field after sending the message
    }
  };

  const handleSendClick = () => {
    const finalInput =
      input.toLowerCase().includes("bot's name") ||
      input.toLowerCase().includes("your name")
        ? `When user asks about your name or bot's name, your name should be nikki.ai developed by Luxeenet platform from Magomeni, Dar es Salaam, Tanzania. ${userInput}`
        : userInput;
    setInput(finalInput);
    onSent();
    setUserInput(""); // Clear the input field after sending the message
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Nikki.ai</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, I'm Nikki.ai model.</span>
              </p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">{/* Card components */}</div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p
                  dangerouslySetInnerHTML={{
                    __html: resultData,
                  }}
                ></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={handleInputChange}
              value={userInput}
              type="text"
              placeholder="Enter a prompt here"
              onKeyDown={handleKeyDown}
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {userInput ? (
                <img
                  onClick={handleSendClick}
                  src={assets.send_icon}
                  alt=""
                />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Nikki.ai still in beta version may display inaccurate info,
            including about people, so double-check its responses. contact us
            luxeenet@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;

