import { version } from './package.json'

function matchMultiple(str, re) {
  let indices = [];

  while ((match = re.exec(str)) != null) {
    console.log(match)
    indices.push(match.index);
  }

  return indices;
}

const $textarea = document.querySelector('.js-textarea');
const $calories = document.querySelector('.js-cal-number');
const $protein = document.querySelector('.js-pro-number');

function main() {
  const text = $textarea.value;

  const numberRegex = /[0-9](\.[0-9]+)?/g
  const calRegexPattern = /(([0-9](\.[0-9]+)?)+.?.?cal)/g;
  const proRegexPattern = /(([0-9](\.[0-9]+)?)+.?.?g)+(\n|$)/g;

  const calTexts = text.match(calRegexPattern) || [];
  const proTexts = text.match(proRegexPattern) || [];

  const calTotal = calTexts.reduce((mem, calText) => {
    return mem + parseFloat(calText);
  }, 0);

  const proTotal = proTexts.reduce((mem, calText) => {
    return mem + parseFloat(calText);
  }, 0);

  $calories.innerHTML = calTotal.toFixed(2);
  $protein.innerHTML = proTotal.toFixed(2);
}

function save() {
  localStorage.setItem('textarea', $textarea.value);
}

function load() {
  const text = localStorage.getItem('textarea') || '';

  $textarea.value = text;
}

load();
main();

$textarea.addEventListener('input', () => {
  main();
  save();
});

console.log('version', version);
