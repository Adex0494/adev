export const homeServices = ['web', 'mobile', 'design'] as const
export type HomeService = (typeof homeServices)[number]

export const homeProjects = ['project1', 'project2', 'project3'] as const
export type HomeProject = (typeof homeProjects)[number]

export const homeProcessSteps = ['discovery', 'design', 'development', 'launch'] as const
export type HomeProcessStep = (typeof homeProcessSteps)[number]
