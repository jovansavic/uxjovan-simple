import { BlogPosts } from 'app/components/posts'
import { Hero } from 'app/components/hero'

export default function Page() {
  return (
    <section>
      <h1 className="mb-2 text-2xl font-semibold tracking-tighter">
        Product (UX/UI) Designer
      </h1>

      <Hero />

      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
