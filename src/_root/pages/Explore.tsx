import GridPostList from '@/components/shared/GridPostList';
import { useInView } from "react-intersection-observer";
import Loader from '@/components/shared/Loader';
import { Input } from '@/components/ui/input'
import useDebounce from '@/hooks/useDebounce';
import { useGetPosts, useSearchPosts } from '@/lib/react-query/queriesAndMutations';
import React, { useEffect, useState } from 'react'
import SearchResults from '@/components/shared/SearchResults';

// export type SearchResultProps = {
//   isSearchFetching: boolean;
//   searchedPosts: any;
// };

// const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultProps) => {
//   if (isSearchFetching) {
//     return <Loader />;
//   } else if (searchedPosts && searchedPosts.documents.length > 0) {
//     return <GridPostList posts={searchedPosts.documents} />;
//   } else {
//     return (
//       <p className="text-light-4 mt-10 text-center w-full">No results found</p>
//     );
//   }
// };

const Explore = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(debouncedSearch);

  useEffect(() => {
    if (inView && !searchValue) {
      fetchNextPage();
    }
  }, [inView, searchValue]);


  if (!posts)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  console.log(posts)
  const showRes = searchValue !== "";
  const showPosts = !showRes && 
    posts.pages.every((item) => item.documents.length === 0);
  return (
    <div className='explore-container'>
      <div className="explore-inner_container">
        <h2 className='h3-bold md:h2-bold w-full'>Search posts</h2>
        <div className='flex gap-1 px-4 w-full rounded-lg bg-dark-4'>
          <img src="/assets/icons/search.svg" alt="seach" width={24} height={24} />
          <Input type='text' placeholder='Search' className='explore-search' value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}/>
        </div>
      </div>

      <div className='flex-between w-full max-w-5xl mt-16 mb-7'>
        <h3 className='body-bold md:h3-bold'>Popular today</h3>
        <div className='flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer'>
          <p className='small-medium md:base-medium text-light-2'>All</p>
          <img src="/assets/icons/filter.svg" alt="filter" width={20} height={20} />
        </div>
      </div>
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {showRes ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ) : showPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        )}
      </div>
    </div>
  )
}

export default Explore