// функция формата даты
export function addDateTimeofComments(commentDate) {
  let currentDate = new Date(commentDate);
  const date = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const time = { hour: 'numeric', minute: 'numeric' };
  let dateTimeOfCommmet = currentDate.toLocaleDateString('ru-Ru', date) + " " + currentDate.toLocaleTimeString('ru-Ru', time);
  return dateTimeOfCommmet;
}

// функция заменяющая теги на символы в тексте
export function sanitize(text) {
  return text.replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('QUOTE_BEGIN', '<div class="quote">').replaceAll('QUOTE_END', '</div>');
}