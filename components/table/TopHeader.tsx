import { ReactNode, useLayoutEffect, useRef } from "react"

type Props = {
    children: ReactNode,
    rows: ReactNode
}

const TopHeader = (props: Props) => {

    const stickyHeader = useRef<HTMLTableElement>()
    const stickyParent = useRef<HTMLTableElement>()

    useLayoutEffect(() => {
      const fixedHeader = () => {
        if (stickyParent.current) {
            const distToTop = stickyParent.current.getBoundingClientRect().top
            const offset = Math.max(0, 0 - distToTop)
            stickyHeader.current.style.top = `${offset}px`
        }
      }

      window.addEventListener('scroll', fixedHeader)

      return () => {
        window.removeEventListener('scroll', fixedHeader)
      }
    }, [])

    return (
        <div ref={stickyParent} className='main-table-container'>
            {props.children}
            <table ref={stickyHeader} className='top-header'>
                <tbody>
                    {props.rows}
                </tbody>
            </table>
        </div>
    )
}

export default TopHeader