export const BASE_URL = 'https://localhost:8443/planuni'

export const SIGNUP_REQUEST = '/consumer/entry/signup'

export const LOGIN_REQUEST = '/consumer/entry/login'

export const ALL_PLANS = '/scheduler/plans/myplans'

export const ALL_CAMPUS = '/scheduler/universities/supported'

export const DEGREES_FROM = '/scheduler/universities/degreesOf'

export const CREATE_PLAN = '/scheduler/plans/create'

export const COURSE_STATES = '/scheduler/plans/course-states'

export const ADD_COURSE = (planId :string)=> {
  return `/scheduler/plans/${planId}/add`
}
