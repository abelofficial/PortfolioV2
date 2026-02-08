import Link from "next/link";

const Toolbar = () => {
    return (
        <nav className="flex items-center justify-end space-x-3 px-6 py-3">
            <Link href="/">Home</Link>
            <Link href="/timeline">Timeline</Link>
            <Link href="/blogs">Blogs</Link>
        </nav>
    )
}

export default Toolbar;