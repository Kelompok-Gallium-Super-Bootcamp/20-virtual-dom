require('./main.css');
const Vue = require('vue').default;
const { store$ } = require('./store');
const { summary } = require('./async-action');
const { NavComp } = require('./components/nav');
const { StateComp } = require('./components/state-div');
const { PerfComp } = require('./components/performance-list');

new Vue({
  el: '#performance-app',
  components: {
    'navigation': NavComp,
    'state-page': StateComp,
    'performance-list': PerfComp,
  },
  render(createElement) {
    return createElement('div', [
      createElement('navigation'),
      createElement('state-page', {
        props: {
          errMsg: this.state.error,
          load: this.state.loading,
        },
      }),
      createElement('performance-list', {
        props: { summary: this.state.summary },
      }),
    ]);
  },
  data: {
    state: {},
  },

  mounted() {
    this.state = store$.getState();
    store$.subscribe(() => {
      this.state = store$.getState();
    });
    store$.dispatch(summary);
  },
});
