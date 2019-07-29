function determine_shutter(iso, fstop, relative_ev) {
  var base_ev = -10;
  var target_ev = (base_ev + Math.log2(parseInt(iso)/100)) + parseFloat(relative_ev);
  //console.log("target", target_ev);

  var f = Math.pow(parseFloat(fstop), 2);
  //console.log("f^2", f);
  var calc_ev = Math.pow(2, target_ev);
  //console.log("2^ev", calc_ev);

  var shutter = f / calc_ev;
  return shutter
}

function fp4_reciprocity(shutter) {
  if (shutter <= 1) {
    return shutter;
  }

  return Math.pow(shutter, 1.26);
}

function hp5_reciprocity(shutter) {
  if (shutter <= 1) {
    return shutter;
  }

  return Math.pow(shutter, 1.31);
}

function format_seconds(seconds) {
  return new Date(seconds * 1000).toISOString().substr(11, 8);
}

document.addEventListener("DOMContentLoaded", function(evt) {
  var form = document.querySelector("form#calculator");
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    var iso_input = form.querySelector("input[name=iso]");
    var iso = iso_input.value;

    var fstop_input = form.querySelector("input[name=fstop]");
    var fstop = fstop_input.value;

    var relative_input = form.querySelector("input[name=relev]");
    var relative_ev = relative_input.value;

    var shutter_seconds = determine_shutter(iso, fstop, relative_ev);

    var shutter_span = document.querySelector("span#shutter");
    shutter_span.textContent = format_seconds(shutter_seconds);

    var fp4_seconds = fp4_reciprocity(shutter_seconds);
    var hp5_seconds = hp5_reciprocity(shutter_seconds);

    var fp4_span = document.querySelector("span#fp4shutter");
    fp4_span.textContent = format_seconds(fp4_seconds);

    var hp5_span = document.querySelector("span#hp5shutter");
    hp5_span.textContent = format_seconds(hp5_seconds);
  });
});
