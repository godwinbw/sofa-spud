  
export const getSavedTitleIds = () => {
    const savedTitleIds = localStorage.getItem('saved_titles')
      ? JSON.parse(localStorage.getItem('saved_titles'))
      : [];
  
    return savedTitleIds;
  };
  
  export const saveTitleIds = (titleIdArr) => {
    if (titleIdArr.length) {
      localStorage.setItem('saved_titles', JSON.stringify(titleIdArr));
    } else {
      localStorage.removeItem('saved_titles');
    }
  };
  
  export const removeTitleId = (titleId) => {
    const savedTitleIds = localStorage.getItem('saved_titles')
      ? JSON.parse(localStorage.getItem('saved_titles'))
      : null;
  
    if (!savedTitleIds) {
      return false;
    }
  
    const updatedSavedTitleIds = savedTitleIds?.filter((savedTitleId) => savedTitleId !== TitleId);
    localStorage.setItem('saved_titles', JSON.stringify(updatedSavedTitleIds));
  
    return true;
  };