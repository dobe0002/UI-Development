/* **************************** */
/* jQuery example */

$('#jQuery').hide();
$('#jQuery').html('Hello World!');
$('#jQuery').fadeIn('slow');

/* **************************** */
/* Axios example */
const googleId = '18077uj95WnuAV4cqucAbARLyRVjDPidziQC2eBDfxMk';
const url = `https://spreadsheets.google.com/feeds/list/${googleId}/1/public/full?alt=json`;

axios.get(url).then(response => {
  console.log(response.data);
  document.getElementById('axios').innerText = JSON.stringify(response.data);
});
