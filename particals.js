function includeHTML() {
  const elements = document.querySelectorAll('[w3-include-html]');

  elements.forEach(async (el) => {
    const file = el.getAttribute('w3-include-html');

    try {
      const response = await fetch(file);

      if (!response.ok) {
        throw new Error('Template not found.');
      }

      const html = await response.text();
      el.innerHTML = html;
      el.removeAttribute('w3-include-html');
    } catch (error) {
      console.error(error);
    }
  });
}
