function loadForm(type) {
  let label = `Enter the ${type} to convert`;

  const formHTML = `
    <form action="" id='formUnit'>
      <label>${label}</label>
      <input type="text" id='valueUnit'/>

      <label for="">Unit Convert from</label>
      <input type="text" id='fromUnit'/>
      <div class="error" id="errorFrom"></div>

      <label for="">Unit to convert to</label>
      <input type="text" id="toUnit"/>
      <div class="error" id="errorTo"></div>

      <button onclick="handleConvertLength()">Convert</button>
    </form>
    <div id="result"></div>
    `;
  document.getElementById("form-container").innerHTML = formHTML;
}

const lengthConversionFactors = {
  millimeter: 0.001,
  centimeter: 0.01,
  meter: 1,
  kilometer: 1000,
  inch: 0.0254,
  foot: 0.3048,
  yard: 0.9144,
  mile: 1609.344,
};

function convertLengthUnit(value, fromUnit, toUnit) {
  const valueUnit = value * lengthConversionFactors[fromUnit];
  return valueUnit / lengthConversionFactors[toUnit];
}

function handleConvertLength() {
  const value = parseFloat(document.getElementById("valueUnit").value);
  const from = document.getElementById("fromUnit").value;
  const to = document.getElementById("toUnit").value;
  let hasError = false;

  if (!invalid(from, lengthConversionFactors)) {
    document.getElementById("errorFrom").innerHTML =
      "Invalid FROM unit. Valid units: millimeter, centimeter, meter, kilometer, inch, foot, yard, mile.";
    hasError = true;
  } else {
    document.getElementById("errorFrom").innerHTML = "";
  }

  if (!isValidUnit(to, lengthConversionFactors)) {
    document.getElementById("errorTo").innerHTML =
      "Invalid TO unit. Valid units: millimeter, centimeter, meter, kilometer, inch, foot, yard, mile.";
    hasError = true;
  } else {
    document.getElementById("errorTo").innerHTML = "";
  }

  if (hasError) return;
  
  const resultConvert = convertLengthUnit(value, from, to);
  document.getElementById("result").innerHTML = `
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
}

function isValidUnit(unit, conversionFactors) {
  return unit in conversionFactors;
}
