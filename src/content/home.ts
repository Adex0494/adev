export const homeServices = ['web', 'mobile', 'design'] as const
export type HomeService = (typeof homeServices)[number]
export const homeProcessSteps = ['discovery', 'design', 'development', 'launch'] as const
export type HomeProcessStep = (typeof homeProcessSteps)[number]
