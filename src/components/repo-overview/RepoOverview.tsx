import React, { useState, useEffect } from 'react';
import './RepoOverview.scss';

export type RepoOverviewProps = {
  repo: string,
  palette: [ string, string ]
}

function RepoOverview(props: RepoOverviewProps) {
  const [repo, setRepo] = useState({});

  useEffect(() => {
    
  });

  return (
    <div className="repo-overview">
      
    </div>
  );
}

export default RepoOverview;
