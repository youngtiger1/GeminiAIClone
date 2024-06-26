import { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

  const handleInputChange = (e) => {
    setInput(e.target.value); // Update input state with user input
  };

  const handleSendMessage = () => {
    onSent(); // Call the onSent function
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Function to check if the response contains code blocks
  const containsCode = (text) => /```[\s\S]*?```/.test(text);

  return (
    <div className="main">
      <div className="nav">
        <p>nikki.ai</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Im nikki developed by luxeenet platform.</span>
              </p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              <div className="card">
                <p>Is mojo a programming Language,Explain it!</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>What are some necessary skills to improve yourself?</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Add some comments to the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
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
                // Check if the response contains code blocks
                containsCode(resultData) ? (
                  // If it contains code, render it in a code viewer
                  <pre className="code-viewer">{resultData}</pre>
                ) : (
                  // If not, render it in a regular viewer
                  <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                )
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={handleInputChange}
              value={input}
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
          </div>
          <p className="bottom-info">
            Nikki.ai still in beta version,  may display inaccurate info, including about people, so double-check its responses. contact us via luxeenet@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;

