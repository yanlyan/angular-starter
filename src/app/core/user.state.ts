import { State, Action, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";

export class SetUserState {
  static readonly type = "[App] Set User State";
  constructor(public state: any) {}
}

export interface UserStateModel {
  user: any;
}

@State<UserStateModel>({
  name: "user",
  defaults: {
    user: null
  }
})
@Injectable({
  providedIn: "root"
})
export class UserState {
  @Action(SetUserState)
  SetOnlineState(ctx: StateContext<UserStateModel>, action: SetUserState) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      user: action.state
    });
  }
}
