// https://stackoverflow.com/questions/68052027/in-htmx-how-do-i-request-a-specific-url-for-each-option-within-a-select-form-el
document.body.addEventListener("htmx:configRequest", function (event) {
    let pathWithParameters = event.detail.path.replace(/<([A-Za-z0-9_]+)>/g, function (_match, parameterName) {
      let parameterValue = event.detail.parameters[parameterName]
      delete event.detail.parameters[parameterName]
      return parameterValue
    })

    event.detail.path = pathWithParameters
  })
