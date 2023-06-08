import { Component, useEffect } from 'react';
import shallowEqual from 'shallowequal';
import handleStateChangeOnClient from './client';
import mapStateOnServer from './server';
import { getDataForWebsite, getJsonSchemaScriptTags, getMetaValue, getRequest, reducePropsToState } from './utils';
import Provider, { providerShape } from './Provider';
const defaultMetaTags = [{ name: "description", content: '' }]
export default class Dispatcher extends Component {
  static propTypes = {
    context: providerShape.isRequired,
  };

  static displayName = 'HelmetDispatcher';

  rendered = false;

  shouldComponentUpdate(nextProps) {
    return !shallowEqual(nextProps, this.props);
  }

  componentDidUpdate() {
    this.emitChange();
  }
  
  /** 
   * Added to solve client-side meta updation bug.
   */
  componentDidMount() {
    this.emitChange();
  }

  // componentWillUnmount() {
  //   const { helmetInstances } = this.props.context;
  //   helmetInstances.remove(this);
    
  //   this.emitChange();
  // }

  /** Syncs the existing data with the data from the api   */
  syncMeta(
    /** Existing meta data  */
    oldMeta,
    /** Api data */
    apiData
  ) {
    if (!apiData) {
      return oldMeta
    }
    let newMeta = oldMeta
    newMeta['title'] = getMetaValue('title', apiData, oldMeta.title)
    newMeta['metaTags'] = (oldMeta.metaTags?.length>0 ?oldMeta.metaTags :  defaultMetaTags)?.map(i => ({ ...i, content: getMetaValue(i.name, apiData, i.content) }))
    newMeta['scriptTags'] = [...oldMeta['scriptTags'], ...getJsonSchemaScriptTags(apiData)]
    // console.log(newMeta)
    return newMeta
  }


  /** Updates helmet data */
  updateHelmet(
    /** Updated state */
    updatedState
  ) {
    let serverState = null;
    const { setHelmet } = this.props.context;
    if (Provider.canUseDOM) {
      handleStateChangeOnClient(updatedState);
    } else if (mapStateOnServer) {
      serverState = mapStateOnServer(updatedState);
    }
    setHelmet(serverState);
  }


  emitChange() {
    const { helmetInstances, setApiData } = this.props.context;
    const state = reducePropsToState(
      helmetInstances.get().map(instance => {
        const props = { ...instance.props };
        delete props.context;
        return props;
      })
    );

    if (this.props.context.webSiteId && !this.props.context.apiData) {
      if(this.props.apiData){
        setApiData(this.props.apiData)
          const updatedState = this.syncMeta(state, this.props.apiData)
          void this.updateHelmet(updatedState)
      }else{
        getDataForWebsite(this.props.context.webSiteId, Provider.canUseDOM, this.props.path, this.props.context.authToken)
        .then(data => {
          // const data = res?.items?.find((i) => i.schema) // use this for json schema
          if(!data){
            this.updateHelmet(state)
            return
          }
          // const data = res?.items?.find((i) => i.url == this.props.path)
          setApiData(data)
          const updatedState = this.syncMeta(state, data)
          void this.updateHelmet(updatedState)
        }).catch(err => console.error(err))
      }
    }
    else {
      void this.updateHelmet(state)
    }
  }

  // componentWillMount will be deprecated
  // for SSR, initialize on first render
  // constructor is also unsafe in StrictMode
  init() {
    if (this.rendered) {
      return;
    }
    this.rendered = true;

    const { helmetInstances } = this.props.context;
    helmetInstances.add(this);
    this.emitChange();
  }

  render() {
    this.init();

    return null;
  }
}
