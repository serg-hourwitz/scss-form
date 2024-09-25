const setError = (id, text) => {
  const DOMError = document.getElementById(id);

  if (DOMError) {
    DOMError.textContent = text;
  }
};

export default setError;