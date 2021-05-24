import { useRef, useState } from 'react';

function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([]);

  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = {
      email: enteredEmail,
      feedback: enteredFeedback
    }
    console.log(reqBody)
    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => console.log(data));
  }

  const loadHandlerFeedback = () => {
    fetch('/api/feedback')
    .then(response => response.json())
    .then(data => {setFeedbackItems(data.feedback)});
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email address</label>
          <input type="email" id="email" ref={emailInputRef}/>
        </div>
        <div>
          <label htmlFor="feedback">Your feedback</label>
          <textarea id="feedback" rows='5' ref={feedbackInputRef}/>
        </div>
        <button>Send feedback</button>
      </form>
      <hr />
      <button onClick={loadHandlerFeedback}>Load feedback</button>
      <ul>{feedbackItems.map(item => <li>{item.text}</li>)}</ul>
    </div>
  );
}

export default HomePage;
