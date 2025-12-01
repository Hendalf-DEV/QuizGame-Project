
export const AUTH_ACTIONS = {
  AUTH_START: 'AUTH_START',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_ERROR: 'AUTH_ERROR',
  AUTH_LOGOUT: 'AUTH_LOGOUT',
  SET_LOADING: 'SET_LOADING'
}

export const initialAuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
}

export const authReducer = (state, action) => {
  switch (action.type) {
  case AUTH_ACTIONS.AUTH_START:
    return { ...state, isLoading: true, error: null }
  case AUTH_ACTIONS.AUTH_SUCCESS:
    return {
      ...state,
      user: action.payload,
      isAuthenticated: true,
      isLoading: false,
      error: null
    }
  case AUTH_ACTIONS.AUTH_ERROR:
    return {
      ...state,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: action.payload
    }
  case AUTH_ACTIONS.AUTH_LOGOUT:
    return {
      ...state,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    }
  case AUTH_ACTIONS.SET_LOADING:
    return { ...state, isLoading: action.payload }
  default:
    return state
  }
}
