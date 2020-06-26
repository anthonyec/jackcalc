function trackEvent(type) {
  if (typeof window.fetch !== 'function') {
    console.warn('Browser does not support fetch');
    return;
  }

  if (!type) {
    console.warn('No type provided');
    return;
  }

  if (localStorage.getItem('nostats')) {
    console.warn('No stats tracking');
    return;
  }

  fetch(`https://anthony.ec/stat/?property=jackcalc&type=${type}`, {
    mode: 'no-cors'
  }).catch((err) => {
    console.log(err);
  });
}

export function trackPageView() {
  trackEvent('pageview');
}
