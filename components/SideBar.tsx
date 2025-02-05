import Link from "next/link"

function SideBar() {
  return (
    <div>
        <ul>
            <li>
                <Link href='/create-chatbot'>Link</Link>
            </li>
            <li>
                <Link href='/view-chatbots'>Link</Link>
            </li>
            <li>
                <Link href='/review-sessions'>Link</Link>
            </li>
        </ul>
      
    </div>
  )
}

export default SideBar
