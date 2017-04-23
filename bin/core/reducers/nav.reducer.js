import AppNavigator from "../app/AppNavigator";

export default (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return (newState ? newState : state)
};