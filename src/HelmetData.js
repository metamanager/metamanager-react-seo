import mapStateOnServer from './server';

const instances = [];

export function clearInstances() {
  instances.length = 0;
}

export default class HelmetData {
  instances = [];

  value = {
    setApiData: data=>{
      this.context.apiData = data
    },
    
    setHelmet: serverState => {
      this.context.helmet = serverState;
    },
    helmetInstances: {
      get: () => (this.canUseDOM ? instances : this.instances),
      add: instance => {
        (this.canUseDOM ? instances : this.instances).push(instance);
      },
      remove: instance => {
        const index = (this.canUseDOM ? instances : this.instances).indexOf(instance);
        (this.canUseDOM ? instances : this.instances).splice(index, 1);
      },
    },
  };

  constructor(context, canUseDOM = typeof document !== 'undefined', webSiteId, authToken) {
    this.context = context;
    this.webSiteId = webSiteId;
    this.authToken = authToken;
    this.canUseDOM = canUseDOM;

    if (!canUseDOM) {
      context.helmet = mapStateOnServer({
        baseTag: [],
        bodyAttributes: {},
        encodeSpecialCharacters: true,
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: '',
        titleAttributes: {},
      });
    }
  }
}
