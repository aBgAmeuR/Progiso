import { getDetailOfGithubRepoUrl } from './utils';

import { getDetailProject, getSelectedProject } from '@/features/projects';
import { getGitHubAccessToken } from '@/features/repository/services';
import { TCommit, TContributor } from '@/features/repository/type';

export const getContributorsOfProject = async () => {
  const access_token = await getGitHubAccessToken();
  if (!access_token) return;

  const selectProject = await getSelectedProject();
  if (!selectProject) return;

  const detailProject = await getDetailProject(selectProject.id);
  if (!detailProject) return;

  const { owner, repo } = getDetailOfGithubRepoUrl(detailProject.github_url!);

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contributors`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  const data = await response.json();
  return data as TContributor[];
};

export type TIssuesAndPRStats = {
  closedIssues: {
    totalCount: number;
  };
  openIssues: {
    totalCount: number;
  };
  closedPullRequests: {
    totalCount: number;
  };
  openPullRequests: {
    totalCount: number;
  };
};

export const getIssuesAndPRStats = async () => {
  const access_token = await getGitHubAccessToken();
  if (!access_token) return;

  const selectProject = await getSelectedProject();
  if (!selectProject) return;

  const detailProject = await getDetailProject(selectProject.id);
  if (!detailProject || !detailProject.github_url) return;

  const { owner, repo } = getDetailOfGithubRepoUrl(detailProject.github_url);
  const response = await fetch(`https://api.github.com/graphql`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query {
          repository(owner: "${owner}", name: "${repo}") {
            closedIssues:issues(states:CLOSED) {
              totalCount
            }
            openIssues:issues(states:OPEN) {
              totalCount
            }
            closedPullRequests: pullRequests(states: [CLOSED, MERGED]) {
              totalCount
            }
            openPullRequests: pullRequests(states: OPEN) {
              totalCount
            }
          }
        }
      `,
    }),
  });
  const data = await response.json();

  if (data.errors) {
    console.error(data.errors);
    return null;
  }
  return data.data.repository as TIssuesAndPRStats;
};

export const getCommitsStats = async () => {
  const access_token = await getGitHubAccessToken();
  if (!access_token) return;

  const selectProject = await getSelectedProject();
  if (!selectProject) return;

  const detailProject = await getDetailProject(selectProject.id);
  if (!detailProject || !detailProject.github_url) return;

  const { owner, repo } = getDetailOfGithubRepoUrl(detailProject.github_url);
  const response = await fetch(`https://api.github.com/graphql`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query {
          repository(owner: "${owner}", name: "${repo}") {
            defaultBranchRef {
              target {
                ... on Commit {
                  history(first: 50) {
                    edges{
                      node{
                        ... on Commit{
                          committedDate
                          author {
                            avatarUrl
                            name
                          }
                          message
                          abbreviatedOid
                          commitUrl
                          status {
                            state
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
    }),
  });
  const data = await response.json();

  if (data.errors) {
    console.error(data.errors);
    return null;
  }
  return data.data.repository.defaultBranchRef.target.history
    .edges as TCommit[];
};
