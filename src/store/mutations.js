import {
  RECIEVE_POSITION,
  RECIEVE_TYPES,
  RECIEVE_SHOPS,
  RECIEVE_USER_INFO,
  RESET_USER_INFO,
  RECIEVE_MENU,
  RECIEVE_RATINGS,
  RECIEVE_INFO
} from './mutation-type';

export default {
  [RECIEVE_POSITION](state, {position}) {
    state.position = position;
  },
  [RECIEVE_TYPES](state, {types}) {
    state.types = types;
  },
  [RECIEVE_SHOPS](state, {shops}) {
    state.shops = shops;
  },
  [RECIEVE_USER_INFO](state, {userInfo}) {
    state.userInfo = userInfo;
  },
  [RESET_USER_INFO](state) {
    state.userInfo = {};
  },

  [RECIEVE_MENU](state, {shopMenu}) {
    state.shopMenu = shopMenu;
  },
  [RECIEVE_RATINGS](state, {shopRatings}) {
    state.shopRatings = shopRatings;
  },
  [RECIEVE_INFO](state, {shopInfo}) {
    state.shopInfo = shopInfo;
  }
}
