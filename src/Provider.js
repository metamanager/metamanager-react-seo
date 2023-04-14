import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HelmetData from './HelmetData';

const defaultValue = {};
let context = {}
export const Context = React.createContext(defaultValue);

export const providerShape = PropTypes.shape({
  setApiData : PropTypes.func,
  setHelmet: PropTypes.func,
  helmetInstances: PropTypes.shape({
    get: PropTypes.func,
    add: PropTypes.func,
    remove: PropTypes.func,
  }),
});

const canUseDOM = typeof document !== 'undefined';

export default class Provider extends Component {
  static canUseDOM = canUseDOM;

  static propTypes = {
    apiData : PropTypes.any,
    context: PropTypes.shape({
      helmet: PropTypes.shape(),
    }),
    webSiteId: PropTypes.number.isRequired,
    authToken: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    context: {},
  };

  static displayName = 'HelmetProvider';

  constructor(props) {
    super(props);

    this.helmetData = new HelmetData(this.props.context, Provider.canUseDOM, this.props.webSiteId, this.props.authToken);
  }


  render() {
    return <Context.Provider value={{...this.helmetData.value, webSiteId : this.helmetData.webSiteId, authToken : this.helmetData.authToken}}>{this.props.children}</Context.Provider>;
  }
}
