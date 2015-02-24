var request = window.superagent;

function pep8ify (original, callback) {
  request
    .post("/pep8ify")
    .type("form")
    .send({code: original})
    .end(function (repsonse) {
      callback(repsonse.text);
    });
}

logger = function(a) {console.log(a);}

pep8ify("testInput", logger);

document.querySelector("form").addEventListener('submit', function (e) {
  textarea = document.querySelector("textarea");
  pep8ify(textarea.value, function (formatted) {
    textarea.value = formatted;
  });
  e.preventDefault()
  return false;
});
