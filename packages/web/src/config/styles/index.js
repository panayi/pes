import { create } from 'jss';
import jssExpand from 'jss-expand';
import { createGenerateClassName, jssPreset } from 'material-ui/styles';

const jss = create({ plugins: [...jssPreset().plugins, jssExpand()] });
jss.options.createGenerateClassName = createGenerateClassName;

export default jss;
