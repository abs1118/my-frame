import { observable, action } from "mobx";
import { Get, Post, PostJson } from "../../fetchHandler";
import { message } from "antd";
export default class SubMenuFourStore {
  static namespace = "subMenuFourStore";

  constructor(globalStore) {
    this.globalStore = globalStore;
  }
}