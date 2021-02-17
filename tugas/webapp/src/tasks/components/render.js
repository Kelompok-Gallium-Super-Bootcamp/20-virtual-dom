/* eslint-disable no-unused-vars */
const Vue = require('vue').default;
const { CreateElement } = require('vue');
const { TaskForm } = require('./task-form');
const { TaskList } = require('./task-list.js');
const { NavComp } = require('./nav');
const { StateComp } = require('./state-div');
const {
  done,
  cancel,
  getList,
  add,
  getWorkersList,
} = require('../async-action');
const { store$, errorAction, clearErrorAction } = require('../store');

new Vue({
  el: '#task',
  components: {
		'navigation': NavComp,
    'state-page': StateComp,
    'task-form': TaskForm,
    'task-list': TaskList,
  },
  render(CreateElement) {
    return CreateElement('div', [
      CreateElement('navigation'),
      CreateElement('state-page', {
        props: {
          errMsg: this.state.error,
          load: this.state.loading,
        },
      }),
			CreateElement('h4', 'Buat tugas baru'),
      CreateElement('task-form', { props: { workers: this.state.workers } }),
      CreateElement('h4', 'Daftar tugas'),
			CreateElement('task-list', { props: { tasks: this.state.tasks } }),
    ]);
  },
  data: {
    state: {
      loading: true,
      error: '',
      workers: [],
      tasks: [],
    },
  },
  mounted() {
    store$.subscribe(() => {
      this.state = store$.getState();
    });
    store$.dispatch(getList);
    store$.dispatch(getWorkersList);
  },
});
