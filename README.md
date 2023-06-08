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

*/src/_app.ts*
```javascript
import { HelmetProvider } from "@metamanager/react-seo";
import { metamanagerContext } from "../context";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <HelmetProvider context={metamanagerContext} webSiteId={process.env.MM_WEBSITE_ID} authToken={process.env.MM_TOKEN}>
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

export const metamanagerContext : HelmetContextData={};
```

### 3. Meta tags & schema markup insertion (SSR)

**Fetch & display** meta tags & schema markup in the **document template**:

*/src/\_document.tsx*
```javascript
import { metamanagerContext } from "../context";
import { Html, Head, Main, NextScript } from "next/document";
import { ReactNode } from "react";

export default function Document() {
    render() {
        return (
            <Html lang="en">
                <Head />
                {metamanagerContext?.helmet?.title?.toComponent() as ReactNode}
                {metamanagerContext?.helmet?.meta?.toComponent() as ReactNode}
                {metamanagerContext?.helmet?.script?.toComponent() as ReactNode}
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
```

### 4. Page file customization

Import & insert *SEO Helmet component* from *@metamanager/react-seo* to display **meta tags & schema markups** for the **relevant page path**.

*/src/pages/index.tsx*
```javascript
import { withMetaManagerSEO,  withMetamanagerStaticProps, MetamanagerNextPage } from "@metamanager/react-seo";

const Home: MetamanagerNextPage<{}> = ({ path, apiData}) => {
  return (
    <>
      <main>Add your components here...</main>
    </>
  );
}

export default withMetaManagerSEO(Home);

export const getStaticProps = withMetamanagerStaticProps<{}>(
    () => {
        return { props: { path: "/", } };
    }, {
        webSiteId: process.env.MM_WEBSITE_ID,
        authToken: process.env.MM_AUTH_TOKEN
    }
);
```

*/src/pages/[...path].tsx*
```javascript
import { withMetaManagerSEO,  withMetamanagerStaticProps, MetamanagerPageProps } from "@metamanager/react-seo";
import { GetStaticProps } from "next";

export default function AnyPage() {
  return (
    <>
      <main>Add your components here...</main>
    </>
  );
}

export default withMetaManagerSEO(AnyPage);

export const getStaticPaths = () => {
    const pageList = new Webpage(process.env.MM_WEBSITE_ID);
    const urls = pageList.sort();
    return {
        paths: urls?.filter(i => i.url !== '/')?.map(i => ({ params: { path: i.url?.startsWith('/') ? i.url.slice(1).split('/') : i.url.split('/') } })) ?? [],
        fallback: false
    }
};

const retriveStaticProps : GetStaticProps<MetamanagerPageProps<{}>, { path : string[]}> =({ params }) => {
    return {
        props: {
            path: params?.path?.join('/')?.startsWith('/') ? params?.path?.join('/') : '/' + params?.path?.join('/')
        }
    }
};

export const getStaticProps = withMetamanagerStaticProps<{}>(retriveStaticProps, {
    webSiteId: process.env.MM_WEBSITE_ID,
    authToken: process.env.MM_AUTH_TOKEN
});
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Subscription to the service

To make the plugin work, an account must be created in https://metamanager.io.

This platform allows users to **work on meta data and schema markup** which will be **sent to your website**. You will also receive the **website ID** & **API token** to **configure the plugin**. 
