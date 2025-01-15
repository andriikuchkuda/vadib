const transformDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'short', year: 'numeric' }; // Example: '13 Jan 2025'
  return new Intl.DateTimeFormat('en-GB', options).format(date);
}

export default transformDate;