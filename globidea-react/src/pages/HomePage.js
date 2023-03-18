import React, { useState, useEffect } from "react";

function HomePage() {
  const [paragraphs, setParagraphs] = useState([]);

  useEffect(() => {
    fetch("/api/scrape/")  // replace with the URL of your Django view that performs web scraping
      .then(response => response.json())
      .then(data => setParagraphs(data));
  }, []);

  function handleParagraphClick(index) {
    const paragraphId = `p-${index}`;
    window.location.href = `https://www.utah.edu/#${paragraphId}`;  // replace with the URL of the University of Utah's home page
  }

  return (
    <div>
      {paragraphs.map((paragraph, index) => (
        <p key={index} onClick={() => handleParagraphClick(index)}>
          {paragraph.text}
          <a href={`https://www.utah.edu/#p-${index}`}> (source)</a>
        </p>
      ))}
    </div>
  );
}

export default HomePage;
