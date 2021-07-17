import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { WindowLocation } from "@reach/router"
import { Follow } from "react-twitter-widgets"

const Layout: React.FC<{ location: WindowLocation; title: string }> = ({
  location,
  title,
  children,
}) => {
  const data = useStaticQuery<GatsbyTypes.LayoutQuery>(graphql`
    query Layout {
      site {
        siteMetadata {
          social {
            twitterUserId
          }
        }
      }
    }
  `)

  const twitterUserId = data.site?.siteMetadata?.social?.twitterUserId || ""
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        <Follow username={twitterUserId} />
      </footer>
    </div>
  )
}

export default Layout
