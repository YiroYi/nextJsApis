import { Fragment, useState } from 'react';

import { buildFeedBackPath, extractFeedback } from '../api/feedback';

const Feedback = props => {
  const [feedbackData, setFeedbackData] = useState();

  const loadFeedbackHandler = (id) => {
    fetch(`/api/${id}`)
    .then(response => response.json())
    .then(data => {
      setFeedbackData(data.feedback);
    })
  }

  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map(feedbackItem =>(
         <li key={feedbackItem.id}>{feedbackItem.text}<button onClick={loadFeedbackHandler.bind(null, feedbackItem.id)}>Show Detail</button></li> )
        )}
      </ul>
    </Fragment>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedBackPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbackItems: data
    }
  }
}

export default Feedback;

