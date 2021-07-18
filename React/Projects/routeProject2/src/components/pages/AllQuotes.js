import QuoteList from '../quotes/QuoteList';

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

const AllQuotes = () => {
  return (<div>
    <h1>All Quotes</h1>
    <QuoteList quotes={DUMMY_DATA}/>
  </div>);
}
 
export default AllQuotes;