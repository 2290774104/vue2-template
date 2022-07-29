import store from '@/store';
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from 'vuex-module-decorators';

export interface IUserState {
  token: string
}

@Module({
  name: 'User',
  namespaced: true,
  dynamic: true,
  store,
  preserveState: sessionStorage.getItem('vuex') !== null
})
class User extends VuexModule implements IUserState {
  public token = '';

  @Mutation
  public SET_TOKEN(token: string) {
    this.token = token;
  }

  @Action({ commit: 'SET_TOKEN' })
  public SetToken(token: string) {
    return token;
  }
}

export const UserModule = getModule(User);
