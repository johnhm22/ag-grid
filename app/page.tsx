import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

import { getMovies } from '@/lib/mongodb/movies';
import MoviesGrid from './components/MoviesGrid';
import { Movies } from '@/types';

const Page = async () => {
  const movies = await getMovies(0, 1);
  const reformattedMovies: Movies[] = JSON.parse(JSON.stringify(movies));

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24 bg-slate-300'>
      <div>
        <p>Movies</p>
        <div className='mt-10 w-3/4'>
          {<MoviesGrid movies={reformattedMovies} />}
        </div>
      </div>
    </main>
  );
};

export default Page;
