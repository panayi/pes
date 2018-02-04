import { branch, renderNothing } from 'recompose';

const renderNothingWhen = predicate => branch(predicate, renderNothing);

export default renderNothingWhen;
