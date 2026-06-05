export const Spinner = () => {
  return (
    <div className='flex items-center justify-center gap-2 min-h-75'>
      <span className='loading loading-spinner loading-xl text-primary'></span>
      <span className='loading loading-spinner loading-xl text-secondary'></span>
      <span className='loading loading-spinner loading-xl text-accent'></span>
      <span className='loading loading-spinner loading-xl text-info'></span>
      <span className='loading loading-spinner loading-xl text-success'></span>
      <span className='loading loading-spinner loading-xl text-warning'></span>
      <span className='loading loading-spinner loading-xl text-error'></span>
    </div>
  );
};
