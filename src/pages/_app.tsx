import './_app.css'
import React from "react";
import type { AppProps } from 'next/app'
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "../theme";
import Head from "next/head";
import createEmotionCache from "@/createEmotionCache";
import { CacheProvider, EmotionCache } from '@emotion/react';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: AppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Blazesoft Code Challenge - Xiaoxi Yu</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}
export default MyApp