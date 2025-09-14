document.addEventListener('DOMContentLoaded', function () {
  const themeToggleButton = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Set initial theme from localStorage or default to 'light'
  const currentTheme = localStorage.getItem('theme') || 'light';
  htmlElement.classList.remove('light', 'dark');
  htmlElement.classList.add(currentTheme);

  // Toggle theme on button click
  themeToggleButton.addEventListener('click', () => {
    if (htmlElement.classList.contains('dark')) {
      htmlElement.classList.remove('dark');
      htmlElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      htmlElement.classList.remove('light');
      htmlElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  });

 
  

  // Example usage:
  // customAlert("Welcome back!", "success");
});
