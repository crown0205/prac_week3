const getCookie = name => {
  console.log(name)
  let value = "; " + document.cookie;
  console.log(value)

  let parts = value.split(`; ${name}=`);
  console.log(parts)


  if(parts.length === 2) {
    return parts.pop().split(";").shift();
  }
};

const setCookie = (name, value, exp = 5) => {
  
  let date = new Date();
  date.setTime(date.getTime() + exp*24*60*60*1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}`
};

const deleteCookie = name => {
  console.log(name)
  let date = new Date("2021-12-25").toUTCString();

  console.log(date)

  document.cookie = name+"=; expires="+date;

};

export { getCookie, setCookie, deleteCookie };
