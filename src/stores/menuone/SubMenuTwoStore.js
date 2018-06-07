import { observable, action } from "mobx";
import { Get, Post, PostJson } from "../../fetchHandler";
import { message } from "antd";
export default class SubMenuTwoStore {
  static namespace = "subMenuTwoStore";

  constructor(globalStore) {
    this.globalStore = globalStore;
  }
}