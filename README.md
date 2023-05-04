<a href="https://metamanager.io" target="_blank" title="Go to metamanager.io"><img width="251" height="24" src="https://metamanager.io/logo/metamanager-logo-dark-sm.svg" alt="Metamanager.io" /></a>

# **Metamanager React SEO**

Meta tag update & schema markup/structured data deployment for your **React/Next.js frontend**.

## SaaS-solution for search engine optimization (SEO)

**metamanager platform** is connected to websites in order to update meta tags (title, description...) and insert schema markup/structured data for each internal page/URL.

As a **frontend developer** your can create your account and manage websites in which you want to **implement this plugin**... And let **webmarketers** doing the rest of the job: **meta tag & schema markup edition**...

## Features

- Meta/structured data download (secured operation)
- Server-side rendering (SSR)
- &lt;title /&gt; & &lt;meta description /&gt; inserted within HTML tag
- &lt;script application/ld+json /&gt; inserted within body tag

## Installation

You can install **Metamanager React SEO** via NPM:

```
npm i @metamanager/react-seo
```

## Usage/Examples

Import *@metamanager/react-seo* in 4 steps into your **React/Next.js project**.

### 1. Wrapping your application in a SEO helmet provider

Set 3 properties for the provider:

- *context*: Metamanager context
- *webSiteId*: ID of the website (supplied from the platform)
- *authToken*: API token (supplied from the platform)

*/src/_app.tsx*
```javascript
import { HelmetProvider } from '@metamanager/react-seo';
import { metaManagerContext } from '../context';

export default function App({ Component, pageProps }) {
    return (
        <HelmetProvider context={metaManagerContext} webSiteId={process.env.MM_WEBSITE_ID} authToken={process.env.MM_TOKEN}>
            <Component {...pageProps} />
        </HelmetProvider>
    );
}
```

### 2. Initializing an context object to store the Metamanager data

Initialize the **Metamanager context** here:

*/src/context.ts*
```javascript
import { HelmetContextData } from "@metamanager/react-seo";

export const metaManagerContext : HelmetContextData={}
```

### 3. Meta tags & schema markup insertion (SSR)

**Fetch & display** meta tags & schema markup in the **document template**:

*/src/\_document.tsx*
```javascript
import { HelmetContextData } from "@metamanager/react-seo";
import { metaManagerContext } from "../context";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ReactNode } from "react";

class MyDocument extends Document<{ metaManagerContext: HelmetContextData }> {
    static async getInitialProps(ctx: any) {
        const initialProps = await Document.getInitialProps(ctx);
        /** Use this logic to wait for API call */
        const data = new Promise((resolve, _) => {
            let timeOut = 7;
            let interval_time = 5000;
            const interval = setInterval(() => {
                timeOut -= 1;
                if (metaManagerContext.apiData || !(timeOut > 0)) {
                    resolve(metaManagerContext);
                    clearInterval(interval);
                }
            }, interval_time);
        });

        const _hc = await data;

        /** return initialProps along with the context data */
        return { ...initialProps, metaManagerContext: _hc };
    }

    render() {
        return (
            <Html>
                {/** Use the data to display meta tags */}
                {
                    this.props.metaManagerContext?.helmet?.title?.toComponent() as ReactNode
                }
                {
                    this.props.metaManagerContext?.helmet?.meta?.toComponent() as ReactNode
                }
                {
                    this.props.metaManagerContext?.helmet?.script?.toComponent() as ReactNode
                }
                <Head></Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
```

### 4. Page file customization

Import & insert *SEO Helmet component* from *@metamanager/react-seo* to display **meta tags & schema markups** for the **relevant page path**.

*/src/pages/index.tsx*
```javascript
import { Helmet } from '@metamanager/react-seo';

export default function Home() {
  return (
    <>
      {/** meta tags inside the Helmet wrapper will be updated automatically by metamanager API */}
      <Helmet path="/" />

      <main>Add your components here...</main>
    </>
  );
}
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Subscription to the service

To make the plugin work, an account must be created in https://metamanager.io.

This platform allows users to **work on meta data and schema markup** which will be **sent to your website**. You will also receive the **website ID** & **API token** to **configure the plugin**. 
