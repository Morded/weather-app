import React from 'react';

type DetailTypeProps = {
  title: string, 
  value: number,
  unit: string
}

function DetailType({title, value, unit}: DetailTypeProps) {
  return (
    <div className='flex flex-col gap-1'>
      <span className='text-neutral-400 text-xs uppercase'>{title}</span>
      <span className='font-bold text-xl'>{value} {unit}</span>
    </div>
  )
}

export default DetailType;
