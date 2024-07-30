import Head from "next/head";
import Script from "next/script";

const HeadMeta: React.FC = () => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="https://lionprince-song.pages.dev/favicon.ico" />
        <link
          rel="shortcut icon"
          href="https://lionprince-song.pages.dev/favicon.ico"
        />
        <link
          rel="apple-touch-icon"
          href="https://lionprince-song.pages.dev/favicon.ico"
        />
        <link rel="canonical" href="https://lionprince-song.pages.dev" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta property="og:type" content="website" />
        <meta name="title" content="사자왕자의 노래 하나" />
        <meta
          name="description"
          content="사자왕자의 목소리를 응원하는 팬페이지"
        />
        <meta name="Keywords" content="사자왕자, Lionprince, 노래cover" />
        <meta name="author" content="MEI" />
        <meta
          property="og:image"
          content="https://lionprince-song.pages.dev/ogImage.png"
        />
        <meta property="og:title" content="사자왕자의 노래 하나" />
        <meta
          property="og:description"
          content="사자왕자의 목소리를 응원하는 팬페이지"
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:image"
          content="https://lionprince-song.pages.dev/ogImage.png"
        />
        <meta name="twitter:title" content="MEI-DANCER" />
        <meta name="twitter:description" content="NOT MAIN DANCER" />
        <meta name="twitter:url" content="https:/lionprince-song.pages.dev/" />
        <meta name="twitter:site" content="@DevDance.Mei" />
        <meta
          name="naver-site-verification"
          content="219172e22eecf7265ffea644799d16afa08b2b38"
        />
      </Head>
      <Script
        id="microsoft-clarity-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "nfj6n94rl6");`,
        }}
      />
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-R6P7125DB5`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-R6P7125DB5');`,
        }}
      />
    </>
  );
};

export default HeadMeta;
