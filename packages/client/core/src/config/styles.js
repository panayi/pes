import { create } from 'jss';
import jssExpand from 'jss-expand';
import createGenerateClassName from '@material-ui/core/styles/createGenerateClassName';
import jssPreset from '@material-ui/core/styles/jssPreset';

const jss = create({ plugins: [...jssPreset().plugins, jssExpand()] });
jss.options.createGenerateClassName = createGenerateClassName;

export default jss;
