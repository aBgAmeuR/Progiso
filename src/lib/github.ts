import { getCurrentSession } from "./auth"

export const getPullsOfProject = async (project_url: string) => {
  const session = await getCurrentSession()
  if (!session) return

  const response = await fetch(
    `https://api.github.com/repos/${project_url}/pulls?state=all&per_page=100`,
    {
      headers: {
        Authorization: `Bearer ${session.provider_token}`,
      },
    }
  )
  const data = await response.json()
  return data
}

export const getCommitsOfProject = async (project_url: string) => {
  const session = await getCurrentSession()
  if (!session) return

  const response = await fetch(
    `https://api.github.com/repos/${project_url}/commits`,
    {
      headers: {
        Authorization: `Bearer ${session.provider_token}`,
      },
    }
  )
  const data = await response.json()
  return data
}

export const getIssuesOfProject = async (project_url: string) => {
  const session = await getCurrentSession()
  if (!session) return

  const response = await fetch(
    `https://api.github.com/repos/${project_url}/issues?state=all&per_page=100`,
    {
      headers: {
        Authorization: `Bearer ${session.provider_token}`,
      },
    }
  )
  const data = await response.json()
  return data
}

export const getContributorsOfProject = async (project_url: string) => {
  const session = await getCurrentSession()
  if (!session) return

  const response = await fetch(
    `https://api.github.com/repos/${project_url}/contributors`,
    {
      headers: {
        Authorization: `Bearer ${session.provider_token}`,
      },
    }
  )
  const data = await response.json()
  return data
}
