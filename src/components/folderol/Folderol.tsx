import React, { useEffect, useState, ReactElement } from 'react';
import './Folderol.scss';

const RATE = 60;
const DEFAULT_PALETTE = ['#4A4A4A', '#3A3A3A', 'gray'];

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
    palette = DEFAULT_PALETTE,
    type = FolderolType.WAVE,
    seed = 0
  }: FolderolProps) => {
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

  const f = (x: number): number => {
    return Math.cos(x * Math.PI / 180) * 50;
  }

  return (
    <div className={CLASS}>
      {palette?.map((color, index) => {
        const dt = index * 180 + (1 * index * t);

        const origin = -40 - index * 10 - f(t);
        const mid = 50 + 30 * index;
        const end = 150 + index * 10 + f(t);

        return <div className={`${CLASS}__feature`} key={color}>
          <svg className={`${CLASS}__svg`}
            width='100'
            height='100'
            viewBox='0 0 100 100'
            preserveAspectRatio='none' >
            <path
              className={`${CLASS}__element`}
              fill={color}
              fillOpacity={1}
              d={`
                M ${origin}, ${end}
                Q ${mid / 2}, ${f(t  + dt)} ${mid}, ${mid}
                T ${end}, ${mid}
                L ${end}, ${end}
                L ${origin}, ${end}
              `}>
            </path>
          </svg>
        </div>
      }
    )}
    </div>
  );
} 

export default Folderol;
