# Progiso

## Overview

Progiso is a comprehensive project management platform tailored for small to medium-sized teams. With its intuitive dashboard, efficient messaging system, customizable task boards (Kankan), and seamless integration with GitHub repositories, Progiso simplifies project coordination and enhances collaboration. Its robust user management capabilities ensure smooth team administration within projects.

## Screenshots

![Dashboard](https://github.com/aBgAmeuR/Progiso/assets/113059124/0816218a-bef4-4c17-97c8-4cb6f3439659)

## Features

- **Dashboard**: View all your projects at a glance.
- **Messaging System**: Communicate with your team members.
- **Task Boards**: Organize your tasks with customizable Kanban boards.
- **GitHub Integration**: Link your GitHub repositories to your projects.
- **User Management**: Manage your team members with ease.

## Built With

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Shadcn/ui](https://img.shields.io/badge/Shadcn/ui-000000?style=for-the-badge&logo=react&logoColor=white)](https://ui.shadcn.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GitHub API](https://img.shields.io/badge/GitHub_API-181717?style=for-the-badge&logo=github&logoColor=white)](https://docs.github.com/en/rest)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/aBgAmeuR/Progiso.git
```

2. Install the dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add the following environment variables:

```env
DATABASE_URL='your database url'

NEXT_PUBLIC_SITE_URL='your site url'

NEXT_PUBLIC_GITHUB_ID='your github client ID'
NEXT_PUBLIC_GITHUB_SECRET='your github secret ID'

NEXTAUTH_SECRET='your next-auth secret'
NEXTAUTH_URL='http://localhost:3000
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License

Distributed under the MIT License. See `LICENSE.MD` for more information.
