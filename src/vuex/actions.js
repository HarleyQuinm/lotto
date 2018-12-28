import * as types from './mutation-types'
export var userlogin = ({commit}, data) => {
    commit(types.UserLogin, data);
  }
export var getactId = ({commit}, data) => {
  commit(types.getactId, data);
}