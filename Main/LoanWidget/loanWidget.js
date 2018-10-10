import $ from 'jquery';
import 'rangeslider.js';

export default function initLoanWidget () {
  var moneyHolder = '.js-LoanWidget_money';
  var dateHolder = '.js-LoanWidget_date';

  $(moneyHolder.concat('-range')).rangeslider({
    // Feature detection the default is `true`.
    // Set this to `false` if you want to use
    // the polyfill also in Browsers which support
    // the native <input type="range"> element.
    polyfill: false,

    // Default CSS classes
    rangeClass:      'lw-LoanWidget_range',
    fillClass:       'lw-LoanWidget_range-fill',
    handleClass:     'lw-LoanWidget_range-handle',

    disabledClass:   'lw-LoanWidget_range--disabled',
    horizontalClass: 'lw-LoanWidget_range--horizontal',
    
    onInit: function () {
      var value = $(moneyHolder.concat('-range')).val();
      $(moneyHolder).text(getMoney(value));
    },
    
    // Callback function
    onSlide: function (position, value) {
        $(moneyHolder).text(getMoney(value));
    },

    // Callback function
    onSlideEnd: function (position, value) {
    }
  });
  
  $(dateHolder.concat('-range')).rangeslider({
    // Feature detection the default is `true`.
    // Set this to `false` if you want to use
    // the polyfill also in Browsers which support
    // the native <input type="range"> element.
    polyfill: false,

    // Default CSS classes
    rangeClass:      'lw-LoanWidget_range',
    fillClass:       'lw-LoanWidget_range-fill',
    handleClass:     'lw-LoanWidget_range-handle',

    disabledClass:   'lw-LoanWidget_range--disabled',
    horizontalClass: 'lw-LoanWidget_range--horizontal',
    
    onInit: function() {
     var value = $(dateHolder.concat('-range')).val();
     console.log(value);
     $(dateHolder).text(getDate(value))
    },
    
    // Callback function
    onSlide: function (position, value) {
      $(dateHolder).text(getDate(value));
      
    },

    // Callback function
    onSlideEnd: function (position, value) {
    }
  });
}
  
function getMoney(value) {
  var money = value + "";
  money = money.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  money += " Р";
  return money;
}

function getDate(value) {
  var NumbToDay = {
    1 : 'пн',
    2 : 'вт',
    3 : 'ср',
    4 : 'чт',
    5 : 'пт',
    6 : 'сб',
    0  : 'вс'
  };
  
  var NumbToMonth = {
    0: "января",
    1: "ферваля",
    2: "марта",
    3: "апреля",
    4: "мая",
    5: "июня",
    6: "июля",
    7: "августа",
    8: "сентября",
    9: "октября",
    10: "ноября",
    11: "декабря"
  };
  
  var date = new Date();
  var month = date.getMonth() + 1;
  var year = date.getYear();
  
  var dayN = date.getDate() + parseInt(value);
  var days = daysInMonth(month, year);

  
  if (dayN > days ) {
    dayN -= days;
    month++;
  }
  
  return ("до " + dayN + " " + NumbToMonth[month] + ", " + NumbToDay[new Date(year, month, dayN).getDay()]);
}

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}
