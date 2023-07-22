import { ReactNode, useLayoutEffect, useRef } from "react"

type Props = {
    children: ReactNode
}

const TopHeader = (props: Props) => {

    const stickyHeader = useRef<HTMLTableElement>()
    const stickyParent = useRef<HTMLTableElement>()

    useLayoutEffect(() => {
      const fixedHeader = () => {
        const distToTop = stickyParent.current.getBoundingClientRect().top
        const offset = Math.max(0, 0 - distToTop)
        stickyHeader.current.style.top = `${offset}px`

        console.log(offset)
      }

      window.addEventListener('scroll', fixedHeader)
    }, [])

    return (
        <div ref={stickyParent} className='main-table-container'>
            <table className='top-table'>
                <tbody>
                    {props.children}
                </tbody>
            </table>
            <table ref={stickyHeader} className='top-header'>
                <tbody>
                    {props.children}
                </tbody>
            </table>
        </div>
    )
}

export default TopHeader