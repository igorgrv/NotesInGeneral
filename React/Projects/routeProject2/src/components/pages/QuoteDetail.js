import { Fragment } from 'react';
import { Route, useParams } from 'react-router-dom';
import Comments from '../comments/Comments';
import HighlightedQuote from '../quotes/HighlightedQuote';

const DUMMY_DATA = [
  {
    id: 1,
    author: 'Igor',
    text: 'My quote 1'
  },
  {
    id: 2,
    author: 'Igor',
    text: 'My quote 2'
  },
  {
    id: 3,
    author: 'Igor',
    text: 'My quote 3'
  },
  {
    id: 4,
    author: 'Igor',
    text: 'My quote 4'
  },
]

const QuoteDetail = () => {
  const params = useParams();
  const quote = DUMMY_DATA.find(quote => quote.id === parseInt(params.quoteId))

  if (!quote) {
    return <p>No quote found</p>
  }

  return (
    <Fragment>
      <HighlightedQuote author={quote.author} text={quote.text} />
      <Route to={`/quotes/${params.quoteId}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
