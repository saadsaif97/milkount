import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { config } from "config/config";
import { showErrorNotification } from "lib/showNotification";
import { articlesCollection, ArticlesContextProvider } from "hooks/articles";
import useUser from "hooks/useUser";
import { auth } from "lib/data/firebase";

import ArticleList from "components/articles/ArticleList";
import LoginForm from "components/user/LoginForm";

function ArticleListPage({ articles }) {
  // Note: 'query' contains both /:params and ?query=value from url
  const { query } = useRouter();
  const { user } = useUser();

  if (!user) {
    return <LoginForm />;
  }

  return (
    <>
      {user && (
        <>
          <div className="user-data">
            <img
              className="user-img"
              src={user.photoURL}
              alt={user.displayName}
            />
            <div>
              <p><strong>{user.displayName}</strong></p>
              <p>{user.email}</p>
            </div>
          </div>
          <button onClick={() => auth.signOut()}>Logout</button>
        </>
      )}


      <h1>{config.appName}</h1>

      <p>
        <em>{config.appTagline}</em>
      </p>

      <ArticlesContextProvider
        articles={articles}
        onError={showErrorNotification}
      >
        <ArticleList />
      </ArticlesContextProvider>

      <h2>Routing</h2>
      <p>
        Current query: <strong>{JSON.stringify(query)}</strong>
      </p>

      <h2>Add to Home Screen</h2>
      <p>
        You can add this to your Home Screen on iOS/Android, it should then
        start full screen.
      </p>

      <h2>Source code</h2>
      <p>
        Get the{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/tomsoderlund/nextjs-pwa-firebase-boilerplate"
        >
          source code for nextjs-pwa-firebase-boilerplate
        </a>
      </p>

      <p>Version {config.appVersion}</p>
    </>
  );
}

export default ArticleListPage;

// SSG
export async function getStaticProps({ params, locale = "en" }) {
  const articlesRaw = await articlesCollection();
  const articles = articlesRaw.map((article) => ({
    ...article,
    // To avoid “cannot be serialized as JSON” error:
    dateCreated: article.dateCreated ? article.dateCreated.toString() : null,
    dateUpdated: article.dateUpdated ? article.dateUpdated.toString() : null,
  }));
  return {
    props: {
      articles,
    },
    revalidate: 60, // Seconds. This refresh time could be longer depending on how often data changes.
  };
}

// SSR
// export async function getServerSideProps ({ req, res, query: { slug } }) {
//   return {
//     articles
//   }
// }
