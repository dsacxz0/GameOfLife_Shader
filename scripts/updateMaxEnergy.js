
const Scene = require('Scene');
const Patches = require('Patches');

// Use export keyword to make a symbol available in scripting debug console
export const Diagnostics = require('Diagnostics');

;(async function () {  // Enables async/await in JS [part 1]
  var allVolumeMax = new Array(9);
  allVolumeMax.fill(1);

  for (let i = 0; i < 9; i++) {
    Patches.outputs.getScalar('Band' + (i).toString()).then(event => {
      event.monitor().subscribe(function (values) {
        checkIfNewMax(i, values.newValue);
      });
    });
  }

  function checkIfNewMax(soundId, newValue) {
    if (allVolumeMax[soundId] < newValue) {
      allVolumeMax[soundId] = newValue;
      var outputName = 'Max' + (soundId);
      Patches.inputs.setScalar(outputName, newValue);
    }
    else{
      var outputName = 'Max' + (soundId);
      Patches.inputs.setScalar(outputName, allVolumeMax[soundId] -= 0.0001);
    }
  }

})(); // Enables async/await in JS [part 2]
