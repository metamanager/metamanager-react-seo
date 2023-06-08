import { NextParsedUrlQuery } from "next/dist/server/request-meta";

declare module "react-metamanager-plugin" {
  import {
    GetServerSideProps,
    GetServerSidePropsResult,
    GetStaticProps,
    GetStaticPropsResult,
    NextPage,
    NextPageContext,
    PreviewData,
  } from "next";
  import * as React from "react";

  interface OtherElementAttributes {
    [key: string]: string | number | boolean | null | undefined;
  }

  type HtmlProps = JSX.IntrinsicElements["html"] & OtherElementAttributes;

  type BodyProps = JSX.IntrinsicElements["body"] & OtherElementAttributes;

  type LinkProps = JSX.IntrinsicElements["link"];

  type MetaProps = JSX.IntrinsicElements["meta"];

  export interface HelmetTags {
    baseTag: Array<any>;
    linkTags: Array<HTMLLinkElement>;
    metaTags: Array<HTMLMetaElement>;
    noscriptTags: Array<any>;
    scriptTags: Array<HTMLScriptElement>;
    styleTags: Array<HTMLStyleElement>;
  }

  export interface HelmetProps {
    async?: boolean;
    base?: any;
    bodyAttributes?: BodyProps;
    defaultTitle?: string;
    defer?: boolean;
    encodeSpecialCharacters?: boolean;
    helmetData?: HelmetData;
    htmlAttributes?: HtmlProps;
    onChangeClientState?: (
      newState: any,
      addedTags: HelmetTags,
      removedTags: HelmetTags
    ) => void;
    link?: LinkProps[];
    meta?: MetaProps[];
    noscript?: Array<any>;
    script?: Array<any>;
    style?: Array<any>;
    title?: string;
    titleAttributes?: Object;
    titleTemplate?: string;
    prioritizeSeoTags?: boolean;
    path?: string;
    apiData?: Record<string, any>;
  }

  export class Helmet extends React.Component<
    React.PropsWithChildren<HelmetProps>
  > {}

  export interface HelmetServerState {
    base: HelmetDatum;
    bodyAttributes: HelmetHTMLBodyDatum;
    htmlAttributes: HelmetHTMLElementDatum;
    link: HelmetDatum;
    meta: HelmetDatum;
    noscript: HelmetDatum;
    script: HelmetDatum;
    style: HelmetDatum;
    title: HelmetDatum;
    titleAttributes: HelmetDatum;
    priority: HelmetDatum;
  }

  export interface HelmetDatum {
    toString(): string;
    toComponent(): React.Component<any>;
  }

  export interface HelmetHTMLBodyDatum {
    toString(): string;
    toComponent(): React.HTMLAttributes<HTMLBodyElement>;
  }

  export interface HelmetHTMLElementDatum {
    toString(): string;
    toComponent(): React.HTMLAttributes<HTMLHtmlElement>;
  }

  export interface FilledContext {
    helmet: HelmetServerState;
  }

  interface ProviderProps {
    context?: HelmetContextData;
    webSiteId: number;
    authToken: string;
  }

  export interface HelmetContextData {
    helmet?: HelmetServerState;
    apiData?: any;
  }

  export class HelmetData {
    constructor(context: any);
    context: {
      helmet: HelmetServerState;
      apiData?: any;
    };
  }

  export class HelmetProvider extends React.Component<
    React.PropsWithChildren<ProviderProps>
  > {
    static canUseDOM: boolean;
  }
  /**
   * version-2 types
   */

  export type MetamanagerPageProps<T> = { path: string } & T;

  export type MetamanagerNextPage<T> = NextPage<MetamanagerPropsResult<T>>;

  export function withMetaManagerSEO<T>(
    Component: NextPage<MetamanagerPageProps<T>>
  ): MetamanagerNextPage<T>;

  export type MetamanagerOptions = {
    webSiteId: number;
    authToken: string;
  };
  export type MetamanagerPropsCallback<T> =
    | GetServerSideProps<MetamanagerPageProps<T>>
    | GetStaticProps<MetamanagerPageProps<T>>;

  export type MetamanagerPropsResult<T> = MetamanagerPageProps<T> & {
    apiData: Record<string, any>;
  };
  export function withMetamanagerProps<T extends Record<string, any>>(
    callback: MetamanagerPropsCallback<T>,
    metamanagerOptions: MetamanagerOptions
  ): (
    props: NextPageContext
  ) =>
    | GetStaticPropsResult<MetamanagerPropsResult<T>>
    | GetServerSidePropsResult<MetamanagerPropsResult<T>>;

  
  export function withMetamanagerServerProps<
    Props extends { [key: string]: any } = { [key: string]: any },
    Params extends ParsedUrlQuery = NextParsedUrlQuery,
    Preview extends PreviewData = PreviewData
  >(
    callback: GetServerSideProps<MetamanagerPageProps<Props, Params, Preview>>,
    metamanagerOptions: MetamanagerOptions
  ): (
    props: NextPageContext
  ) => GetServerSidePropsResult<MetamanagerPropsResult<Props>>;

  export function withMetamanagerStaticProps<
    Props extends { [key: string]: any } = { [key: string]: any },
    Params extends ParsedUrlQuery = NextParsedUrlQuery,
    Preview extends PreviewData = PreviewData
  >(
    callback: GetStaticProps<MetamanagerPageProps<Props, Params, Preview>>,
    metamanagerOptions: MetamanagerOptions
  ): (
    props: NextPageContext
  ) => GetServerSidePropsResult<MetamanagerPropsResult<Props>>;
}
