import Vue from 'vue';
import Vuex from 'vuex';
import { VuexPersistence } from 'vuex-persist';
import { IUserState } from './modules/user';

export interface IRootState {
  user: IUserState
}

const vuexLocal = new VuexPersistence<IRootState>({
  storage: window.sessionStorage
});

Vue.use(Vuex);

export default new Vuex.Store<IRootState>({
  plugins: [vuexLocal.plugin],
  modules: {}
});
