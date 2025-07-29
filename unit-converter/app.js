function loadForm(type) {
    let label = `Enter the ${type} to convert`;

    const formHTML = `
    <form action="">
      <label>${label}</label>
      <input type="text" />

      <label for="">Unit Convert from</label>
      <input type="text" />

      <label for="">Unit to convert to</label>
      <input type="text" />

      <button>Convert</button>
    </form>
    <div id="result"></div>
    `
    document.getElementById('form-container').innerHTML = formHTML
}

