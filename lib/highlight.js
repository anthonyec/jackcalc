export default function highlight($textarea, $backdrop, highlights) {
  let html = $textarea.value;
  let offset = 0;

  highlights.forEach((highlight) => {
    const { start, end, label } = highlight;

    const markStart = `<span class="highlight highlight--${label}">`;
    const markEnd = `</span>`;

    const splicedHtml = [
      html.slice(0, start + offset),
      markStart,
      html.slice(start + offset, end + offset),
      markEnd,
      html.slice(end + offset, html.length)
    ];

    offset += markStart.length + markEnd.length;

    html = splicedHtml.join('');
  });

  html = html.replace(/\n/g, '<br>');

  $backdrop.innerHTML = html;
}
