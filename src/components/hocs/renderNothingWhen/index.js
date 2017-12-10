import { branch, renderNothing } from 'recompose';

export default predicate => branch(predicate, renderNothing);
