const formatError = message => {
  const messageSplit = message.split(":")
  return messageSplit[messageSplit.length - 1].trim()
}

const currencyFormater = ({locale, currency} = {locale: "pt-BR", currency: "BRL"}) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency
  })
}


export {
  formatError,
  currencyFormater,
}