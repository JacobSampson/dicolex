import React from 'react';
import './RepoOverview.scss';

const DEFAULT_REPO = {
  title: 'dicolex',
  link: 'https://github.com/JacobSampson/dicolex',
  description: 'generate project names on the fly',
  technologies: [
    'Firebase',
    'SCSS',
    'React',
  ]
}

const DEFAULT_PALETTE = [ '#1D5B8A', '#30779B' ] as [ string, string ];

export type RepoOverviewProps = {
  repo?: {
    title: string;
    link: string;
    description: string;
    technologies: string[];
  },
  palette?: [ string, string ]
}

const CLASS = 'repo-overview';
function RepoOverview({repo = DEFAULT_REPO, palette = DEFAULT_PALETTE}: RepoOverviewProps) {
  return (
    <div className={CLASS} style={{ backgroundColor: palette[0] }}>
       <h2 className={CLASS + '__title'}>{repo.title}</h2>
       <p className={CLASS + '__description'}>{repo.description}</p>
       <ul className={CLASS + '__technologies'}>
         {repo.technologies.map(technology => (
           <li key={technology} className={`${CLASS}__icon ${CLASS}__icon--technology`} title={technology} style={{ backgroundImage: `url('resources/icons/${technology.toLowerCase()}.png')` }}></li>
         ))}
       </ul>
       <a className={CLASS + '__repo'} title={repo.link} href={repo.link} target='_blank' rel='noopener noreferrer'>
         <div className={`${CLASS}__icon ${CLASS}__icon--github`}></div>
       </a>
       <a className={CLASS + '__site'} title='https://sampsonjacob.com' href='https://sampsonjacob.com' target='_blank' rel='noopener noreferrer'>sampsonjacob.com</a>
       <div className={CLASS + '__highlight'} style={{ backgroundColor: palette[1] }}></div>
    </div>
  );
}

export default RepoOverview;
