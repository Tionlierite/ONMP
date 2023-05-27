export const createArticleData = (title, data) => {
    const { tag, description, symptomps, period, forms } = data[title];
    const formDescriptions = data[title]['form descriptions'];
    const formSymptoms = data[title]['form symptomps'];
  
    return {
      tag,
      title,
      description,
      symptomps,
      period,
      forms,
      formDescriptions,
      formSymptoms,
    };
  };