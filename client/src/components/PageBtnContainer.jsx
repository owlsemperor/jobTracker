import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import Wrapper from '../assets/wrappers/PageBtnContainer'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useAllJobsContext } from '../pages/AllJobs'

const PageBtnContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAllJobsContext()
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1
  })
  const { search, pathname } = useLocation()
  const navigate = useNavigate()

  const handlePageNumber = (pageNumber) => {
    const searchParams = new URLSearchParams(search)

    console.log(searchParams)
    searchParams.set('page', pageNumber)
    console.log(searchParams)
    navigate(`${pathname}?${searchParams.toString()}`)
  }
  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        className={`btn page-btn ${activeClass && 'active'}`}
        key={pageNumber}
        onClick={() => {
          handlePageNumber(pageNumber)
        }}>
        {pageNumber}
      </button>
    )
  }
  const renderPageButtons = () => {
    const pageButtons = []
    //first page
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
    )
    // Add the dots before the current page if there are more than 3 pages
    if (currentPage > 3) {
      pageButtons.push(
        <span className='page-btn dots' key='dots-1'>
          ....
        </span>
      )
    }
    //one before current page
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage - 1,
          activeClass: false,
        })
      )
    }
    //current page
    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage,
          activeClass: true,
        })
      )
    }
    if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage + 1,
          activeClass: false,
        })
      )
    }
    // Add the dots before the current page if there are more than 3 pages
    if (currentPage < numOfPages - 2) {
      pageButtons.push(
        <span className='page-btn dots' key='dots+1'>
          ....
        </span>
      )
    }
    pageButtons.push(
      addPageButton({
        pageNumber: numOfPages,
        activeClass: currentPage === numOfPages,
      })
    )
    return pageButtons
  }
  return (
    <Wrapper>
      <button
        className='btn prev-btn'
        onClick={() => {
          let prevPage = currentPage - 1

          if (prevPage < 1) prevPage = numOfPages
          handlePageNumber(prevPage)
        }}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className='btn-container'>{renderPageButtons()}</div>
      <button
        className='btn next-btn'
        onClick={() => {
          let nextPage = currentPage + 1

          if (currentPage > numOfPages) nextPage = 1
          handlePageNumber(nextPage)
        }}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  )
}

export default PageBtnContainer
