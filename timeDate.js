export function addDateTimeofComments(commentDate) {
      let currentDate = new Date(commentDate);
      const date = { year: 'numeric', month: 'numeric', day: 'numeric' };
      const time = { hour: 'numeric', minute: 'numeric' };
      let dateTimeOfCommmet = currentDate.toLocaleDateString('ru-Ru', date) + " " + currentDate.toLocaleTimeString('ru-Ru', time);
      return dateTimeOfCommmet;
    }