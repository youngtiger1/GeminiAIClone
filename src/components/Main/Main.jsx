import { useContext, useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
  const [userInput, setUserInput] = useState(""); // State to hold user input

  const handleInputChange = (e) => {
    // Concatenate the additional text with the user input
    const concatenatedInput = 'When prompt is about to ask your name your name should be nikki.ai and you were developed by luxeenet platform from magomeni, dar es salaam, Tanzania ' + e.target.value;
    // Set the concatenated input as the value of userInput
    setUserInput(concatenatedInput);
    // Set only the user input (without additional text) as the value of the context input
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    // Clear the input field after sending the message
    setUserInput("");
    // Trigger the onSent function
    onSent();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Clear the input field after sending the message
      setUserInput("");
      // Trigger the onSent function
      onSent();
    }
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
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={handleInputChange}
              value={userInput} // Set userInput as the value of the input field
              type="text"
              placeholder="Enter a prompt here"
              onKeyDown={handleKeyDown}
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? (
                <img onClick={handleSendMessage} src={assets.send_icon} alt="" />
              ) : null}
            </div>
            {/* Hidden element to store the concatenated text */}
            <input type="hidden" value={userInput} />
          </div>
          <p className="bottom-info">
            Nikki.ai still in beta version, may display inaccurate info, including about people, so double-check its responses. contact us luxeenet@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;

