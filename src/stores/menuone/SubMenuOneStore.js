import { observable, action } from "mobx";
import { Get, Post, PostJson } from "../../fetchHandler";
import { message } from "antd";
export default class SubMenuOneStore {
  static namespace = "subMenuOneStore";

  constructor(globalStore) {
    this.globalStore = globalStore;
  }
}