import React from "react";

export default function articleCard (article) {
    const source =
      (article.domain_metadata && article.domain_metadata.name) || "source";
    const image = article.top_image_url && (
      <img className="card__image" alt={article.resolved_title} src={article.top_image_url} />
    );
    const title = article.resolved_title && (
      <span className="card__title">{article.resolved_title}</span>
    );
    const link = article.resolved_url && (
      <a className="card__link" target="_blank" rel="noopener noreferrer" href={article.resolved_url}>
        {source}
      </a>
    );

    return {
      type: "article",
      order: 1,
      content: <>
      {image && image}
      {title}
      {link}
      </>
    };
  };