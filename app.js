import { version } from './package.json';

import highlight from './lib/highlight.js';

function matchMultiple(str, re) {
  let indices = [];
  let match;

  while ((match = re.exec(str)) != null) {
    indices.push({
      start: match.index,
      end: match.index + match[0].length
    });
  }

  return indices;
}

const $textareaContainer = document.querySelector('.js-textarea-container');
const $textarea = document.querySelector('.js-textarea');
const $version = document.querySelector('.js-version');
const $backdrop = document.querySelector('.js-backdrop');
const $calories = document.querySelector('.js-cal-number');
const $protein = document.querySelector('.js-pro-number');

$version.innerHTML = `${version}`;

function main() {
  const text = $textarea.value;

  const numberRegex = /[0-9](\.[0-9]+)?/g
  const calRegexPattern = /(([0-9](\.[0-9]+)?)+.?.?cal)/g;
  const proRegexPattern = /(([0-9](\.[0-9]+)?)+.?.?g)+(\s?\n|$)/g;

  const calTexts = text.match(calRegexPattern) || [];
  const proTexts = text.match(proRegexPattern) || [];

  const calTotal = calTexts.reduce((mem, calText) => {
    return mem + parseFloat(calText);
  }, 0);

  const proTotal = proTexts.reduce((mem, calText) => {
    return mem + parseFloat(calText);
  }, 0);

  $calories.innerHTML = calTotal.toFixed(2);
  $protein.innerHTML = proTotal.toFixed(2) + 'g';

  const calMatches = matchMultiple(text, calRegexPattern).map((match) => {
    return {...match, label: 'green'}
  });

  const proMatches = matchMultiple(text, proRegexPattern).map((match) => {
    return {...match, label: 'pink'}
  });

  let combinedMatches = [...calMatches, ...proMatches];

  combinedMatches.sort((a, b) => {
    return a.start - b.start;
  });

  highlight(
    $textarea,
    $backdrop,
    combinedMatches
  );
}

function save() {
  localStorage.setItem('textarea', $textarea.value);
}

function load() {
  const text = localStorage.getItem('textarea') || '';

  $textarea.value = text;
}

function resize() {
  $textarea.style.height = $backdrop.clientHeight + 'px';
}

load();
main();
resize();

$textarea.addEventListener('input', () => {
  main();
  save();
  resize();
});

$textareaContainer.addEventListener('click', () => {
  $textarea.focus();
});

window.addEventListener('resize', () => {
  resize();
});

console.log('version', version);
