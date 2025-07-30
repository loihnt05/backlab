const convertData = {
  length: {
    units: {
      millimeter: 0.001,
      centimeter: 0.01,
      meter: 1,
      kilometer: 1000,
      inch: 0.0254,
      foot: 0.3048,
      yard: 0.9144,
      mile: 1609.344,
    },
    convert: (value, from, to, units) => (value * units[from]) / units[to],
  },
  weight: {
    units: {
      gram: 1,
      kilogram: 1000,
      pound: 453.592,
      ounce: 28.3495,
    },
    convert: (value, from, to, units) => (value * units[from]) / units[to],
  },
  temperature: {
    units: {
      celsius: "celsius",
      fahrenheit: "fahrenheit",
      kelvin: "kelvin",
    },
    convert: (value, from, to) => {
      if (from === to) return value;

      let celsius;
      switch (from) {
        case "celsius":
          celsius = value;
          break;
        case "fahrenheit":
          celsius = ((value - 32) * 5) / 9;
          break;
        case "kelvin":
          celsius = value - 273.15;
      }
    },
  },
};

function loadForm(type) {
  let label = `Enter the ${type} to convert`;

  const formHTML = `
    <form action="" id='formUnit'>
      <label>${label}</label>
      <input type="text" id='valueUnit'/>
      <div class="error" id="errorValue"></div>

      <label for="">Unit Convert from</label>
      <input type="text" id='fromUnit'/>
      <div class="error" id="errorFrom"></div>

      <label for="">Unit to convert to</label>
      <input type="text" id="toUnit"/>
      <div class="error" id="errorTo"></div>

      <button type="button" onclick="handleConvert('${type}')">Convert</button>
    </form>
    <div id="result"></div>
    `;
  document.getElementById("form-container").innerHTML = formHTML;
}

function handleConvert(type) {
  const value = parseFloat(document.getElementById("valueUnit").value);
  const from = document.getElementById("fromUnit").value;
  const to = document.getElementById("toUnit").value;
  const errorFrom = document.getElementById("errorFrom");
  const errorTo = document.getElementById("errorTo");
  const result = document.getElementById("result");
  const errorValue = document.getElementById("errorValue");
  const { units, convert } = convertData[type];
  const validUnits = Object.keys(units).join(", ");
  let hasError = false;
  if (isNaN(value)) {
    errorValue.innerHTML = "Invalid value, value is a number";
    hasError = true;
  }
  if (!isValidUnit(from, units)) {
    errorFrom.innerHTML = `Invalid FROM unit. Valid units: ${validUnits}`;
    hasError = true;
  } else {
    errorFrom.innerHTML = "";
  }

  if (!isValidUnit(to, units)) {
    errorTo.innerHTML = `Invalid TO unit. Valid units: ${validUnits}`;
    hasError = true;
  } else {
    errorTo.innerHTML = "";
  }

  if (hasError) return;

  const resultConvert = convert(value, from, to, units);
  result.innerHTML = `
    <h3>Result of your calculation</h3>
    <h3>${value} ${from} = ${resultConvert} ${to}</h3>
    <button id="reset" onClick="handleReset()">Reset</button>
  `;
}

function handleReset() {
  console.log("heloo");
  document.getElementById("result").innerHTML = "";
  document.getElementById("valueUnit").value = "";
  document.getElementById("fromUnit").value = "";
  document.getElementById("toUnit").value = "";
  document.getElementById("errorFrom").value = "";
  document.getElementById("errorTo").value = "";
  document.getElementById("errorValue").value = "";
}

function isValidUnit(unit, units) {
  return unit in units;
}
