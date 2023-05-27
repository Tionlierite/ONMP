import React, { useState, useEffect } from 'react';

const ArticlePage = () => {
  const [articleData, setArticleData] = useState(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem('articleData');
    if (storedData) {
      const data = JSON.parse(storedData);
      setArticleData(data);
    }
  }, []);

  if (!articleData) {
    return (
      <div className="page-content">
        <h2>Статья не найдена</h2>
        <p>Данная статья еще не добавлена в справочник.</p>
      </div>
    );
  }

  const { tag, description, symptomps, period, forms, formDescriptions, formSymptoms } = articleData;

  return (
    <div className="dictionary-page">
    <div className="page-content">
      <h2>{tag}</h2>
      <h1>{articleData.title}</h1>
      <p>{description}</p>
      {period && <p>{period}</p>}
      {symptomps && symptomps[0] && (
        <div>
          <strong>Симптомы:</strong>
          <ul>
            {symptomps.map((symptom, index) => (
              <li key={index}>{symptom}</li>
            ))}
          </ul>
        </div>
      )}
      {forms && forms[0] && (
        <p>
          <strong>Формы:</strong> {forms.join(', ')}
        </p>
      )}
      {formDescriptions && formDescriptions[0] && (
        <p>
          <strong>Описания форм:</strong> {formDescriptions.join(', ')}
        </p>
      )}
      {formSymptoms && formSymptoms[0] && (
        <div>
          <strong>Симптомы форм:</strong>
          <ul>
            {formSymptoms.map((symptom, index) => (
              <li key={index}>{symptom}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </div>
  );
};

export default ArticlePage;