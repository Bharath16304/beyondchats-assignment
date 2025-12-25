import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/articles")
      .then(res => res.json())
      .then(data => {
        setArticles(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading articles...</p>;
  }

  return (
    <div className="container">
      <h1>BeyondChats Articles</h1>

      {articles.map(article => (
        <div key={article.id} className="card">
          <h2>{article.title}</h2>

          <p>{article.content}</p>

          {article.is_updated === 1 && (
            <span className="badge">Updated</span>
          )}

          <a href={article.source_url} target="_blank">
            Read Source
          </a>
        </div>
      ))}
    </div>
  );
}

export default App;
