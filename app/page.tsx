import { BlogPosts } from 'app/components/posts'
import { Hero } from 'app/components/hero'

export default function Page() {
  return (
    <section className="focus-group">
      <div className="focus-item">
        <h1 className="mb-2 text-2xl font-semibold tracking-tighter">
          Product (UX/UI) Designer
        </h1>
      </div>

      <div className="focus-item">
        <Hero />
      </div>

      <div className="my-8">
        <BlogPosts limit={3} />
      </div>
    </section>
  )
}
