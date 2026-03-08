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

export const REMOVE_COURSE = (planId :string) => {
  return `/scheduler/plans/${planId}/remove`
}

export const CHILD_DEGREES = '/scheduler/plans/childdegrees'

export const RESET_PLAN = '/scheduler/plans/reset'

export const APPLY_STATE = '/scheduler/plans/applystate'

export const REQUIREMENT_STRUCTURE = (planId :string) => {
  return `/scheduler/${planId}/requirement-structure`
}

export const ALL_DEGREES ='/scheduler/universities/degrees'

export const DEGREE_DATA = (degreeId :string) => {
  return `/scheduler/degrees/${degreeId}`
}

export const CAMPUS_DATA = (campusId :string) => {
  return `/scheduler/campus/${campusId}`
}
export const COURSE_DATA = (courseId :string) => {
  return `/scheduler/course/${courseId}`
}
