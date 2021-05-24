import { buildFeedBackPath, extractFeedback } from '../api/feedback';

const Feedback = props => {
  return (
    <ul>
      {props.feedbackItems.map(feedbackItem =>(
       <li key={feedbackItem.id}>{feedbackItem.text}</li> )
      )}
    </ul>
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

