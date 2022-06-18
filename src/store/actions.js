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
import {
  reqGetPosition,
  reqGetFoodTypes,
  reqGetShops,
  reqUserinfo,
  reqQuit,
  reqShopMenu,
  reqShopRatings,
  reqShopInfo
} from '../api';

export default {
  async getPosition({commit, state}) {
    const geohash = state.latitude + ',' + state.longitude;
    const result = await reqGetPosition(geohash);
    if (result.code === 0) {
      const position = result.data;
      commit(RECIEVE_POSITION, {position});
    }
  },
  async getFoodTypes({commit}) {
    const result = await reqGetFoodTypes();
    if (result.code === 0) {
      const types = result.data;
      commit(RECIEVE_TYPES, {types});
    }
  },
  async getShops({commit, state}) {
    const {latitude, longitude} = state;
    const result = await reqGetShops(latitude, longitude);
    if (result.code === 0) {
      const shops = result.data;
      commit(RECIEVE_SHOPS, {shops});
    }
  },
  async getUserInfo({commit}) {
    const result = await reqUserinfo();
    if (result.code === 0) {
      const userInfo = result.data;
      commit(RECIEVE_USER_INFO, {userInfo});
    }
  },
  async logout({commit}) {
    const result = await reqQuit();
    if (result.code === 0) {
      commit(RESET_USER_INFO);
    }
  },
  async getShopMenu({commit}) {
    const result = await reqShopMenu();
    if (result.code === 0) {
      const shopMenu = result.data;
      commit(RECIEVE_MENU, {shopMenu});
    }
  },
  async getShopRatings({commit}) {
    const result = await reqShopRatings();
    if (result.code === 0) {
      const shopRatings = result.data;
      commit(RECIEVE_RATINGS, {shopRatings});
    }
  },
  async getShopInfo({commit}) {
    const result = await reqShopInfo();
    if (result.code === 0) {
      const shopInfo = result.data;
      commit(RECIEVE_INFO, {shopInfo});
    }
  },

  saveUserInfo({commit}, userInfo) {
    commit(RECIEVE_USER_INFO, {userInfo})
  }
}

