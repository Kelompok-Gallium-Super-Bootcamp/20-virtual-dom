const Vue = require('vue').default;
const { store$ } = require('../store');
const { summary } = require('../async-action');

const StateComp = Vue.extend({
  props: ['errMsg', 'load'],
  render(createElement) {
    let hide;
    if (this.$props.load) {
      hide = '';
    } else {
      hide = 'none';
    }
    return createElement('div', [
      createElement(
        'p',
        {
          class: {
            error: true,
          },
        },
        this.$props.errMsg
      ),
      createElement(
        'p',
        {
          class: {
            primary: true,
          },
          style: {
            display: hide,
          },
        },
        'memuat...'
      ),
      createElement(
        'button',
        {
          on: {
            click: () => {
              store$.dispatch(summary);
            },
          },
        },
        'refresh'
      ),
    ]);
  },
});

module.exports = {
  StateComp,
};
