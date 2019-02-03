// document.querySelector alias
const gel = (selector) => document.querySelector(selector);

// Standard Ajax Http Get Request
gel.get = (url, callback) => {
  const http = new XMLHttpRequest();
  http.open('GET', url, true);

  http.onload = () => {
    if (http.status >= 200 && http.status < 400) {
      callback(http.responseText);
    } else {
      console.log('Server error');
    }
  };

  http.onerror = () => {
    console.log('Conection error');
  };

  http.send();
};

gel('input[name=myfile]').addEventListener('change', () => {
  gel('#form-upload').submit();
  const file = gel('input[name=myfile]').files[0];
  setInterval(() => {
    gel.get(`/getsize/${file.name}`, (res) => {
      const percentage = +res * 100 / file.size;
      gel('#upload-progress-bar').value = percentage; // get the percentage of the file uploaded
      gel('#upload-progress').innerHTML = percentage.toFixed(1) + '%';
    });
  }, 100);
});