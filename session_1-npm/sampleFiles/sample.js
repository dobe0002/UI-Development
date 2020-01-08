/* **************************** */
/* jQuery example */

$('#jQuery').hide();
$('#jQuery').html('Hello World!');
$('#jQuery').fadeIn();

/* **************************** */
/* Axios example */

const url = `https://baconipsum.com/api/?type=all-meat&paras=1`;

axios.get(url).then(response => {
  document.getElementById('axios').innerText = response.data[0];
});
