var request = window.superagent;
var aggressive = 0;

function pep8ify(original, callback) {
  request
    .post("/pep8ify")
    .type("form")
    .send({code: original, aggressive: aggressive})
    .end(function (repsonse) {
      callback(repsonse.text);
    });
  aggressive += 1;
}

function resize() {
  var evt = document.createEvent("Event");
    evt.initEvent("autosize.update", true, false);
    document.querySelector('textarea').dispatchEvent(evt);
}

document.addEventListener("DOMContentLoaded", function(event) { 
  document.querySelector("form").addEventListener('submit', function (e) {
    textarea = document.querySelector("textarea");
    pep8ify(textarea.value, function (formatted) {
      textarea.value = formatted;
      resize()
    });
    e.preventDefault();
  });

  document.querySelector("textarea").addEventListener('input', function (e) {
    aggressive = 0;
    resize();
  });

  autosize(document.querySelector('textarea'));
});

