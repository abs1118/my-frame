import { observable, action } from "mobx";
import { Get, Post, PostJson } from "../../fetchHandler";
import { message } from "antd";
export default class SubMenuThreeStore {
  static namespace = "subMenuThreeStore";

  constructor(globalStore) {
    this.globalStore = globalStore;
  }
}