import React, { useEffect, useState, ReactElement } from 'react';
import './Folderol.scss';

const DEFAULT_NUM_FEATURES = 2;
const RATE = 100;

export enum FolderolType {
  WAVE = 'WAVE'
}

export type FolderolProps = {
  children?: ReactElement;
  type?: FolderolType;
  palette?: string[];
  seed?: number | number[];
}

const CLASS = 'folderol';
const Folderol = ({
    palette = ['#FFFFFF', '#FFFFF'],
    type = FolderolType.WAVE,
    seed = 0
  }: FolderolProps) => {
  if (!palette) {
    palette = new Array(DEFAULT_NUM_FEATURES).fill(undefined);
  }

  const [t, setT] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => {
      setT(t => {
        if (t === Number.MAX_SAFE_INTEGER) {
          return 0;
        }
        return t + 1;
      });
    }, RATE)
  }, [t]);

  return (
    <div className={CLASS}>
        {palette?.map(color => (
          <div className={`${CLASS}__feature`}
            style={color ? { backgroundColor: color } : {}}
            key={color}>
          </div>
        ))}
        {t}
    </div>
  );
} 

export default Folderol;
