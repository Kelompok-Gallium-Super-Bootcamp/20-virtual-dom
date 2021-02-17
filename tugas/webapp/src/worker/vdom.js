require('./main.css');
const Vue = require('vue').default;
const { register, getList, remove } = require('./async-action');
const { store$, errorAction, clearErrorAction } = require('./store');
const { WorkerList } = require('./components/worker-list');
const { WorkerAdd } = require('./components/add-worker');
const { NavComp } = require('./components/nav');
const { StateComp } = require('./components/state-div');

new Vue({
  el: '#app1',
  components: {
		'navigation': NavComp,
    'state-page': StateComp,
    'worker-list': WorkerList,
    'add-worker': WorkerAdd,
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
      createElement('h4', 'Daftarkan Pekerja Baru'),
      createElement('add-worker', { props: { worker: this.add } }),
      createElement('h4', 'Daftar Pekerja'),
      createElement('worker-list', { props: { workers: this.state.workers } }),
    ]);
  },
  data: {
    add: {
      name: '',
      age: 0,
      bio: '',
      address: '',
      photo: null,
    },
    state: {},
  },

  mounted() {
    this.state = store$.getState();
    store$.subscribe(() => {
      this.state = store$.getState();
    });
    store$.dispatch(getList);
  },
});
