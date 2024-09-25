import setError from './error.js';

const registrationFormLeft = () => {
  const DOMFormLeft = document.getElementById('js-form-left');
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const CITY_REGEX = /^[a-zA-Z\s]*$/;
  const leftFormDataArr = [];

  if (!DOMFormLeft) return;

  DOMFormLeft.addEventListener('submit', (e) => {
    e.preventDefault();

    const formLeft = new FormData(e.target);

    const leftFormDataObj = {};

    // first name
    const fname = formLeft.get('fname');

    if (!fname) {
      return setError('js-left-form-fname-error', 'First name is required');
    }

    if (fname.length < 3) {
      return setError(
        'js-left-form-fname-error',
        'First name must be at least 3 characters'
      );
    }
    setError('js-left-form-fname-error', '');

    leftFormDataObj.fname = fname;

    // last name
    const lname = formLeft.get('lname');

    if (!lname) {
      return setError('js-left-form-lname-error', 'Last name is required');
    }

    if (lname.length < 3) {
      return setError(
        'js-left-form-lname-error',
        'Last name must be at least 3 characters'
      );
    }
    setError('js-left-form-lname-error', '');

    leftFormDataObj.lname = lname;

    // e-mail
    const email = formLeft.get('email');

    if (!email) {
      return setError('js-left-form-email-error', 'enter email');
    }

    const emailCheckResult = EMAIL_REGEX.test(email);
    if (!emailCheckResult) {
      return setError('js-left-form-email-error', 'correct email');
    }

    setError('js-left-form-email-error', '');

    leftFormDataObj.email = email;

    //  gender
    const sex = formLeft.get('sex');

    leftFormDataObj.sex = sex;

    // country
    const country = formLeft.get('country');
    if (country === 'Select') {
      return setError('js-left-form-country-error', 'select country');
    }

    setError('js-left-form-country-error', '');

    leftFormDataObj.country = country;

    // city
    const city = formLeft.get('city');
    const checkCityResult = CITY_REGEX.test(city);

    if (!city) {
      return setError('js-left-form-city-error', 'enter city');
    }

    if (city.length < 2) {
      return setError(
        ('js-left-form-city-error', 'city must be at least 2 characters')
      );
    }

    if (!checkCityResult) {
      return setError('js-right-form-city-error', 'enter correct city name');
    }

    setError('js-left-form-city-error', '');

    leftFormDataObj.city = city;

    leftFormDataArr.push(leftFormDataObj);

    const leftFormDataArrStr = JSON.stringify(leftFormDataArr);
    localStorage.setItem('left-form-data', leftFormDataArrStr);
  });

  // backend

  const DOMSignUpButton = document.getElementById('js-sign-up-btn');
  const DOMFirstNameInput = document.getElementById('fname');
  const DOMLastNameInput = document.getElementById('lname');
  const DOMEmailInput = document.getElementById('email');
  const DOMCityInput = document.getElementById('city');
  const DOMSelect = document.getElementById('country');
// Radio
  const DOMRadios = document.getElementsByName('sex');
  console.log(DOMRadios);

  let selectedValue = null;

  DOMRadios.forEach((input) => {
    input.addEventListener('change', function () {
      if (this.checked) {
        selectedValue = this.value;
        console.log('Selected value:', selectedValue);
        return selectedValue;
      }
    });
  });

  if (DOMSignUpButton) {
    DOMSignUpButton.addEventListener('click', () => {
      const data = {
        firstName: DOMFirstNameInput.value,
        lastName: DOMLastNameInput.value,
        email: DOMEmailInput.value,
        city: DOMCityInput.value,
        gender: selectedValue,
        country: DOMSelect.value,
      };
      const dataToString = JSON.stringify(data);
      fetch('http://localhost:3000/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: dataToString,
      })
        .then((r) => r.json())
        .then((response) => {
          console.log(response);
        });
    });
  }
};

export default registrationFormLeft;
