const Vue = require('vue').default;

const NavComp = Vue.extend({
  render(createElement) {
    return createElement('ul', [
      createElement('li', [
        createElement(
          'a',
          {
            attrs: {
              href: 'worker.html',
            },
          },
          'pekerja'
        ),
      ]),
      createElement('li', [
        createElement(
          'a',
          {
            attrs: {
              href: 'tasks.html',
            },
          },
          'pekerjaan'
        ),
      ]),
      createElement('li', [
        createElement(
          'a',
          {
            attrs: {
              href: 'performance.html',
            },
          },
          'kinerja'
        ),
      ]),
    ]);
  },
});

module.exports = {
  NavComp,
};
