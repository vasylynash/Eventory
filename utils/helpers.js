module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  },
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
      new Date(date).getFullYear()}`;
  },
  format_date_for_input: (dateStr) => {
    let date = new Date(dateStr);
    date.setTime(date.getTime() - date.getTimezoneOffset() * 60000);
    return new Date(date).toISOString().split('T')[0];
  },

  format_time_for_input: (dateStr) => {
    let date = new Date(dateStr);
    date.setTime(date.getTime() - date.getTimezoneOffset() * 60000);
    return new Date(date).toISOString().substring(11,16);
  },

  generate_list: (arr) => {
    if (arr.length === 0) {
      return '';
    }
    let str = '';
    for (let i = 0; i < arr.length; i++) {
      str += arr[i].username + ', ';
    }
    return str.slice(0, str.length - 2);
  },

  isOwner: (arg, arg1) => {
    console.log('Owner_id: ' + arg);
    console.log('Current user id: ' + arg1);
    return arg === arg1;
  }
};